"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useAtom } from "jotai";
import Map, { LngLatBoundsLike, MapProps, useMap } from "react-map-gl/mapbox";
import { useDebounceCallback } from "usehooks-ts";

import { tmpBboxAtom, useSyncBasemap, useSyncBbox } from "@/app/(frontend)/[locale]/(app)/store";

import { Layers } from "@/containers/layers";
import { LayerManager } from "@/containers/map/layer-manager";
import StoryMarker from "@/containers/map/story-marker";

import Controls from "@/components/map/controls";
import LayersControl from "@/components/map/controls/layers";
import SettingsControl from "@/components/map/controls/settings";
import { BasemapControl, BASEMAPS } from "@/components/map/controls/settings/basemap";
import ZoomControl from "@/components/map/controls/zoom";

import { env } from "@/env";
import { Story } from "@/payload-types";

type MapContainerProps = {
  stories: Story[];
} & MapProps;

export const MapContainer = ({ stories, ...props }: MapContainerProps) => {
  const [loaded, setLoaded] = useState(false);
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

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (tmpBbox) {
      handleFitBounds();
    }
  }, [tmpBbox, handleFitBounds]);

  return (
    <div className="fixed top-0 left-0 z-0 h-full w-full overflow-hidden bg-[#326E82]">
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
        onLoad={handleLoad}
        {...props}
      >
        {stories.map((s) => (
          <StoryMarker
            key={`story-marker-${s.id}`}
            name={s.name}
            location={s.location}
            href={`/landscapes/${s.id}`}
            media={s.cover && typeof s.cover === "object" ? s.cover : undefined}
          />
        ))}

        {loaded && <LayerManager />}

        <Controls>
          <ZoomControl />
          <LayersControl>
            <Layers />
          </LayersControl>
          <SettingsControl>
            <BasemapControl basemap={basemap} onBasemapChange={setBasemap} />
          </SettingsControl>
        </Controls>
      </Map>
    </div>
  );
};
