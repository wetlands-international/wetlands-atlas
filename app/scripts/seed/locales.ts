/**
 * The `_locales` rows of the seeded records (WM-126). Payload stores the localized fields of a collection in its
 * `_locales` table, one row per record and locale. In the files, the English values sit at the top level of the
 * record and the other locales in its `locale` block (`locale.fr.name`, …).
 */
import {
  DEFAULT_LOCALE,
  TRANSLATION_LOCALES,
  type SeedFiles,
  type TranslationLocale,
} from "./files";

export type LocalizedRecord = {
  id: string;
  locale?: Partial<Record<TranslationLocale, Record<string, unknown>>>;
} & Record<string, unknown>;

export type LocalizedFields = {
  localizedFields: readonly string[];
  requiredFields: readonly string[];
};

/** The localized fields of each collection (its `_locales` columns), and the NOT NULL ones among them */
export const LOCALIZED_FIELDS: Record<
  Exclude<keyof SeedFiles, "indicatorData">,
  LocalizedFields
> = {
  regions: {
    localizedFields: ["name", "description", "introTitle", "introDescription"],
    requiredFields: ["name", "introTitle", "introDescription"],
  },
  locations: { localizedFields: ["name"], requiredFields: ["name"] },
  categories: { localizedFields: ["name", "description"], requiredFields: ["name"] },
  indicators: {
    localizedFields: ["name", "unit", "description", "widget", "labels"],
    requiredFields: ["name"],
  },
};

export type LocaleRow = { _locale: string; _parentID: string } & Record<string, unknown>;

/**
 * The `_locales` rows of a record: its top-level values as the default locale, then one row per locale of its
 * `locale` block. A row holds exactly what the file says: a field the block omits is null, except the NOT NULL ones
 * (`requiredFields`), which take the default locale's value, as Payload does when reading. Note that the export then
 * writes that fallback as a translation, so a translated block should always carry the required fields.
 */
export const localeRowsOf = (
  record: LocalizedRecord,
  { localizedFields, requiredFields }: LocalizedFields,
): LocaleRow[] => {
  // The field lists are written by hand: a name the schema doesn't know would silently seed nulls
  for (const localizedField of localizedFields) {
    if (!(localizedField in record)) {
      throw new Error(`Record '${record.id}' has no field '${localizedField}'`);
    }
  }

  const defaultLocaleValues = Object.fromEntries(
    localizedFields.map((localizedField) => [localizedField, record[localizedField]]),
  );
  const localeRows: LocaleRow[] = [
    { _locale: DEFAULT_LOCALE, _parentID: record.id, ...defaultLocaleValues },
  ];

  for (const translationLocale of TRANSLATION_LOCALES) {
    const translationBlock = record.locale?.[translationLocale];

    if (!translationBlock) {
      continue;
    }

    const translatedValues = Object.fromEntries(
      localizedFields.map((localizedField) => [
        localizedField,
        translationBlock[localizedField] ??
          (requiredFields.includes(localizedField) ? defaultLocaleValues[localizedField] : null),
      ]),
    );

    localeRows.push({ _locale: translationLocale, _parentID: record.id, ...translatedValues });
  }

  return localeRows;
};
