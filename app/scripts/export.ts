/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";

import { DatabaseAdapter } from "payload";

import dotenv from "dotenv";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const env = argv.env || argv.e || "development";
const onlyCollections: string[] | undefined = argv.only ? String(argv.only).split(",") : undefined;

let dotenvFile: string;
if (env === "development") {
  dotenvFile = ".env";
} else {
  (process.env as any).NODE_ENV = "production";
  dotenvFile = `.env.${env}`;
}

const dotenvPath = path.resolve(".", dotenvFile);
if (!fs.existsSync(dotenvPath)) {
  const errorMsg = `File not found: ${dotenvPath} for environment ${env}`;
  console.error(errorMsg);
  process.exit(1);
}

dotenv.config({ path: dotenvPath });

const { default: payload } = await import("payload");
const { default: config } = await import("../../app/src/payload.config");

const OUTPUT_DIR = path.resolve("..", "app-initial-data");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

type DB = DatabaseAdapter["drizzle"] & { query: Record<string, any> };

const writeJSON = async (filename: string, data: unknown) => {
  const filePath = path.join(OUTPUT_DIR, filename);
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

  console.log(`✅ Exported ${filename} (${Array.isArray(data) ? data.length : 0} records)`);
};

/** The `cover` of regions and categories is exported as the media filename, which the seed resolves to the ID (WM-97) */
const getMediaFilenames = async (db: DB) => {
  const mediaRows = await db.query.media.findMany();

  return new Map<number, string>(
    mediaRows.map((mediaRow: any) => [mediaRow.id, mediaRow.filename]),
  );
};

/**
 * The localized fields of a collection, by record and locale: `{ en: { name, … }, fr: { name, … } }`. Payload stores
 * them in the `_locales` table of the collection, one row per record and locale.
 */
const groupLocales = (
  localeRows: any[],
  fields: string[],
  transform: (value: unknown) => unknown = (value) => value,
) => {
  const localesByRecord = new Map<string, Record<string, Record<string, unknown>>>();

  for (const localeRow of localeRows) {
    const localizedValues: Record<string, unknown> = {};

    for (const field of fields) {
      if (localeRow[field] !== null && localeRow[field] !== undefined) {
        localizedValues[field] = transform(localeRow[field]);
      }
    }

    localesByRecord.set(localeRow._parentID, {
      ...(localesByRecord.get(localeRow._parentID) ?? {}),
      [localeRow._locale]: localizedValues,
    });
  }

  return localesByRecord;
};

/**
 * The `locale` block of a record: its translations, without the `en` values of `topLevelFields`, which are exported at
 * the top level of the record. `en` only appears when it has other localized fields (e.g. the labels of an indicator).
 * Records without translations have no block.
 */
const translationsOf = (
  locales: Record<string, Record<string, unknown>> | undefined,
  topLevelFields: string[],
) => {
  const translations: Record<string, Record<string, unknown>> = {};

  for (const [locale, localizedValues] of Object.entries(locales ?? {})) {
    const translatedValues =
      locale === "en"
        ? Object.fromEntries(
            Object.entries(localizedValues).filter(([field]) => !topLevelFields.includes(field)),
          )
        : localizedValues;

    if (Object.keys(translatedValues).length > 0) {
      translations[locale] = translatedValues;
    }
  }

  return Object.keys(translations).length > 0 ? translations : undefined;
};

/** The seed used to escape the quotes of the location names for SQL, doubling them in the database */
const unescapeQuotes = (value: unknown) =>
  typeof value === "string" ? value.replace(/''/g, "'") : value;

const REGION_FIELDS = ["name", "description", "introTitle", "introDescription"];

const exportRegions = async (db: DB) => {
  const rows = await db.query.regions.findMany();
  const locales = groupLocales(await db.query.regions_locales.findMany(), REGION_FIELDS);
  const mediaFilenames = await getMediaFilenames(db);

  // The hidden `other` region of the landscapes outside every region is exported too, so the seed keeps it (WM-118)
  const data = rows.map((row: any) => {
    const en = locales.get(row.id)?.en ?? {};

    return {
      id: row.id,
      name: en.name ?? null,
      description: en.description ?? null,
      introTitle: en.introTitle ?? null,
      introDescription: en.introDescription ?? null,
      cover: mediaFilenames.get(row.cover) ?? null,
      color: row.color,
      order: row.order,
      published: row.published ?? false,
      locale: translationsOf(locales.get(row.id), REGION_FIELDS),
    };
  });

  await writeJSON("regions.json", data);
};

const LOCATION_FIELDS = ["name"];

const exportLocations = async (db: DB) => {
  const rows = await db.query.locations.findMany();
  const locales = groupLocales(
    await db.query.locations_locales.findMany(),
    LOCATION_FIELDS,
    unescapeQuotes,
  );

  const data = rows.map((row: any) => {
    const en = locales.get(row.id)?.en ?? {};

    return {
      id: row.id,
      name: en.name ?? null,
      region: row.region,
      code: row.code,
      geometry: row.geometry,
      bbox: row.bbox,
      type: row.type,
      parent: row.parent ?? null,
      locale: translationsOf(locales.get(row.id), LOCATION_FIELDS),
    };
  });

  await writeJSON("locations.json", data);
};

const CATEGORY_FIELDS = ["name", "description"];

const exportCategories = async (db: DB) => {
  const rows = await db.query.categories.findMany();
  const locales = groupLocales(await db.query.categories_locales.findMany(), CATEGORY_FIELDS);
  const rels = db.query.categories_rels ? await db.query.categories_rels.findMany() : [];
  const mediaFilenames = await getMediaFilenames(db);

  // Build defaultIndicators from rels
  const relsMap = new Map<string, string[]>();
  const sortedRels = [...rels]
    .filter((r: any) => r.path === "defaultIndicators")
    .sort((a: any, b: any) => a.order - b.order);

  for (const rel of sortedRels) {
    const arr = relsMap.get(rel.parent) ?? [];
    arr.push(rel.indicatorsID);
    relsMap.set(rel.parent, arr);
  }

  const data = rows.map((row: any) => {
    const en = locales.get(row.id)?.en ?? {};

    return {
      id: row.id,
      name: en.name ?? null,
      description: en.description ?? null,
      region: row.region,
      cover: mediaFilenames.get(row.cover) ?? null,
      order: row.order,
      published: row.published ?? false,
      defaultIndicators: relsMap.get(row.id) ?? [],
      locale: translationsOf(locales.get(row.id), CATEGORY_FIELDS),
    };
  });

  await writeJSON("categories.json", data);
};

/** `labels` has no top-level field: the `en` labels stay in the `locale` block, as the seed reads them */
const INDICATOR_FIELDS = ["name", "unit", "description", "widget", "labels"];
const INDICATOR_TOP_LEVEL_FIELDS = ["name", "unit", "description", "widget"];

const exportIndicators = async (db: DB) => {
  const rows = await db.query.indicators.findMany();
  const locales = groupLocales(await db.query.indicators_locales.findMany(), INDICATOR_FIELDS);

  const data = rows.map((row: any) => {
    const en = locales.get(row.id)?.en ?? {};

    return {
      id: row.id,
      name: en.name ?? null,
      unit: en.unit ?? null,
      description: en.description ?? null,
      category: row.category,
      widget: en.widget ?? null,
      order: row.order,
      locale: translationsOf(locales.get(row.id), INDICATOR_TOP_LEVEL_FIELDS),
    };
  });

  await writeJSON("indicators.json", data);
};

const exportIndicatorData = async (db: DB) => {
  const rows = await db.query.indicator_data.findMany();

  const data = rows.map((row: any) => ({
    id: row.id,
    indicator: row.indicator,
    location: row.location,
    data: row.data,
  }));
  await writeJSON("indicator-data.json", data);
};

const exportAll = async () => {
  await payload.init({ config });

  const db = payload.db.drizzle as DB;

  console.log(`\n📦 Exporting data from ${env} database...\n`);

  const EXPORT_STEPS: Record<string, (db: DB) => Promise<void>> = {
    regions: exportRegions,
    locations: exportLocations,
    categories: exportCategories,
    indicators: exportIndicators,
    "indicator-data": exportIndicatorData,
  };

  for (const name of onlyCollections ?? Object.keys(EXPORT_STEPS)) {
    const step = EXPORT_STEPS[name];

    if (!step) {
      console.error(
        `❌ Unknown collection: '${name}'. Available: ${Object.keys(EXPORT_STEPS).join(", ")}`,
      );
      process.exit(1);
    }

    await step(db);
  }

  console.log(`\n✅ All data exported to ${OUTPUT_DIR}\n`);

  process.exit(0);
};

void exportAll().catch((err) => {
  console.error("❌ Error in export:", err);
  process.exit(1);
});
