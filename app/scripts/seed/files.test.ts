import { describe, expect, it } from "vitest";

import { categorySchema, indicatorSchema, regionSchema, TRANSLATION_LOCALES } from "./files";

const region = {
  id: "sahel",
  name: "Sahel",
  description: null,
  introTitle: "Discover Sahel wetlands",
  introDescription: "Dive into different topics.",
  cover: null,
  color: "#ADBC3D",
  order: 0,
  published: true,
};

const issuePaths = (result: { success: boolean; error?: { issues: { path: PropertyKey[] }[] } }) =>
  result.error?.issues.map((issue) => issue.path.join(".")) ?? [];

describe("seed file schemas", () => {
  it("lists every locale but the default one as a translation locale", () => {
    expect(TRANSLATION_LOCALES).toEqual(["fr"]);
  });

  it("accepts a region with a partial translation", () => {
    const result = regionSchema.safeParse({ ...region, locale: { fr: { name: "Sahel" } } });

    expect(result.success).toBe(true);
  });

  it("rejects the default locale inside the locale block", () => {
    const result = regionSchema.safeParse({ ...region, locale: { en: { name: "Sahel" } } });

    expect(result.success).toBe(false);
    expect(issuePaths(result)).toContain("locale.en");
  });

  it("reports every invalid field of a region", () => {
    const result = regionSchema.safeParse({
      ...region,
      id: "",
      color: "red",
      order: -1,
      published: "yes",
    });

    expect(result.success).toBe(false);
    expect(issuePaths(result)).toEqual(["id", "color", "order", "published"]);
  });

  it("requires the default indicators of a category to be a list of IDs", () => {
    const category = {
      id: "sahel-wetlands-ramsar",
      name: "Network",
      description: null,
      region: "sahel",
      cover: "network.avif",
      order: 4,
      published: true,
    };

    expect(categorySchema.safeParse({ ...category, defaultIndicators: [] }).success).toBe(true);
    expect(categorySchema.safeParse({ ...category, defaultIndicators: null }).success).toBe(false);
  });

  it("accepts rich text and labels on an indicator and its translations", () => {
    const result = indicatorSchema.safeParse({
      id: "sahel-wetland-types-ramsar",
      name: "Wetland types",
      unit: null,
      description: { root: { type: "root", children: [] } },
      category: "sahel-wetlands-ramsar",
      widget: null,
      labels: { inland: "Inland wetland" },
      order: 1,
      locale: { fr: { name: "Types", labels: { inland: "Zone humide intérieure" } } },
    });

    expect(result.success).toBe(true);
  });

  it("rejects labels whose values are not text", () => {
    const result = indicatorSchema.safeParse({
      id: "x",
      name: "x",
      unit: null,
      description: null,
      category: "c",
      widget: null,
      labels: { inland: 1 },
      order: 0,
    });

    expect(result.success).toBe(false);
    expect(issuePaths(result)).toEqual(["labels.inland"]);
  });
});
