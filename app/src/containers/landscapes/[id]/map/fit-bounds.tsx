import { useEffect, useMemo } from "react";

import { useAtomValue } from "jotai";
import { LngLatBoundsLike, useMap } from "react-map-gl/mapbox";

import { stepAtom } from "@/app/(frontend)/[locale]/(landscapes)/landscapes/[id]/store";

import { Landscape } from "@/payload-types";

export const LandscapeFitBounds = (props: Landscape) => {
  const { current } = useMap();

  const { steps } = props;

  const step = useAtomValue(stepAtom);

  const mapData = useMemo(() => {
    const s = steps?.[step];
    if (s && "map" in s) {
      return {
        bbox: s.map?.bbox as LngLatBoundsLike | null,
        bearing: (s.map?.bearing as number) ?? 0,
        pitch: (s.map?.pitch as number) ?? 0,
      };
    }
    return { bbox: null, bearing: 0, pitch: 0 };
  }, [step, steps]);

  useEffect(() => {
    if (current && mapData.bbox) {
      const camera = current.cameraForBounds(mapData.bbox, {
        padding: 50,
        bearing: mapData.bearing,
        pitch: mapData.pitch,
      });

      if (camera) {
        current.flyTo({
          ...camera,
          bearing: mapData.bearing,
          pitch: mapData.pitch,
          duration: 1000,
        });
      }
    }
  }, [current, step, mapData]);

  return null;
};
