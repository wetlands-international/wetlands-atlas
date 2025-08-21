import { atom } from "jotai";
import { createSerializer, useQueryState } from "nuqs";

import {
  basemapParser,
  bboxParser,
  indicatorsParser,
  insightParser,
  layersParser,
  layersSettingsParser,
  locationParser,
} from "./parsers";

// MAP
export const useSyncBbox = () => {
  return useQueryState("bbox", bboxParser);
};
export const tmpBboxAtom = atom<number[]>();

export const useSyncBasemap = () => {
  return useQueryState("basemap", basemapParser);
};

// INSIGHTS
export const useSyncInsight = () => {
  return useQueryState("insight", insightParser);
};

// LOCATIONS
export const useSyncLocation = () => {
  return useQueryState("location", locationParser);
};

export const locationsAtom = atom<{
  search?: string;
  enabled: boolean;
}>({
  search: "",
  enabled: false,
});

// INDICATORS
export const useSyncIndicators = () => {
  return useQueryState("indicators", indicatorsParser);
};

// LAYERS
export const useSyncLayers = () => {
  return useQueryState("layers", layersParser);
};

export const useSyncLayersSettings = () => {
  return useQueryState("layers-settings", layersSettingsParser);
};

// STORIES
export const storiesAtom = atom<{
  search?: string;
  filters?: {
    highlighted?: boolean;
    insight: string[];
    location: string[];
  };
  enabled: boolean;
}>({
  search: "",
  enabled: false,
});

// SERIALIZERS
export const persistedSearchParamsSerializer = createSerializer({
  bbox: bboxParser,
  basemap: basemapParser,
  insight: insightParser,
  location: locationParser,
});

export const useGetSearchParams = () => {
  const [bbox] = useSyncBbox();
  const [basemap] = useSyncBasemap();
  const [insight] = useSyncInsight();
  const [location] = useSyncLocation();

  return persistedSearchParamsSerializer({
    bbox,
    basemap,
    insight,
    location,
  });
};
