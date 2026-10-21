import { describe, it, expect } from "vitest";

import { getInvalidParams, RegionScopedParams } from "./invalid-params";

const EMPTY_PARAMS: RegionScopedParams = {
  region: null,
  insight: null,
  indicators: null,
  location: null,
};

const DATA = {
  regionIds: ["sahel", "europe"],
  categoryIds: ["sahel-climate-mitigation-potential"],
};

describe("getInvalidParams", () => {
  it("removes nothing on the region selection screen", () => {
    expect(getInvalidParams(EMPTY_PARAMS, DATA)).toEqual({});
  });

  it("removes nothing when every param is valid", () => {
    const params = {
      region: "sahel",
      insight: "sahel-climate-mitigation-potential",
      indicators: ["sahel-wetlands-mitigation-potential"],
      location: "sahel_adminregion_ben",
    };

    expect(getInvalidParams(params, DATA)).toEqual({});
  });

  it("removes the region-scoped params of a legacy link without region", () => {
    const params = {
      region: null,
      insight: "climate-mitigation-potential",
      indicators: ["wetlands-mitigation-potential"],
      location: "adminregion_ben",
    };

    expect(getInvalidParams(params, DATA)).toEqual({
      insight: null,
      indicators: null,
      location: null,
    });
  });

  it("removes the region and its params when the region is unknown", () => {
    const params = {
      region: "unknown",
      insight: "sahel-climate-mitigation-potential",
      indicators: ["sahel-wetlands-mitigation-potential"],
      location: "sahel_adminregion_ben",
    };

    expect(getInvalidParams(params, DATA)).toEqual({
      region: null,
      insight: null,
      indicators: null,
      location: null,
    });
  });

  it("removes the insight and its indicators when the insight isn't a category of the region", () => {
    const params = {
      region: "sahel",
      insight: "europe-climate-mitigation-potential",
      indicators: ["europe-wetlands-mitigation-potential"],
      location: "sahel_adminregion_ben",
    };

    expect(getInvalidParams(params, DATA)).toEqual({
      insight: null,
      indicators: null,
    });
  });

  it("removes the indicators when there is no insight", () => {
    const params = {
      ...EMPTY_PARAMS,
      region: "sahel",
      indicators: ["sahel-wetlands-mitigation-potential"],
    };

    expect(getInvalidParams(params, DATA)).toEqual({ indicators: null });
  });

  it("keeps the insight while the region's categories are loading", () => {
    const params = {
      ...EMPTY_PARAMS,
      region: "sahel",
      insight: "sahel-climate-mitigation-potential",
      indicators: ["sahel-wetlands-mitigation-potential"],
    };

    expect(getInvalidParams(params, { ...DATA, categoryIds: undefined })).toEqual({});
  });
});
