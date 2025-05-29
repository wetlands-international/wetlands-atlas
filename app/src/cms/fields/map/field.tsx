"use client";

import { FieldClientComponent } from "payload";

import { FieldType, useField } from "@payloadcms/ui";

import Map, { LngLatBoundsLike, MapProvider, useMap } from "react-map-gl/mapbox";
import { useDebounceCallback } from "usehooks-ts";

import Controls from "@/components/map/controls";
import SettingsControl from "@/components/map/controls/settings";
import ZoomControl from "@/components/map/controls/zoom";

import { env } from "@/env";
import { Story } from "@/payload-types";

export const MapFieldComponent: FieldClientComponent = () => {
  const fieldProps = useField<NonNullable<Story["steps"]>[number]["map"]>();

  return (
    <MapProvider>
      <MapComponent {...fieldProps} />
    </MapProvider>
  );
};

export const MapComponent = (props: FieldType<NonNullable<Story["steps"]>[number]["map"]>) => {
  const { value, setValue } = props;
  const { stepMap } = useMap();
  const handleMove = () => {
    if (stepMap) {
      const b = stepMap
        .getBounds()
        ?.toArray()
        ?.flat()
        ?.map((v: number) => {
          return parseFloat(v.toFixed(2));
        });

      if (b)
        setValue({
          bbox: b,
        });
    }
  };
  const handleMovedDebounced = useDebounceCallback(handleMove, 500);

  return (
    <div className="relative flex aspect-video grow flex-col overflow-hidden bg-[#326E82]">
      <Map
        id="stepMap"
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          ...(value?.bbox && { bounds: value?.bbox as LngLatBoundsLike }),
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
        scrollZoom={false}
        onMove={handleMovedDebounced}
      >
        <Controls className="absolute top-4 right-4">
          <ZoomControl />
          <SettingsControl>
            <div className="flex flex-col space-y-0.5">
              <span>Basemap</span>
            </div>
          </SettingsControl>
        </Controls>
      </Map>
    </div>
  );
};

export default MapFieldComponent;
