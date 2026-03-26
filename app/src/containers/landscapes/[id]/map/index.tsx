"use client";

import { useMemo, useState } from "react";

import { useAtomValue } from "jotai";
import Map, { LngLatBoundsLike, Source } from "react-map-gl/mapbox";

import { stepAtom } from "@/app/(frontend)/[locale]/(landscapes)/landscapes/[id]/store";

import { LandscapeFitBounds } from "@/containers/landscapes/[id]/map/fit-bounds";
import { LandscapesLegend } from "@/containers/landscapes/[id]/map/legend";
import { StepDots } from "@/containers/landscapes/[id]/step-dots";

import { BASEMAPS } from "@/components/map/controls/settings/basemap";
import { LayerManager } from "@/components/map/layer-manager";

import { env } from "@/env";
import { Landscape } from "@/payload-types";

export const LandscapeMapContainer = (props: Landscape) => {
  const { steps } = props;
  const [loaded, setLoaded] = useState(false);
  const step = useAtomValue(stepAtom);

  const LAYERS = useMemo(() => {
    const s = steps?.[step];
    if (s && "map" in s) {
      return s.map?.layers || [];
    }
    return [];
  }, [step, steps]);

  const BBOX = useMemo(() => {
    const s = steps?.[0];
    if (s && "map" in s) {
      return s.map?.bbox;
    }
    return null;
  }, [steps]);

  const MAP_STYLE = useMemo(() => {
    const s = steps?.[step];

    if (s && "map" in s) {
      const b = s.map?.basemap;
      if (b) {
        return BASEMAPS[b].mapStyle;
      }
      return BASEMAPS["default"].mapStyle;
    }
    return BASEMAPS["default"].mapStyle;
  }, [step, steps]);

  return (
    <div className="relative flex grow flex-col overflow-hidden bg-[#326E82]">
      <Map
        id="landscapeMap"
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
        mapStyle={MAP_STYLE}
        minZoom={2}
        interactive={false}
        scrollZoom={false}
        doubleClickZoom={false}
        dragPan={false}
        dragRotate={false}
        touchPitch={false}
        touchZoomRotate={false}
        onLoad={() => setLoaded(true)}
        terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
      >
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />
        {loaded && <LayerManager layers={LAYERS} layersSettings={{}} />}
        <LandscapeFitBounds {...props} />
      </Map>

      <StepDots steps={steps} />

      <div className="pointer-events-none absolute right-5 bottom-7 z-10">
        <LandscapesLegend layers={LAYERS} />
      </div>
    </div>
  );
};
