import { describe, expect, it } from "vitest";

import {
  isRegionId,
  LEGACY_REGION_ID,
  toRegionId,
  toRegionIdList,
  toRegionIndicatorDataId,
} from "./region-ids";

describe("region-ids", () => {
  it("has sahel as the legacy region", () => {
    expect(LEGACY_REGION_ID).toBe("sahel");
  });

  describe("toRegionId", () => {
    it("prefixes slugs with a dash", () => {
      expect(toRegionId("category", "climate-mitigation-potential")).toBe(
        "sahel-climate-mitigation-potential",
      );
      expect(toRegionId("indicator", "wetlands-mitigation-potential")).toBe(
        "sahel-wetlands-mitigation-potential",
      );
      expect(toRegionId("layer", "mitigation-potential")).toBe("sahel-mitigation-potential");
    });

    it("prefixes location IDs with an underscore", () => {
      expect(toRegionId("location", "adminregion_ben")).toBe("sahel_adminregion_ben");
      expect(toRegionId("location", "hydrobasin_niger_basin")).toBe("sahel_hydrobasin_niger_basin");
      expect(toRegionId("location", "wdpa_1243")).toBe("sahel_wdpa_1243");
    });

    it("renames the global location", () => {
      expect(toRegionId("location", "global_sahel")).toBe("sahel_global");
    });

    it("returns an already prefixed ID unchanged", () => {
      expect(toRegionId("category", "sahel-climate-mitigation-potential")).toBe(
        "sahel-climate-mitigation-potential",
      );
      expect(toRegionId("location", "sahel_global")).toBe("sahel_global");
      expect(toRegionId("location", "sahel_adminregion_ben")).toBe("sahel_adminregion_ben");
    });
  });

  describe("isRegionId", () => {
    it("checks the separator of the kind", () => {
      expect(isRegionId("category", "sahel-climate-mitigation-potential")).toBe(true);
      expect(isRegionId("category", "climate-mitigation-potential")).toBe(false);
      expect(isRegionId("location", "sahel_global")).toBe(true);
      expect(isRegionId("location", "global_sahel")).toBe(false);
      // A location named like a slug would still be a legacy ID
      expect(isRegionId("location", "sahel-foo")).toBe(false);
    });
  });

  describe("toRegionIndicatorDataId", () => {
    it("maps the location part of the ID", () => {
      expect(toRegionIndicatorDataId("mitigation-adminregion_ben", "adminregion_ben")).toBe(
        "mitigation-sahel_adminregion_ben",
      );
      expect(toRegionIndicatorDataId("wetland-ramsar-global_sahel", "global_sahel")).toBe(
        "wetland-ramsar-sahel_global",
      );
    });

    it("prefixes the IDs without a location part", () => {
      expect(toRegionIndicatorDataId("costs-0", "global_sahel")).toBe("sahel-costs-0");
      expect(toRegionIndicatorDataId("roi-ben", "adminregion_ben")).toBe("sahel-roi-ben");
    });

    it("returns an already migrated ID unchanged", () => {
      expect(toRegionIndicatorDataId("sahel-costs-0", "sahel_global")).toBe("sahel-costs-0");
      expect(
        toRegionIndicatorDataId("mitigation-sahel_adminregion_ben", "sahel_adminregion_ben"),
      ).toBe("mitigation-sahel_adminregion_ben");
    });
  });

  describe("toRegionIdList", () => {
    it("maps every ID of a comma-separated URL param", () => {
      expect(
        toRegionIdList(
          "indicator",
          "wetlands-mitigation-potential,wetlands-simplified-classification",
        ),
      ).toBe("sahel-wetlands-mitigation-potential,sahel-wetlands-simplified-classification");
      expect(toRegionIdList("layer", "")).toBe("");
    });
  });
});
