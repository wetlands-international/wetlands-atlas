export interface RegionScopedParams {
  region: string | null;
  insight: string | null;
  indicators: string[] | null;
  location: string | null;
}

/**
 * Returns the params to remove from the URL because they don't exist or don't belong to the region:
 * - without a known region, every region-scoped param is removed (region selection screen)
 * - an insight that isn't one of the region's categories is removed, with its indicators
 *
 * `categoryIds` is `undefined` while the region's categories are loading, in which case the insight is kept.
 */
export const getInvalidParams = (
  params: RegionScopedParams,
  { regionIds, categoryIds }: { regionIds: string[]; categoryIds: string[] | undefined },
): Partial<Record<keyof RegionScopedParams, null>> => {
  const invalidParams: Partial<Record<keyof RegionScopedParams, null>> = {};

  const isRegionValid = params.region !== null && regionIds.includes(params.region);
  const isInsightValid =
    isRegionValid &&
    params.insight !== null &&
    (categoryIds === undefined || categoryIds.includes(params.insight));

  if (params.region !== null && !isRegionValid) invalidParams.region = null;
  if (params.location !== null && !isRegionValid) invalidParams.location = null;
  if (params.insight !== null && !isInsightValid) invalidParams.insight = null;
  if (params.indicators !== null && !isInsightValid) invalidParams.indicators = null;

  return invalidParams;
};
