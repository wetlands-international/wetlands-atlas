import {
  parseAsArrayOf,
  parseAsFloat,
  parseAsJson,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs";
import { z } from "zod";

import { BASEMAPS } from "@/components/map/controls/settings/basemap";

const layerSettingsSchema = z.object({});

export const bboxParser = parseAsArrayOf(parseAsFloat, ",").withDefault([
  -11.57, -10.84, 48.06, 29.61,
]);

export const basemapParser = parseAsStringLiteral(
  Object.values(BASEMAPS).map((b) => b.id),
).withDefault("default");

export const indicatorsParser = parseAsArrayOf(parseAsString);

export const layersParser = parseAsArrayOf(parseAsString).withDefault([]);
export type LayersSettings<T> = Record<string, Record<string, T>>;

export const createLayersSettingsParser = <T>() =>
  parseAsJson<LayersSettings<T>>(layerSettingsSchema.parse);

export const layersSettingsParser = createLayersSettingsParser<unknown>();

export const locationParser = parseAsString;
export const insightParser = parseAsString;
