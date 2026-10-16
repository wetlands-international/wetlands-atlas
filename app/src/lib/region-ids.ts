/**
 * Mapping from the IDs used before the region model (WM-94) to the region-prefixed IDs (convention in WM-100).
 *
 * The mapping is mechanical, so it is shared by the migration of the existing data (WM-98) and the redirect of
 * legacy map links (WM-113):
 *
 * | Record          | Legacy                       | Region-prefixed                     |
 * | --------------- | ---------------------------- | ----------------------------------- |
 * | Category        | `climate-mitigation-potential` | `sahel-climate-mitigation-potential` |
 * | Indicator       | `wetlands-mitigation-potential` | `sahel-wetlands-mitigation-potential` |
 * | Layer           | `mitigation-potential`       | `sahel-mitigation-potential`        |
 * | Location        | `adminregion_ben`            | `sahel_adminregion_ben`             |
 * | Global location | `global_sahel`               | `sahel_global`                      |
 * | Indicator data  | `mitigation-adminregion_ben` | `mitigation-sahel_adminregion_ben`  |
 * | Indicator data  | `costs-0` (no location)      | `sahel-costs-0`                     |
 *
 * Every function returns an already prefixed ID unchanged, so they can be applied twice.
 */

/** The region every record created before the region model belongs to */
export const LEGACY_REGION_ID = "sahel";

const LEGACY_GLOBAL_LOCATION_ID = `global_${LEGACY_REGION_ID}`;

/** Separator of the region prefix: `-` for slugs, `_` for location IDs (`{region}_{type}_{code}`) */
const SEPARATOR = { category: "-", indicator: "-", layer: "-", location: "_" } as const;

export type RegionIdKind = keyof typeof SEPARATOR;

/** Whether `id` already carries the prefix of the legacy region for this kind of record */
export const isRegionId = (kind: RegionIdKind, id: string) =>
  id.startsWith(`${LEGACY_REGION_ID}${SEPARATOR[kind]}`);

/** Region-prefixed ID of a legacy category, indicator, layer or location ID */
export const toRegionId = (kind: RegionIdKind, legacyId: string) => {
  if (isRegionId(kind, legacyId)) {
    return legacyId;
  }

  if (kind === "location" && legacyId === LEGACY_GLOBAL_LOCATION_ID) {
    return `${LEGACY_REGION_ID}_global`;
  }

  return `${LEGACY_REGION_ID}${SEPARATOR[kind]}${legacyId}`;
};

/**
 * Region-prefixed ID of a legacy indicator-data row. The IDs are `{prefix}-{location id}`, so the location part is
 * mapped; the rows without a location in their ID (`costs-0`, `roi-ben`) get the region prefix instead.
 */
export const toRegionIndicatorDataId = (legacyId: string, legacyLocationId: string) => {
  if (isRegionId("indicator", legacyId) || isRegionId("location", legacyLocationId)) {
    return legacyId;
  }

  const suffix = `-${legacyLocationId}`;
  if (legacyId.endsWith(suffix)) {
    return `${legacyId.slice(0, -suffix.length)}-${toRegionId("location", legacyLocationId)}`;
  }

  return `${LEGACY_REGION_ID}-${legacyId}`;
};

/** Maps a comma-separated list of legacy IDs, as found in the `indicators` and `layers` URL params */
export const toRegionIdList = (kind: RegionIdKind, legacyIds: string) =>
  legacyIds
    .split(",")
    .filter(Boolean)
    .map((id) => toRegionId(kind, id))
    .join(",");
