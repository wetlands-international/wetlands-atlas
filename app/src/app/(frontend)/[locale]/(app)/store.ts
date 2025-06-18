import { atom } from "jotai";
import { useQueryState } from "nuqs";

import { basemapParser, bboxParser, indicatorsParser, locationParser } from "./parsers";

// MAP
export const useSyncBbox = () => {
  return useQueryState("bbox", bboxParser);
};
export const tmpBboxAtom = atom<number[]>();

export const useSyncBasemap = () => {
  return useQueryState("basemap", basemapParser);
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
