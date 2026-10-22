import { describe, expect, it } from "vitest";

import {
  isRegionId,
  LEGACY_REGION_ID,
  toBaseId,
  toRegionId,
  toRegionIdList,
  toRegionIndicatorDataId,
  toRegionStepMap,
} from "./region-ids";

describe("region-ids", () => {
  it("has sahel as the legacy region", () => {
    expect(LEGACY_REGION_ID).toBe("sahel");
  });

  describe("toRegionId", () => {
    it("prefixes slugs with a dash", () => {
      expect(toRegionId("climate-mitigation-potential", "category")).toBe(
        "sahel-climate-mitigation-potential",
      );
      expect(toRegionId("wetlands-mitigation-potential", "indicator")).toBe(
        "sahel-wetlands-mitigation-potential",
      );
      expect(toRegionId("mitigation-potential", "layer")).toBe("sahel-mitigation-potential");
    });

    it("prefixes location IDs with an underscore", () => {
      expect(toRegionId("adminregion_ben", "location")).toBe("sahel_adminregion_ben");
      expect(toRegionId("hydrobasin_niger_basin", "location")).toBe("sahel_hydrobasin_niger_basin");
      expect(toRegionId("wdpa_1243", "location")).toBe("sahel_wdpa_1243");
    });

    it("renames the global location", () => {
      expect(toRegionId("global_sahel", "location")).toBe("sahel_global");
    });

    it("returns an already prefixed ID unchanged", () => {
      expect(toRegionId("sahel-climate-mitigation-potential", "category")).toBe(
        "sahel-climate-mitigation-potential",
      );
      expect(toRegionId("sahel_global", "location")).toBe("sahel_global");
      expect(toRegionId("sahel_adminregion_ben", "location")).toBe("sahel_adminregion_ben");
    });
  });

  describe("isRegionId", () => {
    it("checks the separator of the kind", () => {
      expect(isRegionId("sahel-climate-mitigation-potential", "category")).toBe(true);
      expect(isRegionId("climate-mitigation-potential", "category")).toBe(false);
      expect(isRegionId("sahel_global", "location")).toBe(true);
      expect(isRegionId("global_sahel", "location")).toBe(false);
      // A location named like a slug would still be a legacy ID
      expect(isRegionId("sahel-foo", "location")).toBe(false);
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

  describe("toBaseId", () => {
    const baseIds = ["wetland-types-get", "ndp-water"] as const;

    it("matches the base ID with or without a region prefix", () => {
      expect(toBaseId("wetland-types-get", baseIds)).toBe("wetland-types-get");
      expect(toBaseId("sahel-wetland-types-get", baseIds)).toBe("wetland-types-get");
      expect(toBaseId("east-africa-ndp-water", baseIds)).toBe("ndp-water");
    });

    it("returns undefined when no base ID matches", () => {
      expect(toBaseId("sahel-peatlands", baseIds)).toBeUndefined();
      expect(toBaseId("sahel-wetland-types-get-2", baseIds)).toBeUndefined();
      expect(toBaseId("sahelndp-water", baseIds)).toBeUndefined();
    });
  });

  describe("toRegionIdList", () => {
    it("maps every ID of a comma-separated URL param", () => {
      expect(
        toRegionIdList(
          "wetlands-mitigation-potential,wetlands-simplified-classification",
          "indicator",
        ),
      ).toBe("sahel-wetlands-mitigation-potential,sahel-wetlands-simplified-classification");
      expect(toRegionIdList("", "layer")).toBe("");
    });
  });

  describe("toRegionStepMap", () => {
    const isLandscapeLayer = (id: string) => id.endsWith("-landscape-boundary");
    const map = {
      bbox: [38.54, 7.47, 39.26, 8.06],
      layers: ["ziway-shalla-landscape-boundary", "wetlands-layer"],
      basemap: "satellite",
    };

    it("prefixes the indicator and contextual layers and keeps the landscape layers", () => {
      expect(toRegionStepMap(map, isLandscapeLayer)).toEqual({
        ...map,
        layers: ["ziway-shalla-landscape-boundary", "sahel-wetlands-layer"],
      });
    });

    it("returns a JSON string when the map was stored as one", () => {
      const result = toRegionStepMap(JSON.stringify(map), isLandscapeLayer);

      expect(typeof result).toBe("string");
      expect(JSON.parse(result as string)).toEqual({
        ...map,
        layers: ["ziway-shalla-landscape-boundary", "sahel-wetlands-layer"],
      });
    });

    it("returns undefined when nothing changes", () => {
      const migrated = {
        ...map,
        layers: ["ziway-shalla-landscape-boundary", "sahel-wetlands-layer"],
      };

      expect(toRegionStepMap(migrated, isLandscapeLayer)).toBeUndefined();
      expect(toRegionStepMap(JSON.stringify(migrated), isLandscapeLayer)).toBeUndefined();
      expect(toRegionStepMap({ ...map, layers: [] }, isLandscapeLayer)).toBeUndefined();
      expect(toRegionStepMap({ bbox: map.bbox }, isLandscapeLayer)).toBeUndefined();
      expect(toRegionStepMap(null, isLandscapeLayer)).toBeUndefined();
    });
  });
});
