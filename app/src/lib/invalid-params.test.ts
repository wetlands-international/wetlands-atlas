import { describe, it, expect } from "vitest";

import { getInvalidParams, RegionScopedParams } from "./invalid-params";

const EMPTY_PARAMS: RegionScopedParams = {
  region: null,
  insight: null,
  indicators: null,
  location: null,
  layers: [],
};

const DATA = {
  regionIds: ["sahel", "europe"],
  categoryIds: ["sahel-climate-mitigation-potential"],
  contextualLayers: [
    { id: "sahel-protected-areas", region: "sahel" },
    { id: "europe-protected-areas", region: "europe" },
    { id: "europe-hydrobasins", region: "europe" },
  ],
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
      layers: [],
    };

    expect(getInvalidParams(params, DATA)).toEqual({});
  });

  it("removes the region-scoped params of a legacy link without region", () => {
    const params = {
      region: null,
      insight: "climate-mitigation-potential",
      indicators: ["wetlands-mitigation-potential"],
      location: "adminregion_ben",
      layers: [],
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
      layers: [],
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
      layers: [],
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

  it("removes the contextual layers of other regions", () => {
    const params = {
      ...EMPTY_PARAMS,
      region: "sahel",
      layers: ["sahel-protected-areas", "europe-protected-areas", "sahel-mitigation-potential"],
    };

    expect(getInvalidParams(params, DATA)).toEqual({
      layers: ["sahel-protected-areas", "sahel-mitigation-potential"],
    });
  });

  it("keeps no layer when only contextual layers of other regions are active", () => {
    const params = {
      ...EMPTY_PARAMS,
      region: "sahel",
      layers: ["europe-protected-areas", "europe-hydrobasins"],
    };

    expect(getInvalidParams(params, DATA)).toEqual({ layers: [] });
  });

  it("keeps the region's contextual layers, the indicator layers and the unknown layers", () => {
    const params = {
      ...EMPTY_PARAMS,
      region: "sahel",
      layers: ["sahel-protected-areas", "sahel-mitigation-potential", "unknown"],
    };

    expect(getInvalidParams(params, DATA)).toEqual({});
  });

  it("keeps the contextual layers of every region on the region selection screen", () => {
    const params = {
      ...EMPTY_PARAMS,
      layers: ["sahel-protected-areas", "europe-protected-areas"],
    };

    expect(getInvalidParams(params, DATA)).toEqual({});
  });

  it("keeps the contextual layers of every region when the region is unknown", () => {
    const params = {
      ...EMPTY_PARAMS,
      region: "unknown",
      layers: ["sahel-protected-areas", "europe-protected-areas"],
    };

    expect(getInvalidParams(params, DATA)).toEqual({ region: null });
  });
});
