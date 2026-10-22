import { describe, expect, it } from "vitest";

import type { SeedFiles } from "./files";
import { validateSeedFiles } from "./validate";

const geometry = {
  type: "MultiPolygon" as const,
  coordinates: [
    [
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 0],
      ],
    ],
  ],
};

const validFiles = (): SeedFiles => ({
  regions: [
    {
      id: "sahel",
      name: "Sahel",
      description: null,
      introTitle: "Discover",
      introDescription: "Dive in",
      cover: "sahel.avif",
      color: "#ADBC3D",
      order: 0,
      published: true,
    },
    {
      id: "other",
      name: "Other (hidden)",
      description: null,
      introTitle: "Other (hidden)",
      introDescription: "Landscapes outside the published regions.",
      cover: null,
      color: "#7D7D7D",
      order: 2,
      published: false,
    },
  ],
  locations: [
    {
      id: "sahel_global",
      name: "Sahel",
      region: "sahel",
      code: "sahel",
      geometry,
      bbox: [0, 0, 1, 1],
      type: "global",
      parent: null,
    },
    {
      id: "sahel_adminregion_mli",
      name: "Mali",
      region: "sahel",
      code: "MLI",
      geometry,
      bbox: [0, 0, 1, 1],
      type: "admin_region",
      parent: "sahel_global",
    },
  ],
  categories: [
    {
      id: "sahel-wetlands-ramsar",
      name: "Network",
      description: null,
      region: "sahel",
      cover: "network.avif",
      order: 1,
      published: true,
      defaultIndicators: ["sahel-ramsar-sites"],
    },
    {
      id: "other-other",
      name: "Other (hidden)",
      description: null,
      region: "other",
      cover: null,
      order: 0,
      published: false,
      defaultIndicators: [],
    },
  ],
  indicators: [
    {
      id: "sahel-ramsar-sites",
      name: "Ramsar sites",
      unit: null,
      description: null,
      category: "sahel-wetlands-ramsar",
      widget: null,
      labels: null,
      order: 0,
    },
  ],
  indicatorData: [
    {
      id: "ramsar-sahel_adminregion_mli",
      indicator: "sahel-ramsar-sites",
      location: "sahel_adminregion_mli",
      data: [],
    },
    { id: "sahel-costs-0", indicator: "sahel-ramsar-sites", location: "sahel_global", data: [] },
  ],
});

const mediaFilenames = new Set(["sahel.avif", "network.avif"]);

describe("validateSeedFiles", () => {
  it("accepts consistent files", () => {
    expect(validateSeedFiles(validFiles(), mediaFilenames)).toEqual([]);
  });

  it("reports duplicate IDs", () => {
    const files = validFiles();
    files.indicators.push({ ...files.indicators[0] });

    expect(validateSeedFiles(files, mediaFilenames)).toEqual([
      "indicators: duplicate ID 'sahel-ramsar-sites'",
    ]);
  });

  it("reports every unresolved reference", () => {
    const files = validFiles();
    files.locations[1].region = "europe";
    files.locations[1].parent = "sahel_nowhere";
    files.categories[0].region = "europe";
    files.categories[0].defaultIndicators.push("sahel-missing");
    files.indicators[0].category = "sahel-missing";
    files.indicatorData[0].indicator = "sahel-missing";
    files.indicatorData[0].location = "sahel_missing";

    expect(validateSeedFiles(files, mediaFilenames)).toEqual(
      expect.arrayContaining([
        "location 'sahel_adminregion_mli': unknown region 'europe'",
        "location 'sahel_adminregion_mli': unknown parent 'sahel_nowhere'",
        "category 'sahel-wetlands-ramsar': unknown region 'europe'",
        "category 'sahel-wetlands-ramsar': unknown default indicator 'sahel-missing'",
        "indicator 'sahel-ramsar-sites': unknown category 'sahel-missing'",
        "indicator data 'ramsar-sahel_adminregion_mli': unknown indicator 'sahel-missing'",
        "indicator data 'ramsar-sahel_adminregion_mli': unknown location 'sahel_missing'",
      ]),
    );
  });

  it("rejects a default indicator of another category", () => {
    const files = validFiles();
    files.categories[1].defaultIndicators = ["sahel-ramsar-sites"];

    expect(validateSeedFiles(files, mediaFilenames)).toEqual([
      "category 'other-other': default indicator 'sahel-ramsar-sites' belongs to 'sahel-wetlands-ramsar'",
    ]);
  });

  it("rejects indicator data whose indicator and location are in different regions", () => {
    const files = validFiles();
    files.regions.push({ ...files.regions[0], id: "europe", cover: null });
    files.locations.push({ ...files.locations[0], id: "europe_global", region: "europe" });
    files.indicatorData[1].location = "europe_global";
    files.indicatorData[1].id = "sahel-costs-europe_global";

    expect(validateSeedFiles(files, mediaFilenames)).toEqual([
      "indicator data 'sahel-costs-europe_global': indicator region 'sahel' differs from location region 'europe'",
    ]);
  });

  it("requires exactly one global location per published region", () => {
    const files = validFiles();
    files.locations[0].type = "admin_region";

    expect(validateSeedFiles(files, mediaFilenames)).toEqual([
      "region 'sahel': expected one global location, found none",
    ]);

    files.locations[0].type = "global";
    files.locations[1].type = "global";

    expect(validateSeedFiles(files, mediaFilenames)).toEqual([
      "region 'sahel': expected one global location, found sahel_global, sahel_adminregion_mli",
    ]);
  });

  it("rejects locations in an unpublished region", () => {
    const files = validFiles();
    files.locations[1].region = "other";
    files.locations[1].id = "other_adminregion_mli";
    files.indicatorData[0].location = "other_adminregion_mli";
    files.indicatorData[0].id = "ramsar-other_adminregion_mli";

    expect(validateSeedFiles(files, mediaFilenames)).toEqual(
      expect.arrayContaining(["region 'other': unpublished, but has 1 locations"]),
    );
  });

  it("requires the IDs to carry their region", () => {
    const files = validFiles();
    files.locations[1].id = "adminregion_mli";
    files.indicatorData[0].location = "adminregion_mli";
    files.indicatorData[0].id = "ramsar-adminregion_mli";
    files.categories[0].id = "wetlands-ramsar";
    files.indicators[0].category = "wetlands-ramsar";
    files.indicators[0].id = "ramsar-sites";
    files.categories[0].defaultIndicators = ["ramsar-sites"];
    files.indicatorData[0].indicator = "ramsar-sites";
    files.indicatorData[1].indicator = "ramsar-sites";
    files.indicatorData[1].id = "costs-0";

    expect(validateSeedFiles(files, mediaFilenames)).toEqual([
      "location 'adminregion_mli': ID must start with 'sahel_'",
      "category 'wetlands-ramsar': ID must start with 'sahel-'",
      "indicator 'ramsar-sites': ID must start with 'sahel-'",
      "indicator data 'costs-0': ID must end with '-sahel_global' or start with 'sahel-'",
    ]);
  });

  it("rejects two locations with the same region, type and code", () => {
    const files = validFiles();
    files.locations.push({ ...files.locations[1], id: "sahel_adminregion_mali" });
    files.indicatorData.push({
      ...files.indicatorData[0],
      id: "ramsar-sahel_adminregion_mali",
      location: "sahel_adminregion_mali",
    });

    expect(validateSeedFiles(files, mediaFilenames)).toEqual([
      "locations: several locations with region/type/code 'sahel/admin_region/MLI'",
    ]);
  });

  it("rejects a parent chain that loops", () => {
    const files = validFiles();
    files.locations[0].parent = "sahel_adminregion_mli";

    expect(validateSeedFiles(files, mediaFilenames)).toEqual([
      "location 'sahel_global': its parents loop through 'sahel_global'",
      "location 'sahel_adminregion_mli': its parents loop through 'sahel_adminregion_mli'",
    ]);
  });

  it("rejects two categories with the same name in a region", () => {
    const files = validFiles();
    files.categories.push({ ...files.categories[0], id: "sahel-network", defaultIndicators: [] });

    expect(validateSeedFiles(files, mediaFilenames)).toEqual([
      "region 'sahel': several categories named 'Network'",
    ]);
  });

  it("requires the covers to be uploaded", () => {
    const files = validFiles();
    files.regions[0].cover = "missing.avif";

    expect(validateSeedFiles(files, mediaFilenames)).toEqual([
      "region 'sahel': cover 'missing.avif' is not in the media collection",
    ]);
  });
});
