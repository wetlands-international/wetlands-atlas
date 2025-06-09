"use client";

import { useCallback, useEffect, useMemo } from "react";

import { useAtom } from "jotai";
import Map, { LngLatBoundsLike, MapProps, useMap } from "react-map-gl/mapbox";
import { useDebounceCallback } from "usehooks-ts";

import { tmpBboxAtom, useSyncBasemap, useSyncBbox } from "@/app/(frontend)/[locale]/(app)/store";

import Controls from "@/components/map/controls";
import LayersControl from "@/components/map/controls/layers";
import SettingsControl from "@/components/map/controls/settings";
import { BasemapControl, BASEMAPS } from "@/components/map/controls/settings/basemap";
import ZoomControl from "@/components/map/controls/zoom";

import { env } from "@/env";

export const MapContainer = (props: MapProps) => {
  const [bbox, setBbox] = useSyncBbox();
  const [basemap, setBasemap] = useSyncBasemap();
  const [tmpBbox, setTmpBbox] = useAtom(tmpBboxAtom);

  const { exploreMap } = useMap();

  const MAP_STYLE = useMemo(() => {
    return BASEMAPS[basemap].mapStyle;
  }, [basemap]);

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
    <div className="relative flex grow flex-col overflow-hidden bg-[#326E82]">
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
        mapStyle={MAP_STYLE}
        minZoom={2}
        onMove={handleMovedDebounced}
        {...props}
      >
        <Controls>
          <ZoomControl />
          <LayersControl>
            <div className="flex flex-col space-y-0.5">
              <span>Layers</span>
            </div>
          </LayersControl>
          <SettingsControl>
            <BasemapControl basemap={basemap} onBasemapChange={setBasemap} />
          </SettingsControl>
        </Controls>
      </Map>
    </div>
  );
};
