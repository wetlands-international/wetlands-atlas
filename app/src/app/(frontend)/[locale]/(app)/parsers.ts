import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsFloat,
  parseAsJson,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs";
import { z } from "zod";

import { BASEMAPS } from "@/components/map/controls/settings/basemap";

const layerSettingsSchema = z.object({});

export const bboxParser = parseAsArrayOf(parseAsFloat, ",");

export const basemapParser = parseAsStringLiteral(
  Object.values(BASEMAPS).map((b) => b.id),
).withDefault("default");

export const indicatorsParser = parseAsArrayOf(parseAsString);

export const layersParser = parseAsArrayOf(parseAsString).withDefault([]);
export type LayersSettings<T> = Record<string, Record<string, T>>;

export const createLayersSettingsParser = <T>() =>
  parseAsJson<LayersSettings<T>>(layerSettingsSchema.parse);

export const layersSettingsParser = createLayersSettingsParser<unknown>();

export const landscapeLayerParser = parseAsBoolean.withDefault(true);

export const regionParser = parseAsString;
export const locationParser = parseAsString;
export const insightParser = parseAsString;
