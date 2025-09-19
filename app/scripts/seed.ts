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

const MEDIA_FILE_PATH = `../app-initial-data/media.json`;
const LOCATIONS_FILE_PATH = `../app-initial-data/locations.json`;
const CATEGORIES_FILE_PATH = `../app-initial-data/categories.json`;
const INDICATORS_FILE_PATH = `../app-initial-data/indicators.json`;
const INDICATOR_DATA_FILE_PATH = `../app-initial-data/indicator-data.json`;
const LAYERS_FILE_PATH = `../app-initial-data/layers.json`;
const LANDSCAPES_FILE_PATH = `../app-initial-data/landscapes.json`;

type DB = DatabaseAdapter["drizzle"] & { query: Record<string, any> };
type TX = Parameters<Parameters<DB["transaction"]>[0]>[0] & { query: Record<string, any> };

const seedMedia = async (db: DB, tx: TX) => {
  const media = db.query.media.table;
  const rows = JSON.parse(await fs.promises.readFile(MEDIA_FILE_PATH, "utf-8"));
  const now = new Date().toISOString();

  for (const row of rows) {
    const { id, alt, url, filename, mime_type, filesize, width, height, focal_x, focal_y } = row;

    await tx
      .insert(media)
      .values({
        id,
        alt,
        url,
        filename,
        mime_type,
        filesize,
        width,
        height,
        focal_x,
        focal_y,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: media.id,
        set: {
          id,
          alt,
          url,
          filename,
          mime_type,
          filesize,
          width,
          height,
          focal_x,
          focal_y,
          updatedAt: now,
        },
      });
  }

  console.log("✅ Seeded media.");
};

const seedLocations = async (db: DB, tx: TX) => {
  const locations = db.query.locations.table;
  const locationsLocales = db.query.locations_locales.table;

  const rows = JSON.parse(await fs.promises.readFile(LOCATIONS_FILE_PATH, "utf-8"));
  for (const row of rows) {
    const { id, name, code, geometry, type, parent } = row;
    const bbox = row.bbox;

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
    const { id, name, description, category, widget } = row;

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
        widget,
      })
      .onConflictDoUpdate({
        target: [indicatorsLocales._locale, indicatorsLocales._parentID],
        set: {
          name,
          description,
          widget,
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
  const indicatorDataLocales = db.query.indicator_data_locales.table;

  const rows = JSON.parse(await fs.promises.readFile(INDICATOR_DATA_FILE_PATH, "utf-8"));
  const now = new Date().toISOString();

  for (const row of rows) {
    const { id, location, data, locale } = row;
    // All entries in the indicator-data.json are for the wetlands-mitigation-potential indicator
    const indicator = "wetlands-mitigation-potential";

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

    // Insert/update main indicator_data table
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

    // Handle localized labels
    if (locale && typeof locale === "object") {
      for (const [localeCode, localeData] of Object.entries(locale)) {
        if (localeData && typeof localeData === "object" && "labels" in localeData) {
          await tx
            .insert(indicatorDataLocales)
            .values({
              _locale: localeCode,
              _parentID: id,
              labels: localeData.labels,
            })
            .onConflictDoUpdate({
              target: [indicatorDataLocales._locale, indicatorDataLocales._parentID],
              set: {
                labels: localeData.labels,
              },
            });
        }
      }
    }
  }

  console.log("✅ Seeded indicator-data entries.");
};

const seedLayers = async (db: DB, tx: TX): Promise<void> => {
  const layers = db.query.layers.table;
  const layersLocales = db.query.layers_locales.table;

  const rows = JSON.parse(await fs.promises.readFile(LAYERS_FILE_PATH, "utf-8"));
  const now = new Date().toISOString();

  for (const row of rows) {
    const { id, name, config, params_config, legend_config, indicator, type } = row;

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
        config,
        params_config,
        legend_config,
        indicator: indicator ?? null,
        type,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: layers.id,
        set: {
          config,
          params_config,
          legend_config,
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

const seedLandscapes = async (db: DB, tx: TX): Promise<void> => {
  const landscapes = db.query.landscapes.table;
  const landscapesLocales = db.query.landscapes_locales.table;
  const landscapesSteps = db.query.landscapes_steps.table;
  const landscapesStepsLocales = db.query.landscapes_steps_locales.table;

  const rows = JSON.parse(await fs.promises.readFile(LANDSCAPES_FILE_PATH, "utf-8"));
  const now = new Date().toISOString();

  for (const row of rows) {
    const { id, name, cover, description, category, location, published, embeddedVideo, steps } =
      row;

    // Optional: Check that category exists (foreign key)
    const categoryExists = await tx.query.categories.findFirst({
      where: eq(db.query.categories.table.id, category),
    });

    if (!categoryExists) {
      console.warn(`⚠️ Skipping landscape '${id}' — category '${category}' not found.`);
      continue;
    }

    // Convert location array to PostGIS point format
    const locationPoint = location ? `POINT(${location[0]} ${location[1]})` : null;

    // Upsert into landscapes table (without steps - they'll be in separate table)
    await tx
      .insert(landscapes)
      .values({
        id,
        category,
        cover: cover ?? null,
        location: locationPoint ? sql`ST_GeomFromText(${locationPoint}, 4326)` : null,
        published: published ?? false,
        embedded_video_type: embeddedVideo?.type,
        embedded_video_source: embeddedVideo?.source,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: landscapes.id,
        set: {
          category,
          cover: cover ?? null,
          location: locationPoint ? sql`ST_GeomFromText(${locationPoint}, 4326)` : null,
          published: published ?? false,
          embedded_video_type: embeddedVideo?.type,
          embedded_video_source: embeddedVideo?.source,
          updatedAt: now,
        },
      });

    // Upsert localized fields (en only)
    await tx
      .insert(landscapesLocales)
      .values({
        _locale: "en",
        _parentID: id,
        name,
        description,
        embedded_video_title: embeddedVideo?.title ?? null,
      })
      .onConflictDoUpdate({
        target: [landscapesLocales._locale, landscapesLocales._parentID],
        set: {
          name,
          description,
          embedded_video_title: embeddedVideo?.title ?? null,
        },
      });

    // Handle steps as separate table entries
    if (Array.isArray(steps)) {
      for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
        const step = steps[stepIndex];
        const stepId = `${id}-step-${stepIndex}`;

        // Upsert into landscapes_steps table
        await tx
          .insert(landscapesSteps)
          .values({
            id: stepId,
            _order: stepIndex,
            _parentID: id,
            type: step.type,
            map: step.map ? JSON.stringify(step.map) : null,
            chart: step.chart ? JSON.stringify(step.chart) : null,
          })
          .onConflictDoUpdate({
            target: landscapesSteps.id,
            set: {
              _order: stepIndex,
              _parentID: id,
              type: step.type,
              map: step.map ? JSON.stringify(step.map) : null,
              chart: step.chart ? JSON.stringify(step.chart) : null,
            },
          });

        // Upsert into landscapes_steps_locales table
        await tx
          .insert(landscapesStepsLocales)
          .values({
            _locale: "en",
            _parentID: stepId,
            sidebar: JSON.stringify(step.sidebar),
          })
          .onConflictDoUpdate({
            target: [landscapesStepsLocales._locale, landscapesStepsLocales._parentID],
            set: {
              sidebar: JSON.stringify(step.sidebar),
            },
          });
      }
    }
  }

  console.log("✅ Seeded landscapes with steps.");
};

const seed = async () => {
  await payload.init({ config });

  const db = payload.db.drizzle;

  await db.transaction(async (tx) => {
    await seedMedia(db, tx);
    await seedLocations(db, tx);
    await seedCategories(db, tx);
    await seedIndicators(db, tx);
    await seedCategoryIndicatorRels(db, tx);
    await seedIndicatorsData(db, tx);
    await seedLayers(db, tx);
    await seedLandscapes(db, tx);
  });

  process.exit(0);
};

void seed().catch((err) => {
  console.error("❌ Error in seeding:", err);
  process.exit(1);
});
