import { useEffect, useMemo, useRef } from "react";

import { useAtomValue } from "jotai";
import { LngLatBoundsLike, useMap } from "react-map-gl/mapbox";

import { stepAtom } from "@/app/(frontend)/[locale]/(landscapes)/landscapes/[id]/store";

import { Landscape } from "@/payload-types";

const MIN_DURATION = 1000;
const MAX_DURATION = 3000;

const getBboxCenter = (bbox: LngLatBoundsLike): [number, number] => {
  const b = bbox as [number, number, number, number];
  return [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2];
};

const getDistance = (a: [number, number], b: [number, number]): number => {
  const dLng = b[0] - a[0];
  const dLat = b[1] - a[1];
  return Math.sqrt(dLng * dLng + dLat * dLat);
};

const getDuration = (prevBbox: LngLatBoundsLike | null, nextBbox: LngLatBoundsLike): number => {
  if (!prevBbox) return MIN_DURATION;

  const distance = getDistance(getBboxCenter(prevBbox), getBboxCenter(nextBbox));

  // Scale: ~0 degrees → MIN_DURATION, ~180 degrees (max possible) → MAX_DURATION
  const maxDistance = 180;
  const t = Math.min(distance / maxDistance, 1);
  return Math.round(MIN_DURATION + t * (MAX_DURATION - MIN_DURATION));
};

export const LandscapeFitBounds = (props: Landscape) => {
  const { current } = useMap();

  const { steps } = props;

  const step = useAtomValue(stepAtom);

  const prevBboxRef = useRef<LngLatBoundsLike | null>(null);

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
      const duration = getDuration(prevBboxRef.current, mapData.bbox);
      prevBboxRef.current = mapData.bbox;

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
          duration,
        });
      }
    }
  }, [current, step, mapData]);

  return null;
};
