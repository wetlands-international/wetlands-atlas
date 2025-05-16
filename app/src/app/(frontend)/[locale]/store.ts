import { atom } from "jotai";
import { useQueryState } from "nuqs";

import { bboxParser } from "./parsers";

// MAP
export const useSyncBbox = () => {
  return useQueryState("bbox", bboxParser);
};

export const tmpBboxAtom = atom<number[]>();
