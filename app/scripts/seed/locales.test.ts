import { describe, expect, it } from "vitest";

import { localeRowsOf, LOCALIZED_FIELDS } from "./locales";

const category = {
  id: "sahel-wetlands-ramsar",
  name: "Network",
  description: "Ramsar sites",
};

describe("localeRowsOf", () => {
  it("writes the top-level values as the default locale", () => {
    expect(localeRowsOf(category, LOCALIZED_FIELDS.categories)).toEqual([
      {
        _locale: "en",
        _parentID: "sahel-wetlands-ramsar",
        name: "Network",
        description: "Ramsar sites",
      },
    ]);
  });

  it("adds one row per locale of the block, with null for the fields it omits", () => {
    const rows = localeRowsOf(
      { ...category, locale: { fr: { name: "Réseau" } } },
      LOCALIZED_FIELDS.categories,
    );

    expect(rows[1]).toEqual({
      _locale: "fr",
      _parentID: "sahel-wetlands-ramsar",
      name: "Réseau",
      description: null,
    });
  });

  it("falls back to the default locale for a required field the block omits or nulls", () => {
    const rows = localeRowsOf(
      { ...category, locale: { fr: { name: null, description: "Sites Ramsar" } } },
      LOCALIZED_FIELDS.categories,
    );

    expect(rows[1]).toEqual({
      _locale: "fr",
      _parentID: "sahel-wetlands-ramsar",
      name: "Network",
      description: "Sites Ramsar",
    });
  });

  it("ignores a locale without a block", () => {
    expect(localeRowsOf({ ...category, locale: {} }, LOCALIZED_FIELDS.categories)).toHaveLength(1);
  });

  it("rejects a field list the record doesn't have", () => {
    expect(() =>
      localeRowsOf(category, { localizedFields: ["introTitle"], requiredFields: [] }),
    ).toThrow("Record 'sahel-wetlands-ramsar' has no field 'introTitle'");
  });
});
