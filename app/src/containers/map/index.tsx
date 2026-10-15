"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

import { useAtom } from "jotai";
import Map, { LngLatBoundsLike, MapProps, useMap } from "react-map-gl/mapbox";
import { useDebounceCallback } from "usehooks-ts";

import {
  tmpBboxAtom,
  useSyncBasemap,
  useSyncBbox,
  useSyncLandscapeLayer,
  useSyncLayers,
  useSyncLayersSettings,
  useSyncRegion,
} from "@/app/(frontend)/[locale]/(app)/store";

import { useGlobalLocation, useGlobalLocations } from "@/hooks/use-global-locations";
import { useLocationId } from "@/hooks/use-location-id";

import { Layers } from "@/containers/layers";
import LandscapeMarkers from "@/containers/map/landscape-markers";

import Controls from "@/components/map/controls";
import LayersControl from "@/components/map/controls/layers";
import SettingsControl from "@/components/map/controls/settings";
import { BasemapControl, BASEMAPS } from "@/components/map/controls/settings/basemap";
import ZoomControl from "@/components/map/controls/zoom";
import { LayerManager } from "@/components/map/layer-manager";
import { LocationLayer } from "@/components/map/layers/location";
import { RegionsLayer } from "@/components/map/layers/regions";

import { env } from "@/env";

export const MapContainer = (props: MapProps) => {
  const [loaded, setLoaded] = useState(false);
  const [bbox, setBbox] = useSyncBbox();
  const [region] = useSyncRegion();
  const [basemap, setBasemap] = useSyncBasemap();
  const [tmpBbox, setTmpBbox] = useAtom(tmpBboxAtom);
  const [layers] = useSyncLayers();
  const [layersSettings, setLayersSettings] = useSyncLayersSettings();
  const location = useLocationId();
  const [landscapeLayer] = useSyncLandscapeLayer();

  const { exploreMap } = useMap();
  const { unionBbox } = useGlobalLocations();
  const globalLocation = useGlobalLocation(region);

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
          bounds: (bbox ?? globalLocation?.bbox ?? unionBbox) as LngLatBoundsLike,
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
        {landscapeLayer && (
          // The markers suspend while a new region's landscapes load, without unmounting the map
          <Suspense>
            <LandscapeMarkers />
          </Suspense>
        )}

        {loaded && (
          <LayerManager layers={layers} layersSettings={layersSettings}>
            {region ? !!location && <LocationLayer location={location} /> : <RegionsLayer />}
          </LayerManager>
        )}

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
