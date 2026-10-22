/**
 * The seed files of the read-only collections (`app-initial-data/*.json`), as written by `scripts/export.ts` and the
 * WM-119 notebooks. The schemas reject a malformed file before the seed writes anything.
 *
 * Each record carries the English values at the top level and the other locales in a `locale` block
 * (`locale.fr.name`, …). A locale may omit any field: Payload then falls back to English at read time.
 */
import fs from "fs";
import path from "path";

import { z } from "zod";

import { LOCATION_TYPE } from "../../src/cms/collections/Location";
import { routing } from "../../src/i18n/routing";

/** An error about the content of the seed files, reported without a stack trace */
export class SeedError extends Error {}

export const DEFAULT_LOCALE = routing.defaultLocale;

export type Locale = (typeof routing.locales)[number];

export type TranslationLocale = Exclude<Locale, typeof DEFAULT_LOCALE>;

/** The locales a `locale` block may hold: every supported locale but the default one */
export const TRANSLATION_LOCALES = routing.locales.filter(
  (locale): locale is TranslationLocale => locale !== DEFAULT_LOCALE,
);

const idSchema = z.string().min(1);

const nullableTextSchema = z.string().nullable();

const orderSchema = z.number().int().min(0);

/** The translations of the localized fields of a record, by locale. Every field is optional within a locale. */
const translationsSchema = <Shape extends z.ZodRawShape>(localizedFields: Shape) =>
  z.partialRecord(z.enum(TRANSLATION_LOCALES), z.object(localizedFields).partial()).optional();

const regionLocalizedFields = {
  name: z.string().min(1),
  description: nullableTextSchema,
  introTitle: z.string().min(1),
  introDescription: z.string().min(1),
};

export const regionSchema = z.object({
  id: idSchema,
  ...regionLocalizedFields,
  /** The `filename` of a row of the media collection, uploaded in the CMS beforehand */
  cover: nullableTextSchema,
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "must be a hexadecimal color such as #ADBC3D"),
  order: orderSchema,
  published: z.boolean(),
  locale: translationsSchema(regionLocalizedFields),
});

const locationLocalizedFields = {
  name: z.string().min(1),
};

const position = z.array(z.number()).min(2);
const ring = z.array(position);

/** The GeoJSON geometry of a location, as the files carry it: a polygon or a multipolygon */
const geometrySchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("Polygon"), coordinates: z.array(ring).min(1) }),
  z.object({ type: z.literal("MultiPolygon"), coordinates: z.array(z.array(ring).min(1)).min(1) }),
]);

export const locationSchema = z.object({
  id: idSchema,
  ...locationLocalizedFields,
  region: idSchema,
  code: z.string().min(1),
  geometry: geometrySchema,
  bbox: z.tuple([z.number(), z.number(), z.number(), z.number()]),
  type: z.enum(Object.values(LOCATION_TYPE)),
  parent: idSchema.nullable(),
  locale: translationsSchema(locationLocalizedFields),
});

const categoryLocalizedFields = {
  name: z.string().min(1),
  description: nullableTextSchema,
};

export const categorySchema = z.object({
  id: idSchema,
  ...categoryLocalizedFields,
  region: idSchema,
  /** The `filename` of a row of the media collection, uploaded in the CMS beforehand */
  cover: nullableTextSchema,
  order: orderSchema,
  published: z.boolean(),
  defaultIndicators: z.array(idSchema),
  locale: translationsSchema(categoryLocalizedFields),
});

const indicatorLocalizedFields = {
  name: z.string().min(1),
  unit: nullableTextSchema,
  /** Lexical rich text */
  description: z.json().nullable(),
  /** Lexical rich text */
  widget: z.json().nullable(),
  /** Display text of the keys of the indicator data, e.g. `{ "inland": "Inland wetland" }` */
  labels: z.record(z.string(), z.string()).nullable(),
};

export const indicatorSchema = z.object({
  id: idSchema,
  ...indicatorLocalizedFields,
  category: idSchema,
  order: orderSchema,
  locale: translationsSchema(indicatorLocalizedFields),
});

export const indicatorDataSchema = z.object({
  id: idSchema,
  indicator: idSchema,
  location: idSchema,
  /** The chart or table rows of the indicator at that location */
  data: z.array(z.json()),
});

export type RegionRecord = z.infer<typeof regionSchema>;
export type LocationRecord = z.infer<typeof locationSchema>;
export type CategoryRecord = z.infer<typeof categorySchema>;
export type IndicatorRecord = z.infer<typeof indicatorSchema>;
export type IndicatorDataRecord = z.infer<typeof indicatorDataSchema>;

export type SeedFiles = {
  regions: RegionRecord[];
  locations: LocationRecord[];
  categories: CategoryRecord[];
  indicators: IndicatorRecord[];
  indicatorData: IndicatorDataRecord[];
};

const SEED_FILE_NAMES = {
  regions: "regions.json",
  locations: "locations.json",
  categories: "categories.json",
  indicators: "indicators.json",
  indicatorData: "indicator-data.json",
} satisfies Record<keyof SeedFiles, string>;

/** Reads and validates one seed file. Returns `undefined` after adding the schema errors to `schemaErrors`. */
const loadSeedFile = async <Schema extends z.ZodType>(
  directory: string,
  fileName: string,
  schema: Schema,
  schemaErrors: string[],
): Promise<z.infer<Schema> | undefined> => {
  const fileContent: unknown = JSON.parse(
    await fs.promises.readFile(path.join(directory, fileName), "utf-8"),
  );

  const parseResult = schema.safeParse(fileContent);

  if (!parseResult.success) {
    schemaErrors.push(`${fileName}:\n${z.prettifyError(parseResult.error)}`);

    return undefined;
  }

  return parseResult.data;
};

/** Reads and validates the five seed files of `directory`. Throws with every schema error of every file. */
export const loadSeedFiles = async (directory: string): Promise<SeedFiles> => {
  const schemaErrors: string[] = [];

  const regions = await loadSeedFile(
    directory,
    SEED_FILE_NAMES.regions,
    z.array(regionSchema),
    schemaErrors,
  );
  const locations = await loadSeedFile(
    directory,
    SEED_FILE_NAMES.locations,
    z.array(locationSchema),
    schemaErrors,
  );
  const categories = await loadSeedFile(
    directory,
    SEED_FILE_NAMES.categories,
    z.array(categorySchema),
    schemaErrors,
  );
  const indicators = await loadSeedFile(
    directory,
    SEED_FILE_NAMES.indicators,
    z.array(indicatorSchema),
    schemaErrors,
  );
  const indicatorData = await loadSeedFile(
    directory,
    SEED_FILE_NAMES.indicatorData,
    z.array(indicatorDataSchema),
    schemaErrors,
  );

  if (!regions || !locations || !categories || !indicators || !indicatorData) {
    throw new SeedError(`Invalid seed files\n\n${schemaErrors.join("\n\n")}`);
  }

  return { regions, locations, categories, indicators, indicatorData };
};
