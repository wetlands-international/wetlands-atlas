/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";

import { DatabaseAdapter } from "payload";

import dotenv from "dotenv";
import { and, eq, sql } from "drizzle-orm";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const env = argv.env || argv.e || "development";

let dotenvFile;
if (env === "development") {
  dotenvFile = ".env";
} else {
  // This is needed to ensure a ssl connection for the database connection

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

// Import payload and config after dotenv is configured
const { default: payload } = await import("payload");
const { default: config } = await import("../../app/src/payload.config");

const LOCATIONS_FILE_PATH = `../app-initial-data/locations.json`;
const CATEGORIES_FILE_PATH = `../app-initial-data/categories.json`;
const INDICATORS_FILE_PATH = `../app-initial-data/indicators.json`;
const INDICATOR_DATA_FILE_PATH = `../app-initial-data/indicator-data.json`;
const LAYERS_FILE_PATH = `../app-initial-data/layers.json`;

type DB = DatabaseAdapter["drizzle"] & { query: Record<string, any> };
type TX = Parameters<Parameters<DB["transaction"]>[0]>[0] & { query: Record<string, any> };

const seedLocations = async (db: DB, tx: TX) => {
  const locations = db.query.locations.table;
  const locationsLocales = db.query.locations_locales.table;

  const rows = JSON.parse(await fs.promises.readFile(LOCATIONS_FILE_PATH, "utf-8"));
  for (const row of rows) {
    const { id, name, code, geometry, type, parent } = row;
    const bbox = row.bbox ? JSON.parse(row.bbox) : null;

    const now = new Date().toISOString();
    await tx
      .insert(locations)
      .values({
        id,
        code,
        type,
        bbox,
        geometry,
        geometry_4326: sql`ST_GeomFromGeoJSON(${JSON.stringify(geometry)})`,
        parent,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: locations.id,
        set: {
          code,
          type,
          bbox,
          geometry,
          geometry_4326: sql`ST_GeomFromGeoJSON(${JSON.stringify(geometry)})`,
          parent,
          updatedAt: now,
        },
      });

    await tx
      .insert(locationsLocales)
      .values({
        _locale: "en",
        _parentID: id,
        name: name.replace(/'/g, "''"),
      })
      .onConflictDoUpdate({
        target: [locationsLocales._locale, locationsLocales._parentID],
        set: {
          name: name.replace(/'/g, "''"),
        },
      });
  }
  console.log("✅ Seeded locations data.");
};

const seedIndicators = async (db: DB, tx: TX): Promise<void> => {
  const indicators = db.query.indicators.table;
  const indicatorsLocales = db.query.indicators_locales.table;

  const rows = JSON.parse(await fs.promises.readFile(INDICATORS_FILE_PATH, "utf-8"));
  const now = new Date().toISOString();

  for (const row of rows) {
    const { id, name, description, category } = row;

    // Step 1: Ensure category exists (foreign key)
    const categoryExists = await tx.query.categories.findFirst({
      where: eq(db.query.categories.table.id, category),
    });

    if (!categoryExists) {
      console.warn(`⚠️ Skipping indicator '${id}' — category '${category}' not found.`);
      continue;
    }

    // Step 2: Upsert into indicators
    await tx
      .insert(indicators)
      .values({
        id,
        category,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: indicators.id,
        set: {
          category,
          updatedAt: now,
        },
      });

    // Step 3: Upsert into indicators_locales (en only)
    await tx
      .insert(indicatorsLocales)
      .values({
        _locale: "en",
        _parentID: id,
        name,
        description,
      })
      .onConflictDoUpdate({
        target: [indicatorsLocales._locale, indicatorsLocales._parentID],
        set: {
          name,
          description,
        },
      });
  }

  console.log("✅ Seeded indicators data.");
};

const seedCategories = async (db: DB, tx: TX): Promise<void> => {
  const categories = db.query.categories.table;
  const categoriesLocales = db.query.categories_locales.table;

  const rows = JSON.parse(await fs.promises.readFile(CATEGORIES_FILE_PATH, "utf-8"));
  const now = new Date().toISOString();

  for (const row of rows) {
    const { id, name, description, cover } = row;

    // Step 1: Upsert into categories table
    await tx
      .insert(categories)
      .values({
        id,
        cover: cover ?? null,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: categories.id,
        set: {
          cover: cover ?? null,
          updatedAt: now,
        },
      });

    // Step 2: Upsert localized name/description (en only)
    await tx
      .insert(categoriesLocales)
      .values({
        _locale: "en",
        _parentID: id,
        name,
        description,
      })
      .onConflictDoUpdate({
        target: [categoriesLocales._locale, categoriesLocales._parentID],
        set: {
          name,
          description,
        },
      });
  }

  console.log("✅ Seeded categories data.");
};

const seedCategoryIndicatorRels = async (db: DB, tx: TX): Promise<void> => {
  const categoriesRels = db.query.categories_rels?.table;
  if (!categoriesRels) return;

  const rows = JSON.parse(await fs.promises.readFile(CATEGORIES_FILE_PATH, "utf-8"));

  for (const row of rows) {
    const { id: categoryId, defaultIndicators } = row;
    if (!Array.isArray(defaultIndicators)) continue;

    let order = 0;
    for (const indicatorID of defaultIndicators) {
      const foundRelationships = await tx.query.categories_rels.findFirst({
        where: and(
          eq(categoriesRels.parent, categoryId),
          eq(categoriesRels.indicatorsID, indicatorID),
          eq(categoriesRels.order, order),
          eq(categoriesRels.path, `${categoryId}.${indicatorID}`),
        ),
      });

      if (foundRelationships) continue;

      await tx
        .insert(categoriesRels)
        .values({
          parent: categoryId,
          indicatorsID: indicatorID,
          order,
          path: `${categoryId}.${indicatorID}`,
        })
        .onConflictDoNothing();
      order++;
    }
  }

  console.log("✅ Seeded category–indicator relationships.");
};

const seedIndicatorsData = async (db: DB, tx: TX): Promise<void> => {
  const indicatorData = db.query.indicator_data.table;

  const rows = JSON.parse(await fs.promises.readFile(INDICATOR_DATA_FILE_PATH, "utf-8"));
  const now = new Date().toISOString();

  for (const row of rows) {
    const { id, indicator, location, data } = row;

    // Optional: Check that both referenced rows exist
    const [indicatorExists, locationExists] = await Promise.all([
      tx.query.indicators.findFirst({ where: eq(db.query.indicators.table.id, indicator) }),
      tx.query.locations.findFirst({ where: eq(db.query.locations.table.id, location) }),
    ]);

    if (!indicatorExists || !locationExists) {
      console.warn(
        `⚠️ Skipping indicator data '${id}' — missing reference: ` +
          `${!indicatorExists ? `indicator '${indicator}' ` : ""}` +
          `${!locationExists ? `location '${location}'` : ""}`,
      );
      continue;
    }

    await tx
      .insert(indicatorData)
      .values({
        id,
        indicator,
        location,
        data,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: indicatorData.id,
        set: {
          indicator,
          location,
          data,
          updatedAt: now,
        },
      });
  }

  console.log("✅ Seeded indicator-data entries.");
};

const seedLayers = async (db: DB, tx: TX): Promise<void> => {
  const layers = db.query.layers.table;
  const layersLocales = db.query.layers_locales.table;

  const rows = JSON.parse(await fs.promises.readFile(LAYERS_FILE_PATH, "utf-8"));
  const now = new Date().toISOString();

  for (const row of rows) {
    const { id, name, renderingConfig, paramsConfig, legendConfig, indicator, type } = row;

    console.log(legendConfig);

    // Optional: validate indicator exists for LAYER_TYPE.INDICATOR
    if (type === "INDICATOR" && indicator) {
      const indicatorExists = await tx.query.indicators.findFirst({
        where: eq(db.query.indicators.table.id, indicator),
      });

      if (!indicatorExists) {
        console.warn(`⚠️ Skipping layer '${id}' — indicator '${indicator}' not found.`);
        continue;
      }
    }

    // Upsert into layers table
    await tx
      .insert(layers)
      .values({
        id,
        config: renderingConfig,
        params_config: paramsConfig,
        legend_config: legendConfig,
        indicator: indicator ?? null,
        type,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: layers.id,
        set: {
          config: renderingConfig,
          params_config: paramsConfig,
          legend_config: legendConfig,
          indicator: indicator ?? null,
          type,
          updatedAt: now,
        },
      });

    // Upsert localized name (en only)
    await tx
      .insert(layersLocales)
      .values({
        _locale: "en",
        _parentID: id,
        name,
      })
      .onConflictDoUpdate({
        target: [layersLocales._locale, layersLocales._parentID],
        set: {
          name,
        },
      });
  }

  console.log("✅ Seeded layers.");
};

const seed = async () => {
  await payload.init({ config });

  const db = payload.db.drizzle;

  await db.transaction(async (tx) => {
    // await seedLocations(db, tx);
    // await seedCategories(db, tx);
    // await seedIndicators(db, tx);
    // await seedCategoryIndicatorRels(db, tx);
    // await seedIndicatorsData(db, tx);
    await seedLayers(db, tx);
  });

  process.exit(0);
};

void seed().catch((err) => {
  console.error("❌ Error in seeding:", err);
  process.exit(1);
});
