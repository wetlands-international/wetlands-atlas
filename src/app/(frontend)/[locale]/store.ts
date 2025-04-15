import { useQueryState } from "nuqs";
import { bboxParser } from "./parsers";
import { atom } from "jotai";

// MAP
export const useSyncBbox = () => {
  return useQueryState("bbox", bboxParser);
};

export const tmpBboxAtom = atom<number[]>();
