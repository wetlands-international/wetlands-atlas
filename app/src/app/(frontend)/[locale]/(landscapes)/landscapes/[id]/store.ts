import { atom } from "jotai";
import { useQueryState } from "nuqs";

import { stepParser } from "@/app/(frontend)/[locale]/(landscapes)/landscapes/[id]/parsers";

// MAP
export const useSyncStep = () => {
  return useQueryState("step", stepParser);
};

export const stepAtom = atom(0);
