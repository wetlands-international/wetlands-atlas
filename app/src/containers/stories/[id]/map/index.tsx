"use client";

import { useMemo } from "react";

import { useAtomValue } from "jotai";
import Map, { LngLatBoundsLike } from "react-map-gl/mapbox";

import { stepAtom } from "@/app/(frontend)/[locale]/(stories)/stories/[id]/store";

import { StoryFitBounds } from "@/containers/stories/[id]/map/fit-bounds";

import { env } from "@/env";
import { Story } from "@/payload-types";

export const StoryMapContainer = (props: Story) => {
  const { steps } = props;

  const step = useAtomValue(stepAtom);

  // const LAYERS = useMemo(() => {
  //   const s = steps?.[step];
  //   if (s && "map" in s) {
  //     return s.map?.layers || [];
  //   }
  //   return [];
  // }, [step, steps]);

  const BBOX = useMemo(() => {
    const s = steps?.[step];
    if (s && "map" in s) {
      return s.map?.bbox;
    }
    return null;
  }, [step, steps]);

  return (
    <div className="relative flex grow flex-col overflow-hidden bg-[#326E82]">
      <Map
        id="storyMap"
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          bounds: BBOX as LngLatBoundsLike,
          fitBoundsOptions: {
            padding: {
              top: 50,
              bottom: 50,
              left: 50,
              right: 50,
            },
          },
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/wetlands-vizzuality/cmaoz7mg901l701qoaj2a6v0h"
        minZoom={2}
        interactive={false}
        scrollZoom={false}
        doubleClickZoom={false}
        dragPan={false}
        dragRotate={false}
        touchPitch={false}
        touchZoomRotate={false}
      >
        <StoryFitBounds {...props} />
      </Map>
    </div>
  );
};
