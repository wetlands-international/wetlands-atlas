/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * WM-98: one-time rename of the Sahel records to the region-prefixed IDs of the region model (WM-94).
 *
 * Renames every location, category, indicator, indicator-data row and indicator/contextual layer in place and
 * rewrites every reference to them, in one transaction with the foreign keys deferred, so nothing is deleted and no
 * ON DELETE rule fires. Runs before the seed of the WM-99 rollout. Idempotent: a second run changes nothing.
 *
 *   pnpm data:migrate-region-ids:<env> [--dry-run]
 *
 * `--dry-run` does the whole run and rolls it back at the end.
 */
import fs from "fs";
import path from "path";

import { DatabaseAdapter } from "payload";

import dotenv from "dotenv";
import { sql } from "drizzle-orm";
import minimist from "minimist";

import {
  LEGACY_REGION_ID,
  toRegionId,
  toRegionIndicatorDataId,
  toRegionStepMap,
} from "../src/lib/region-ids";

const argv = minimist(process.argv.slice(2), { boolean: ["dry-run"] });
const env = argv.env || argv.e || "development";
const dryRun: boolean = argv["dry-run"];

let dotenvFile: string;
if (env === "development") {
  dotenvFile = ".env";
} else {
  // This is needed to ensure a ssl connection for the database connection
  (process.env as any).NODE_ENV = "production";
  dotenvFile = `.env.${env}`;
}
const dotenvPath = path.resolve(".", dotenvFile);
if (!fs.existsSync(dotenvPath)) {
  console.error(`File not found: ${dotenvPath} for environment ${env}`);
  process.exit(1);
}
dotenv.config({ path: dotenvPath });

// Import payload and config after dotenv is configured
const { default: payload } = await import("payload");
const { default: config } = await import("../../app/src/payload.config");

type DB = DatabaseAdapter["drizzle"];
type TX = Parameters<Parameters<DB["transaction"]>[0]>[0];

/** Old ID → new ID, only for the rows that change */
type Mapping = [old: string, next: string][];

/** The kinds of records that are renamed */
type RenamedKind = "location" | "category" | "indicator" | "indicatorData" | "layer";

/** The table of each renamed kind; every foreign key pointing at them is deferred during the run */
const RENAMED_TABLES: Record<RenamedKind, string> = {
  location: "locations",
  category: "categories",
  indicator: "indicators",
  indicatorData: "indicator_data",
  layer: "layers",
};

/** The columns referencing a renamed table, by the kind of ID they hold (from `pg_constraint`, plus the step maps) */
const REFERENCES: Record<RenamedKind, [table: string, column: string][]> = {
  location: [
    ["locations", "parent_id"],
    ["locations_locales", "_parent_id"],
    ["indicator_data", "location_id"],
    ["landscapes", "location_id"],
    ["landscapes_steps", "chart_location_id"],
    ["payload_locked_documents_rels", "locations_id"],
  ],
  category: [
    ["categories_locales", "_parent_id"],
    ["categories_rels", "parent_id"],
    ["indicators", "category_id"],
    ["landscapes", "category_id"],
    ["payload_locked_documents_rels", "categories_id"],
  ],
  indicator: [
    ["indicators_locales", "_parent_id"],
    ["categories_rels", "indicators_id"],
    ["indicator_data", "indicator_id"],
    ["layers_rels", "indicators_id"],
    ["landscapes_steps", "chart_indicator_id"],
    ["payload_locked_documents_rels", "indicators_id"],
  ],
  indicatorData: [["payload_locked_documents_rels", "indicator_data_id"]],
  layer: [
    ["layers_locales", "_parent_id"],
    ["layers_rels", "parent_id"],
    ["payload_locked_documents_rels", "layers_id"],
  ],
};

let changedRows = 0;

const log = (what: string, count: number) => {
  changedRows += count;
  console.log(`${count === 0 ? "  " : "✏️ "} ${what}: ${count}`);
};

const getRows = async (tx: TX, query: ReturnType<typeof sql>) =>
  (await tx.execute(query)).rows as any[];

const getRowCount = async (tx: TX, query: ReturnType<typeof sql>) =>
  (await tx.execute(query)).rowCount ?? 0;

const getIds = async (tx: TX, query: ReturnType<typeof sql>) =>
  (await getRows(tx, query)).map((row) => row.id as string);

/** Makes the foreign keys pointing at the renamed tables deferrable, and defers them for the transaction */
const deferForeignKeys = async (tx: TX) => {
  const constraints = await getRows(
    tx,
    sql`SELECT conrelid::regclass::text AS "table", conname AS "name" FROM pg_constraint
        WHERE contype = 'f' AND confrelid = ANY(${sql.param(Object.values(RENAMED_TABLES))}::regclass[])`,
  );

  for (const { table, name } of constraints) {
    await tx.execute(
      sql.raw(`ALTER TABLE "${table}" ALTER CONSTRAINT "${name}" DEFERRABLE INITIALLY DEFERRED`),
    );
  }

  await tx.execute(sql`SET CONSTRAINTS ALL DEFERRED`);

  console.log(`🔓 Deferred ${constraints.length} foreign keys`);
};

/** Checks every deferred foreign key now, failing the transaction if a reference was missed, then restores them */
const restoreForeignKeys = async (tx: TX) => {
  await tx.execute(sql`SET CONSTRAINTS ALL IMMEDIATE`);

  const constraints = await getRows(
    tx,
    sql`SELECT conrelid::regclass::text AS "table", conname AS "name" FROM pg_constraint
        WHERE contype = 'f' AND condeferrable AND confrelid = ANY(${sql.param(Object.values(RENAMED_TABLES))}::regclass[])`,
  );

  for (const { table, name } of constraints) {
    await tx.execute(sql.raw(`ALTER TABLE "${table}" ALTER CONSTRAINT "${name}" NOT DEFERRABLE`));
  }

  console.log(`🔒 Restored ${constraints.length} foreign keys`);
};

/** Rewrites one column with a mapping, in one statement */
const remapColumn = async (tx: TX, table: string, column: string, mapping: Mapping) => {
  if (mapping.length === 0) {
    return log(`${table}.${column}`, 0);
  }

  const olds = mapping.map(([old]) => old);
  const nexts = mapping.map(([, next]) => next);

  const count = await getRowCount(
    tx,
    sql`UPDATE ${sql.identifier(table)} AS t SET ${sql.identifier(column)} = m.next
        FROM unnest(${sql.param(olds)}::text[], ${sql.param(nexts)}::text[]) AS m(old, next)
        WHERE t.${sql.identifier(column)} = m.old`,
  );

  log(`${table}.${column}`, count);
};

/** Renames the primary keys of a table, and returns the mapping for its references */
const renameIds = async (
  tx: TX,
  table: string,
  toNewId: (row: any) => string,
  { columns = ["id"], where = sql`` }: { columns?: string[]; where?: ReturnType<typeof sql> } = {},
): Promise<Mapping> => {
  const unrenamed = await getRows(
    tx,
    sql`SELECT ${sql.join(columns.map(sql.identifier), sql`, `)} FROM ${sql.identifier(table)} ${where}`,
  );

  const mapping: Mapping = unrenamed
    .map((row): [string, string] => [row.id, toNewId(row)])
    .filter(([old, next]) => old !== next);

  await remapColumn(tx, table, "id", mapping);

  if (mapping.length > 0) {
    await tx.execute(
      sql`UPDATE ${sql.identifier(table)} SET updated_at = now()
          WHERE id = ANY(${sql.param(mapping.map(([, next]) => next))}::text[])`,
    );
  }

  return mapping;
};

/** The step maps hold layer IDs as plain JSON, without a foreign key */
const rewriteStepMaps = async (tx: TX, landscapeLayerIds: Set<string>) => {
  const steps = await getRows(
    tx,
    sql`SELECT id, map FROM landscapes_steps WHERE map IS NOT NULL ORDER BY id`,
  );

  let count = 0;

  for (const { id, map } of steps) {
    const next = toRegionStepMap(map, (layerId) => landscapeLayerIds.has(layerId));
    if (next === undefined) {
      continue;
    }

    await tx.execute(
      sql`UPDATE landscapes_steps SET map = ${JSON.stringify(next)}::jsonb WHERE id = ${id}`,
    );

    count += 1;
  }

  log("landscapes_steps.map.layers", count);
};

const migrate = async (tx: TX) => {
  await deferForeignKeys(tx);

  // The records of the other regions keep their IDs, such as the hidden `other-other` category inserted by the
  // `regions_published` migration. Indicators and indicator data have no region: they follow their category and
  // location, read before the renames since the deferred foreign keys still hold the old IDs afterwards.
  const foreignCategoryIds = await getIds(
    tx,
    sql`SELECT id FROM categories WHERE region_id <> ${LEGACY_REGION_ID}`,
  );
  const foreignLocationIds = await getIds(
    tx,
    sql`SELECT id FROM locations WHERE region_id <> ${LEGACY_REGION_ID}`,
  );

  console.log("\nPrimary keys");

  const mappings: Record<RenamedKind, Mapping> = {
    location: await renameIds(
      tx,
      RENAMED_TABLES.location,
      (row) => toRegionId(row.id, "location"),
      {
        where: sql`WHERE region_id = ${LEGACY_REGION_ID}`,
      },
    ),
    category: await renameIds(
      tx,
      RENAMED_TABLES.category,
      (row) => toRegionId(row.id, "category"),
      {
        where: sql`WHERE region_id = ${LEGACY_REGION_ID}`,
      },
    ),
    indicator: await renameIds(
      tx,
      RENAMED_TABLES.indicator,
      (row) => toRegionId(row.id, "indicator"),
      { where: sql`WHERE category_id <> ALL(${sql.param(foreignCategoryIds)}::text[])` },
    ),
    indicatorData: await renameIds(
      tx,
      RENAMED_TABLES.indicatorData,
      (row) => toRegionIndicatorDataId(row.id, row.location_id),
      {
        columns: ["id", "location_id"],
        where: sql`WHERE location_id <> ALL(${sql.param(foreignLocationIds)}::text[])`,
      },
    ),
    // Landscape layers keep their IDs: they belong to no region and are only reached through a landscape. Indicator
    // layers have no region either, and the contextual layers of the other regions keep theirs.
    layer: await renameIds(tx, RENAMED_TABLES.layer, (row) => toRegionId(row.id, "layer"), {
      where: sql`WHERE type <> 'landscape' AND (region_id = ${LEGACY_REGION_ID} OR region_id IS NULL)`,
    }),
  };

  // The global location of a region is `{region}_global` with the region as code
  const globalCode = await getRowCount(
    tx,
    sql`UPDATE locations SET code = ${LEGACY_REGION_ID}
        WHERE id = ${toRegionId(`global_${LEGACY_REGION_ID}`, "location")} AND code <> ${LEGACY_REGION_ID}`,
  );
  log("locations.code (global)", globalCode);

  console.log("\nReferences");

  for (const kind of Object.keys(REFERENCES) as RenamedKind[]) {
    for (const [table, column] of REFERENCES[kind]) {
      await remapColumn(tx, table, column, mappings[kind]);
    }
  }

  const landscapeLayerIds = new Set(
    await getIds(tx, sql`SELECT id FROM layers WHERE type = 'landscape'`),
  );

  await rewriteStepMaps(tx, landscapeLayerIds);

  console.log("\nRegion");

  const contextual = await getRowCount(
    tx,
    sql`UPDATE layers SET region_id = ${LEGACY_REGION_ID} WHERE type = 'contextual' AND region_id IS NULL`,
  );
  log("layers.region_id (contextual)", contextual);

  console.log("");

  await restoreForeignKeys(tx);
};

class DryRunRollback extends Error {}

const run = async () => {
  await payload.init({ config });
  console.log(`🌍 Migrating ${env} to the region-prefixed IDs${dryRun ? " (dry run)" : ""}\n`);

  try {
    await payload.db.drizzle.transaction(async (tx) => {
      await migrate(tx);

      if (dryRun) {
        throw new DryRunRollback();
      }
    });

    console.log(`\n✅ Done: ${changedRows} rows changed`);
  } catch (error) {
    if (!(error instanceof DryRunRollback)) {
      throw error;
    }

    console.log(`\n↩️  Dry run rolled back: ${changedRows} rows would change`);
  }

  process.exit(0);
};

void run().catch((error) => {
  console.error("❌ Error migrating the IDs:", error);
  process.exit(1);
});
