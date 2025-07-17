import { parseAsArrayOf, parseAsFloat, parseAsString, parseAsStringLiteral } from "nuqs";

import { BASEMAPS } from "@/components/map/controls/settings/basemap";

export const bboxParser = parseAsArrayOf(parseAsFloat, ",").withDefault([
  -11.57, -10.84, 48.06, 29.61,
]);

export const basemapParser = parseAsStringLiteral(
  Object.values(BASEMAPS).map((b) => b.id),
).withDefault("default");

export const indicatorsParser = parseAsArrayOf(parseAsString);

export const locationParser = parseAsString.withDefault("Worldwide");
export const insightParser = parseAsString;
