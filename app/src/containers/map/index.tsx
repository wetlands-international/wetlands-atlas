"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useAtom } from "jotai";
import Map, { LngLatBoundsLike, MapProps, useMap } from "react-map-gl/mapbox";
import { useDebounceCallback } from "usehooks-ts";

import {
  tmpBboxAtom,
  useSyncBasemap,
  useSyncBbox,
  useSyncLayers,
  useSyncLayersSettings,
} from "@/app/(frontend)/[locale]/(app)/store";

import { Layers } from "@/containers/layers";
import LandscapeMarker from "@/containers/map/landscape-marker";
import { LayerManager } from "@/containers/map/layer-manager";

import Controls from "@/components/map/controls";
import LayersControl from "@/components/map/controls/layers";
import SettingsControl from "@/components/map/controls/settings";
import { BasemapControl, BASEMAPS } from "@/components/map/controls/settings/basemap";
import ZoomControl from "@/components/map/controls/zoom";

import { env } from "@/env";
import { Landscape } from "@/payload-types";

type MapContainerProps = {
  landscapes: Landscape[];
} & MapProps;

export const MapContainer = ({ landscapes, ...props }: MapContainerProps) => {
  const [loaded, setLoaded] = useState(false);
  const [bbox, setBbox] = useSyncBbox();
  const [basemap, setBasemap] = useSyncBasemap();
  const [tmpBbox, setTmpBbox] = useAtom(tmpBboxAtom);
  const [layers] = useSyncLayers();
  const [layersSettings, setLayersSettings] = useSyncLayersSettings();

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

  // Sync layers settings with layers
  useMemo(() => {
    if (!layers?.length && !layersSettings) return;

    if (!layers?.length && layersSettings) {
      setTimeout(() => {
        setLayersSettings(null);
      }, 0);
      return;
    }

    const lSettingsKeys = Object.keys(layersSettings || {});

    lSettingsKeys.forEach((key) => {
      if (layers.includes(key)) return;

      setTimeout(() => {
        setLayersSettings((prev) => {
          const current = { ...prev };
          delete current[key];
          return current;
        });
      }, 0);
    });
  }, [layers, layersSettings, setLayersSettings]);

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
        {landscapes.map((s) => (
          <LandscapeMarker
            key={`landscape-marker-${s.id}`}
            name={s.name}
            location={s.location}
            href={`/landscapes/${s.id}`}
            media={s.cover && typeof s.cover === "object" ? s.cover : undefined}
          />
        ))}

        {loaded && <LayerManager layers={layers} layersSettings={layersSettings} />}

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
