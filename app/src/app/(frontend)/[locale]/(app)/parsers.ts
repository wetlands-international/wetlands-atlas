import { parseAsArrayOf, parseAsFloat, parseAsString, parseAsStringLiteral } from "nuqs";

import { BASEMAPS } from "@/components/map/controls/settings/basemap";

export const bboxParser = parseAsArrayOf(parseAsFloat, ",").withDefault([
  -109.52, -15.27, 87.93, 73.4,
]);

export const basemapParser = parseAsStringLiteral(
  Object.values(BASEMAPS).map((b) => b.id),
).withDefault("default");

export const indicatorsParser = parseAsArrayOf(parseAsString);

export const locationParser = parseAsString.withDefault("Worldwide");
export const insightParser = parseAsString;
