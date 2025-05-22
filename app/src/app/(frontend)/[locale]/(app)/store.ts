import { atom } from "jotai";
import { useQueryState } from "nuqs";

import { bboxParser, locationParser } from "./parsers";

// MAP
export const useSyncBbox = () => {
  return useQueryState("bbox", bboxParser);
};

export const tmpBboxAtom = atom<number[]>();

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
