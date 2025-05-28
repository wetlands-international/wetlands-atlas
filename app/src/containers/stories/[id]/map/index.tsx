"use client";

import { useCallback, useEffect } from "react";

import { useAtom } from "jotai";
import Map, { LngLatBoundsLike, MapProps, useMap } from "react-map-gl/mapbox";
import { useDebounceCallback } from "usehooks-ts";

import { tmpBboxAtom, useSyncBbox } from "@/app/(frontend)/[locale]/(app)/store";

import { env } from "@/env";

export const StoryMapContainer = (props: MapProps) => {
  const [bbox] = useSyncBbox();
  const [tmpBbox, setTmpBbox] = useAtom(tmpBboxAtom);

  const { storyMap } = useMap();

  const handleMove = () => {
    if (storyMap) {
      setTmpBbox(undefined);
    }
  };
  const handleMovedDebounced = useDebounceCallback(handleMove, 500);

  const handleFitBounds = useCallback(() => {
    if (tmpBbox && storyMap) {
      storyMap.fitBounds(tmpBbox as LngLatBoundsLike, {
        padding: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      });
    }
  }, [storyMap, tmpBbox]);

  useEffect(() => {
    if (tmpBbox) {
      handleFitBounds();
    }
  }, [tmpBbox, handleFitBounds]);

  return (
    <div className="relative flex grow flex-col overflow-hidden bg-[#326E82]">
      <Map
        id="storyMap"
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          bounds: bbox as LngLatBoundsLike,
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
        onMove={handleMovedDebounced}
        interactive={false}
        scrollZoom={false}
        doubleClickZoom={false}
        dragPan={false}
        dragRotate={false}
        touchPitch={false}
        touchZoomRotate={false}
        {...props}
      ></Map>
    </div>
  );
};
