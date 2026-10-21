export interface RegionScopedParams {
  region: string | null;
  insight: string | null;
  indicators: string[] | null;
  location: string | null;
  layers: string[];
}

/**
 * The params to remove (`null`), except `layers`, which is replaced by the layers to keep. An empty list removes
 * the param, as it's the parser's default value.
 */
export type InvalidParams = Partial<Record<Exclude<keyof RegionScopedParams, "layers">, null>> & {
  layers?: string[];
};

/**
 * Returns the params to remove from the URL because they don't exist or don't belong to the region:
 * - without a known region, every region-scoped param is removed (region selection screen)
 * - an insight that isn't one of the region's categories is removed, with its indicators
 * - inside a region, the contextual layers of other regions are removed. The other layers (indicator layers,
 *   unknown IDs) are kept, as they can't be told apart without a lookup.
 *
 * `categoryIds` is `undefined` while the region's categories are loading, in which case the insight is kept.
 */
export const getInvalidParams = (
  params: RegionScopedParams,
  {
    regionIds,
    categoryIds,
    contextualLayers,
  }: {
    regionIds: string[];
    categoryIds: string[] | undefined;
    contextualLayers: { id: string; region: string | null }[];
  },
): InvalidParams => {
  const invalidParams: InvalidParams = {};

  const isRegionValid = params.region !== null && regionIds.includes(params.region);
  const isInsightValid =
    isRegionValid &&
    params.insight !== null &&
    (categoryIds === undefined || categoryIds.includes(params.insight));

  if (params.region !== null && !isRegionValid) invalidParams.region = null;
  if (params.location !== null && !isRegionValid) invalidParams.location = null;
  if (params.insight !== null && !isInsightValid) invalidParams.insight = null;
  if (params.indicators !== null && !isInsightValid) invalidParams.indicators = null;

  if (isRegionValid) {
    const otherRegionsLayerIds = new Set(
      contextualLayers.filter(({ region }) => region !== params.region).map(({ id }) => id),
    );
    const layers = params.layers.filter((id) => !otherRegionsLayerIds.has(id));

    if (layers.length !== params.layers.length) invalidParams.layers = layers;
  }

  return invalidParams;
};
