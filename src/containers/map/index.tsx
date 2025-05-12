"use client";

import { useCallback, useEffect } from "react";

import { useAtom } from "jotai";
import Map, { LngLatBoundsLike, useMap } from "react-map-gl/mapbox";
import { useDebounceCallback } from "usehooks-ts";

import { tmpBboxAtom, useSyncBbox } from "@/app/(frontend)/[locale]/store";

import Controls from "@/components/map/controls";
import SettingsControl from "@/components/map/controls/settings";
import ZoomControl from "@/components/map/controls/zoom";

import { env } from "@/env";

export const MapContainer = () => {
  const [bbox, setBbox] = useSyncBbox();
  const [tmpBbox, setTmpBbox] = useAtom(tmpBboxAtom);

  const { exploreMap } = useMap();

  const handleMove = () => {
    if (exploreMap) {
      const b = exploreMap
        .getBounds()
        ?.toArray()
        ?.flat()
        ?.map((v: number) => {
          return parseFloat(v.toFixed(2));
        });

      if (b) setBbox(b);
      setTmpBbox(undefined);
    }
  };
  const handleMovedDebounced = useDebounceCallback(handleMove, 500);

  const handleFitBounds = useCallback(() => {
    if (tmpBbox && exploreMap) {
      exploreMap.fitBounds(tmpBbox as LngLatBoundsLike, {
        padding: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      });
    }
  }, [exploreMap, tmpBbox]);

  useEffect(() => {
    if (tmpBbox) {
      handleFitBounds();
    }
  }, [tmpBbox, handleFitBounds]);

  return (
    <div className="relative flex grow flex-col overflow-hidden">
      <Map
        id="exploreMap"
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
        mapStyle="mapbox://styles/mapbox/dark-v10"
        minZoom={2}
        onMove={handleMovedDebounced}
      >
        <Controls>
          <SettingsControl>
            <div className="flex flex-col space-y-0.5">
              <span>Basemap</span>
            </div>
          </SettingsControl>
          <ZoomControl />
        </Controls>
      </Map>
    </div>
  );
};
