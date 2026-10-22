/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Seeds the read-only collections from the files of `app-initial-data`: regions, locations, categories, indicators
 * and indicator data (WM-97). The files are their only source of truth: every record is upserted with every locale
 * it carries (WM-126). The rows and translations missing from the files (orphans) make the seed fail with their list,
 * unless `--delete-orphans` is given, in which case they are deleted. The editable collections (media, layers,
 * landscapes, FAQs) are never written, and the seed stops before deleting a row they still reference.
 *
 *   pnpm data:seed:<env> [--dry-run] [--delete-orphans] [--files=<dir>] [--only=regions,locations,…]
 *
 * `--dry-run` does the whole run and rolls it back at the end. `--files` seeds from another directory. `--only` limits
 * the deletions and upserts to the given collections, for development: every file is still read and validated, but the
 * collections reference each other in the seed order, so a partial run can fail on a foreign key.
 *
 * The seed writes through drizzle, so the collections' hooks don't run. The front end reads these collections through
 * the REST API from dynamic pages, without caching, so nothing needs to be revalidated afterwards.
 */
import fs from "fs";
import path from "path";

import { DatabaseAdapter } from "payload";

import dotenv from "dotenv";
import { sql } from "drizzle-orm";
import minimist from "minimist";

import { loadSeedFiles, SeedError, type LocationRecord, type SeedFiles } from "./seed/files";
import { localeRowsOf, LOCALIZED_FIELDS } from "./seed/locales";
import { assertValidSeedFiles } from "./seed/validate";

const argv = minimist(process.argv.slice(2), {
  boolean: ["dry-run", "delete-orphans"],
  string: ["only", "files"],
});
const env = argv.env || argv.e || "development";
const dryRun: boolean = argv["dry-run"];
const deleteOrphans: boolean = argv["delete-orphans"];
const onlyCollections: string[] | undefined = argv.only ? argv.only.split(",") : undefined;

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

/** Where the seed writes, shown before running: the env files of this machine may point at any environment */
const databaseTarget = process.env.DATABASE_URI
  ? new URL(process.env.DATABASE_URI).host + new URL(process.env.DATABASE_URI).pathname
  : "unknown database";

// Import payload and config after dotenv is configured
const { default: payload } = await import("payload");
const { default: config } = await import("../../app/src/payload.config");

const SEED_DIRECTORY = path.resolve(argv.files ?? path.join("..", "app-initial-data"));

/** Rows per INSERT statement */
const BATCH_SIZE = 100;

type DB = DatabaseAdapter["drizzle"] & { query: Record<string, any> };
type TX = Parameters<Parameters<DB["transaction"]>[0]>[0] & { query: Record<string, any> };

type SeedCollection = keyof SeedFiles;

/** The order of the upserts: a collection comes after the ones it references. The deletions run in reverse. */
const SEED_ORDER: SeedCollection[] = [
  "regions",
  "locations",
  "categories",
  "indicators",
  "indicatorData",
];

/** The names accepted by `--only` */
const COLLECTION_NAMES: Record<SeedCollection, string> = {
  regions: "regions",
  locations: "locations",
  categories: "categories",
  indicators: "indicators",
  indicatorData: "indicator-data",
};

const TABLES: Record<SeedCollection, string> = {
  regions: "regions",
  locations: "locations",
  categories: "categories",
  indicators: "indicators",
  indicatorData: "indicator_data",
};

let writtenRows = 0;

const log = (description: string, rowCount: number) => {
  writtenRows += rowCount;
  console.log(`${rowCount === 0 ? "  " : "✏️ "} ${description}: ${rowCount}`);
};

const getRows = async (tx: TX, query: ReturnType<typeof sql>) =>
  (await tx.execute(query)).rows as any[];

type EditableReferences = Record<SeedCollection, [table: string, column: string][]>;

/**
 * The columns of the editable collections pointing at a seeded one, from the foreign keys of the schema: every one
 * but those of the seeded tables themselves (their `_locales` and `_rels` included) and Payload's bookkeeping. A row
 * is only deleted when none of them references it: the ON DELETE rules would otherwise unlink or null the editors'
 * work silently.
 */
const getEditableReferences = async (tx: TX): Promise<EditableReferences> => {
  const seededTables = Object.values(TABLES);

  const foreignKeyRows = await getRows(
    tx,
    sql`SELECT c.conrelid::regclass::text AS "table", a.attname AS "column", c.confrelid::regclass::text AS "referencedTable"
        FROM pg_constraint c
        JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
        WHERE c.contype = 'f' AND c.confrelid = ANY(${sql.param(seededTables)}::regclass[])
        ORDER BY 1, 2`,
  );

  const isSeededTable = (table: string) =>
    seededTables.some(
      (seededTable) => table === seededTable || table.startsWith(`${seededTable}_`),
    );

  const editableReferences: EditableReferences = {
    regions: [],
    locations: [],
    categories: [],
    indicators: [],
    indicatorData: [],
  };

  for (const foreignKeyRow of foreignKeyRows) {
    if (isSeededTable(foreignKeyRow.table) || foreignKeyRow.table.startsWith("payload_")) {
      continue;
    }

    const collection = SEED_ORDER.find(
      (seedCollection) => TABLES[seedCollection] === foreignKeyRow.referencedTable,
    ) as SeedCollection;

    editableReferences[collection].push([foreignKeyRow.table, foreignKeyRow.column]);
  }

  return editableReferences;
};

/**
 * Upserts `rows` into `table` in batches. On conflict, the columns of `updateColumns` take the incoming values
 * (`excluded` is the row that was not inserted) and the others, such as `createdAt`, keep theirs.
 */
const upsertRows = async (
  tx: TX,
  table: any,
  rows: Record<string, unknown>[],
  conflictTarget: any[],
  updateColumns: readonly string[],
) => {
  const incomingValues = Object.fromEntries(
    updateColumns.map((column) => [column, sql`excluded.${sql.identifier(table[column].name)}`]),
  );

  for (let batchStart = 0; batchStart < rows.length; batchStart += BATCH_SIZE) {
    await tx
      .insert(table)
      .values(rows.slice(batchStart, batchStart + BATCH_SIZE))
      .onConflictDoUpdate({ target: conflictTarget, set: incomingValues });
  }
};

/** The media IDs by `filename`: the covers of regions and categories are filenames in the files */
const getMediaIdsByFilename = async (tx: TX) => {
  const mediaRows = await getRows(
    tx,
    sql`SELECT id, filename FROM media WHERE filename IS NOT NULL`,
  );

  return new Map<string, number>(mediaRows.map((mediaRow) => [mediaRow.filename, mediaRow.id]));
};

/** The `_locales` rows of each seeded collection, as `{locale}|{parent id}` keys, which the files carry */
const getLocaleRowKeys = (seedFiles: SeedFiles, collection: SeedCollection) => {
  if (collection === "indicatorData") {
    return [];
  }

  return seedFiles[collection].flatMap((record) =>
    localeRowsOf(record, LOCALIZED_FIELDS[collection]).map(
      (localeRow) => `${localeRow._locale}|${localeRow._parentID}`,
    ),
  );
};

/** The rows of a seeded collection that the files don't carry: records by ID, and translations by locale and record */
type Orphans = { ids: string[]; localeKeys: string[] };

/**
 * The orphans of each collection: the records whose ID is not in the file, and the `_locales` rows of the records in
 * the file whose locale the record no longer carries (the rows of a removed record go with it, ON DELETE CASCADE).
 */
const findOrphans = async (
  tx: TX,
  seedFiles: SeedFiles,
  collectionsToSeed: SeedCollection[],
): Promise<Partial<Record<SeedCollection, Orphans>>> => {
  const orphansByCollection: Partial<Record<SeedCollection, Orphans>> = {};

  for (const collection of collectionsToSeed) {
    const idsInFiles = seedFiles[collection].map((record) => record.id);
    const localeKeysInFiles = getLocaleRowKeys(seedFiles, collection);

    const orphanRows = await getRows(
      tx,
      sql`SELECT id FROM ${sql.identifier(TABLES[collection])}
          WHERE id <> ALL(${sql.param(idsInFiles)}::text[]) ORDER BY id`,
    );

    const orphanLocaleRows =
      collection === "indicatorData"
        ? []
        : await getRows(
            tx,
            sql`SELECT _locale::text || '|' || _parent_id AS key FROM ${sql.identifier(`${TABLES[collection]}_locales`)}
                WHERE _parent_id = ANY(${sql.param(idsInFiles)}::text[])
                AND _locale::text || '|' || _parent_id <> ALL(${sql.param(localeKeysInFiles)}::text[])
                ORDER BY 1`,
          );

    orphansByCollection[collection] = {
      ids: orphanRows.map((orphanRow) => orphanRow.id as string),
      localeKeys: orphanLocaleRows.map((orphanLocaleRow) => orphanLocaleRow.key as string),
    };
  }

  return orphansByCollection;
};

/** The orphans as lines for the error that lists them */
const describeOrphans = (orphansByCollection: Partial<Record<SeedCollection, Orphans>>) =>
  Object.entries(orphansByCollection).flatMap(([collection, orphans]) => [
    ...orphans.ids.map((id) => `${COLLECTION_NAMES[collection as SeedCollection]} '${id}'`),
    ...orphans.localeKeys.map((localeKey) => {
      const [locale, parentId] = localeKey.split("|");

      return `${COLLECTION_NAMES[collection as SeedCollection]} '${parentId}': translation '${locale}'`;
    }),
  ]);

/** The editable rows still pointing at the IDs about to be deleted, as error messages */
const findEditableReferences = async (
  tx: TX,
  editableReferences: EditableReferences,
  collection: SeedCollection,
  removedIds: string[],
) => {
  const referenceErrors: string[] = [];

  if (removedIds.length === 0) {
    return referenceErrors;
  }

  for (const [table, column] of editableReferences[collection]) {
    const referencingRows = await getRows(
      tx,
      sql`SELECT ${sql.identifier(column)} AS id, count(*) AS count FROM ${sql.identifier(table)}
          WHERE ${sql.identifier(column)} = ANY(${sql.param(removedIds)}::text[]) GROUP BY 1`,
    );

    for (const referencingRow of referencingRows) {
      referenceErrors.push(
        `${table}.${column} references the removed ${COLLECTION_NAMES[collection]} '${referencingRow.id}' (${referencingRow.count} ${referencingRow.count === "1" ? "row" : "rows"})`,
      );
    }
  }

  return referenceErrors;
};

class DryRunRollback extends Error {}

/**
 * Deletes the orphans, children first, once it is known that nothing editable references them. Runs before the
 * upserts, so that a record can change its ID while keeping its unique keys (locations are unique on region, type
 * and code).
 */
const deleteOrphanRows = async (
  tx: TX,
  orphansByCollection: Partial<Record<SeedCollection, Orphans>>,
) => {
  const editableReferences = await getEditableReferences(tx);
  const referenceErrors: string[] = [];

  for (const [collection, orphans] of Object.entries(orphansByCollection)) {
    referenceErrors.push(
      ...(await findEditableReferences(
        tx,
        editableReferences,
        collection as SeedCollection,
        orphans.ids,
      )),
    );
  }

  if (referenceErrors.length > 0) {
    throw new SeedError(
      `Rows removed from the seed files are still referenced by editable content:\n${referenceErrors.map((referenceError) => `  - ${referenceError}`).join("\n")}`,
    );
  }

  for (const collection of [...SEED_ORDER].reverse()) {
    const orphans = orphansByCollection[collection];

    if (!orphans) {
      continue;
    }

    if (orphans.ids.length > 0) {
      await tx.execute(
        sql`DELETE FROM ${sql.identifier(TABLES[collection])} WHERE id = ANY(${sql.param(orphans.ids)}::text[])`,
      );
    }

    log(`${COLLECTION_NAMES[collection]} deleted`, orphans.ids.length);

    if (orphans.localeKeys.length > 0) {
      await tx.execute(
        sql`DELETE FROM ${sql.identifier(`${TABLES[collection]}_locales`)}
            WHERE _locale::text || '|' || _parent_id = ANY(${sql.param(orphans.localeKeys)}::text[])`,
      );

      log(`${COLLECTION_NAMES[collection]} translations deleted`, orphans.localeKeys.length);
    }
  }
};

const seedRegions = async (
  tx: TX,
  seedFiles: SeedFiles,
  mediaIdsByFilename: Map<string, number>,
) => {
  const regions = tx.query.regions.table;
  const regionsLocales = tx.query.regions_locales.table;
  const now = new Date().toISOString();

  const regionRows = seedFiles.regions.map((region) => ({
    id: region.id,
    cover: region.cover === null ? null : mediaIdsByFilename.get(region.cover),
    color: region.color,
    order: region.order,
    published: region.published,
    createdAt: now,
    updatedAt: now,
  }));

  await upsertRows(
    tx,
    regions,
    regionRows,
    [regions.id],
    ["cover", "color", "order", "published", "updatedAt"],
  );

  const regionLocaleRows = seedFiles.regions.flatMap((region) =>
    localeRowsOf(region, LOCALIZED_FIELDS.regions),
  );

  await upsertRows(
    tx,
    regionsLocales,
    regionLocaleRows,
    [regionsLocales._locale, regionsLocales._parentID],
    LOCALIZED_FIELDS.regions.localizedFields,
  );

  log("regions upserted", regionRows.length);
};

/** The locations ordered so that every parent comes before its children: `parent` is a foreign key checked per batch */
const sortParentsFirst = (locations: LocationRecord[]) => {
  const parentById = new Map(locations.map((location) => [location.id, location.parent]));

  const depthOf = (location: LocationRecord) => {
    let depth = 0;

    for (let parentId = location.parent; parentId; parentId = parentById.get(parentId) ?? null) {
      depth += 1;
    }

    return depth;
  };

  return [...locations].sort(
    (location, otherLocation) => depthOf(location) - depthOf(otherLocation),
  );
};

const seedLocations = async (tx: TX, seedFiles: SeedFiles) => {
  const locations = tx.query.locations.table;
  const locationsLocales = tx.query.locations_locales.table;
  const now = new Date().toISOString();

  const locationRows = sortParentsFirst(seedFiles.locations).map((location) => ({
    id: location.id,
    region: location.region,
    code: location.code,
    type: location.type,
    geometry: location.geometry,
    geometry_4326: sql`ST_GeomFromGeoJSON(${JSON.stringify(location.geometry)})`,
    bbox: location.bbox,
    parent: location.parent,
    createdAt: now,
    updatedAt: now,
  }));

  await upsertRows(
    tx,
    locations,
    locationRows,
    [locations.id],
    ["region", "code", "type", "geometry", "geometry_4326", "bbox", "parent", "updatedAt"],
  );

  const locationLocaleRows = seedFiles.locations.flatMap((location) =>
    localeRowsOf(location, LOCALIZED_FIELDS.locations),
  );

  await upsertRows(
    tx,
    locationsLocales,
    locationLocaleRows,
    [locationsLocales._locale, locationsLocales._parentID],
    LOCALIZED_FIELDS.locations.localizedFields,
  );

  log("locations upserted", locationRows.length);
};

const seedCategories = async (
  tx: TX,
  seedFiles: SeedFiles,
  mediaIdsByFilename: Map<string, number>,
) => {
  const categories = tx.query.categories.table;
  const categoriesLocales = tx.query.categories_locales.table;
  const now = new Date().toISOString();

  const categoryRows = seedFiles.categories.map((category) => ({
    id: category.id,
    region: category.region,
    cover: category.cover === null ? null : mediaIdsByFilename.get(category.cover),
    order: category.order,
    published: category.published,
    createdAt: now,
    updatedAt: now,
  }));

  await upsertRows(
    tx,
    categories,
    categoryRows,
    [categories.id],
    ["region", "cover", "order", "published", "updatedAt"],
  );

  const categoryLocaleRows = seedFiles.categories.flatMap((category) =>
    localeRowsOf(category, LOCALIZED_FIELDS.categories),
  );

  await upsertRows(
    tx,
    categoriesLocales,
    categoryLocaleRows,
    [categoriesLocales._locale, categoriesLocales._parentID],
    LOCALIZED_FIELDS.categories.localizedFields,
  );

  log("categories upserted", categoryRows.length);
};

/** The default indicators of the categories: a relationship table without a natural key, replaced as a whole */
const seedDefaultIndicators = async (tx: TX, seedFiles: SeedFiles) => {
  const categoriesRels = tx.query.categories_rels.table;

  await tx.delete(categoriesRels).where(sql`${categoriesRels.path} = 'defaultIndicators'`);

  const defaultIndicatorRows = seedFiles.categories.flatMap((category) =>
    category.defaultIndicators.map((indicatorId, order) => ({
      parent: category.id,
      indicatorsID: indicatorId,
      order,
      path: "defaultIndicators",
    })),
  );

  if (defaultIndicatorRows.length > 0) {
    await tx.insert(categoriesRels).values(defaultIndicatorRows);
  }

  log("default indicators replaced", defaultIndicatorRows.length);
};

const seedIndicators = async (tx: TX, seedFiles: SeedFiles) => {
  const indicators = tx.query.indicators.table;
  const indicatorsLocales = tx.query.indicators_locales.table;
  const now = new Date().toISOString();

  const indicatorRows = seedFiles.indicators.map((indicator) => ({
    id: indicator.id,
    category: indicator.category,
    order: indicator.order,
    createdAt: now,
    updatedAt: now,
  }));

  await upsertRows(
    tx,
    indicators,
    indicatorRows,
    [indicators.id],
    ["category", "order", "updatedAt"],
  );

  const indicatorLocaleRows = seedFiles.indicators.flatMap((indicator) =>
    localeRowsOf(indicator, LOCALIZED_FIELDS.indicators),
  );

  await upsertRows(
    tx,
    indicatorsLocales,
    indicatorLocaleRows,
    [indicatorsLocales._locale, indicatorsLocales._parentID],
    LOCALIZED_FIELDS.indicators.localizedFields,
  );

  log("indicators upserted", indicatorRows.length);
};

const seedIndicatorData = async (tx: TX, seedFiles: SeedFiles) => {
  const indicatorData = tx.query.indicator_data.table;
  const now = new Date().toISOString();

  const indicatorDataRows = seedFiles.indicatorData.map((indicatorDataRecord) => ({
    id: indicatorDataRecord.id,
    indicator: indicatorDataRecord.indicator,
    location: indicatorDataRecord.location,
    data: indicatorDataRecord.data,
    createdAt: now,
    updatedAt: now,
  }));

  await upsertRows(
    tx,
    indicatorData,
    indicatorDataRows,
    [indicatorData.id],
    ["indicator", "location", "data", "updatedAt"],
  );

  log("indicator data upserted", indicatorDataRows.length);
};

const SEED_STEPS: Record<
  SeedCollection,
  (tx: TX, seedFiles: SeedFiles, mediaIdsByFilename: Map<string, number>) => Promise<void>
> = {
  regions: seedRegions,
  locations: seedLocations,
  categories: seedCategories,
  indicators: seedIndicators,
  indicatorData: seedIndicatorData,
};

/** The collections to seed, in the seed order, from `--only` */
const getCollectionsToSeed = () => {
  if (!onlyCollections) {
    return SEED_ORDER;
  }

  const unknownCollectionNames = onlyCollections.filter(
    (collectionName) => !Object.values(COLLECTION_NAMES).includes(collectionName),
  );

  if (unknownCollectionNames.length > 0) {
    throw new SeedError(
      `Unknown collections '${unknownCollectionNames.join(", ")}'. Available: ${Object.values(COLLECTION_NAMES).join(", ")}`,
    );
  }

  return SEED_ORDER.filter((collection) => onlyCollections.includes(COLLECTION_NAMES[collection]));
};

const seed = async () => {
  const collectionsToSeed = getCollectionsToSeed();
  const seedFiles = await loadSeedFiles(SEED_DIRECTORY);

  await payload.init({ config });
  const db = payload.db.drizzle as DB;

  console.log(
    `🌱 Seeding ${env} (${databaseTarget}) from ${SEED_DIRECTORY}${dryRun ? " (dry run)" : ""}\n`,
  );

  try {
    await db.transaction(async (tx) => {
      const mediaIdsByFilename = await getMediaIdsByFilename(tx);
      assertValidSeedFiles(seedFiles, new Set(mediaIdsByFilename.keys()));
      console.log("✔️  Seed files are valid\n");

      const orphansByCollection = await findOrphans(tx, seedFiles, collectionsToSeed);
      const orphanLines = describeOrphans(orphansByCollection);

      if (orphanLines.length > 0 && !deleteOrphans) {
        throw new SeedError(
          `${orphanLines.length} ${orphanLines.length === 1 ? "row" : "rows"} in the database ${orphanLines.length === 1 ? "is" : "are"} missing from the seed files. Run again with --delete-orphans to delete them:\n${orphanLines.map((orphanLine) => `  - ${orphanLine}`).join("\n")}`,
        );
      }

      await deleteOrphanRows(tx, orphansByCollection);

      for (const collection of collectionsToSeed) {
        await SEED_STEPS[collection](tx, seedFiles, mediaIdsByFilename);
      }

      // After the indicators, which the relationship rows point at
      if (collectionsToSeed.includes("categories")) {
        await seedDefaultIndicators(tx, seedFiles);
      }

      if (dryRun) {
        throw new DryRunRollback();
      }
    });

    console.log(`\n✅ Done: ${writtenRows} rows written`);
  } catch (error) {
    if (!(error instanceof DryRunRollback)) {
      throw error;
    }

    console.log(`\n↩️  Dry run rolled back: ${writtenRows} rows would be written`);
  }

  process.exit(0);
};

void seed().catch((error) => {
  // Printed as text: console.error truncates long objects, and the file errors can be thousands of lines
  if (error instanceof SeedError) {
    console.error(`❌ ${error.message}`);
  } else {
    console.error("❌ Error in seeding:", error);
  }

  process.exit(1);
});
