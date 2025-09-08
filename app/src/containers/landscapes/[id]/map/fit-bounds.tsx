import { useEffect, useMemo } from "react";

import { useAtomValue } from "jotai";
import { LngLatBoundsLike, useMap } from "react-map-gl/mapbox";

import { stepAtom } from "@/app/(frontend)/[locale]/(landscapes)/landscapes/[id]/store";

import { Landscape } from "@/payload-types";

export const LandscapeFitBounds = (props: Landscape) => {
  const { current } = useMap();

  const { steps } = props;

  const step = useAtomValue(stepAtom);

  const BBOX = useMemo(() => {
    const s = steps?.[step];
    if (s && "map" in s) {
      return s.map?.bbox;
    }
    return null;
  }, [step, steps]);

  useEffect(() => {
    if (current && BBOX) {
      current.fitBounds(BBOX as LngLatBoundsLike, {
        padding: 50,
        duration: 1000,
      });
    }
  }, [current, step, BBOX]);

  return null;
};
