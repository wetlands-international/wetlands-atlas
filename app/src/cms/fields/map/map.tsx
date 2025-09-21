"use client";

import { useMemo, useState } from "react";

import { useField, useCollapsible } from "@payloadcms/ui";

import Map, {
  Layer,
  LngLatBoundsLike,
  MapProvider,
  useMap,
  Source,
  SourceProps,
  LayerProps,
} from "react-map-gl/mapbox";
import { useDebounceCallback, useDebounceValue } from "usehooks-ts";

import { parseConfig } from "@/lib/json-converter";

import Controls from "@/components/map/controls";
import SettingsControl from "@/components/map/controls/settings";
import { BasemapControl, BASEMAPS } from "@/components/map/controls/settings/basemap";
import ZoomControl from "@/components/map/controls/zoom";

import { env } from "@/env";
import { Landscape, Layer as iLayer } from "@/payload-types";

export const MapfieldMap = ({ layers }: { layers: iLayer[] }) => {
  return (
    <MapProvider>
      <MapfieldMapInner layers={layers} />
    </MapProvider>
  );
};

export const MapfieldMapInner = ({ layers }: { layers: iLayer[] }) => {
  const [loaded, setLoaded] = useState(false);
  const { value, setValue } = useField<NonNullable<Landscape["steps"]>[number]["map"]>();
  const { isCollapsed, isWithinCollapsible } = useCollapsible();
  // We use a debounced value to render the map only after the collapsible state has stabilized
  const [collapsed] = useDebounceValue(isCollapsed, 500);

  const { stepMap } = useMap();

  const MAP_STYLE = useMemo(() => {
    return BASEMAPS[value?.basemap ?? "default"].mapStyle;
  }, [value?.basemap]);

  const baseLayer = useMemo(() => {
    if (stepMap && stepMap.isStyleLoaded()) {
      const layers = stepMap!.getStyle()!.layers;
      // Find the custom layer to be able to sort the layers
      const customLayer = layers?.find((l) => l.id.includes("custom-layer"));
      // Find the first label layer to be able to sort the layers if there is no custom layer
      const labelLayer = layers?.find((l) => l.id.includes("label"));
      return customLayer ? customLayer.id : labelLayer?.id;
    }
  }, [stepMap]);

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
          ...value,
          bbox: b,
        });
    }
  };
  const handleMovedDebounced = useDebounceCallback(handleMove, 500);
  const LAYERS = useMemo(() => {
    if (!value?.layers) return [];
    return value.layers.map((l) => l).toReversed();
  }, [value?.layers]);

  if (isWithinCollapsible && collapsed) return null;

  return (
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
      mapStyle={MAP_STYLE}
      minZoom={2}
      scrollZoom={false}
      onMove={handleMovedDebounced}
      onLoad={() => setLoaded(true)}
    >
      {loaded && (
        <>
          {/*
          Generate all transparent backgrounds to be able to sort by layers without an error
          - https://github.com/visgl/react-map-gl/issues/939#issuecomment-625290200
        */}
          {LAYERS.map((l, i, arr) => {
            const beforeId = i === 0 ? baseLayer : `${arr[i - 1]}-layer`;

            return (
              <Layer
                id={`${l}-layer`}
                key={l}
                type="background"
                layout={{ visibility: "none" }}
                beforeId={beforeId}
              />
            );
          })}

          {LAYERS.toReversed().map((l, i) => {
            const currentLayer = layers.find((layer) => layer.id === l) as iLayer;
            const c = parseConfig<iLayer["config"]>({
              config: currentLayer.config,
              params_config: currentLayer.params_config,
              settings: {},
            });
            const STYLES = c?.styles as LayerProps[];
            const beforeId = i === 0 ? baseLayer : `${LAYERS[i - 1]}-layer`;
            return (
              <Source {...(c?.source as SourceProps)} key={`${l}-source`} id={`${l}-source`}>
                {STYLES.map((style, index) => {
                  return (
                    <Layer
                      {...style}
                      key={`${l}-layer-${index}`}
                      id={`${l}-layer-${index}`}
                      beforeId={beforeId}
                    />
                  );
                })}
              </Source>
            );
          })}
        </>
      )}
      <Controls className="absolute top-4 right-4">
        <ZoomControl />
        <SettingsControl>
          <BasemapControl
            basemap={value?.basemap ?? "default"}
            onBasemapChange={(basemapId) => {
              setValue({
                ...value,
                basemap: basemapId,
              });
            }}
          />
        </SettingsControl>
      </Controls>
    </Map>
  );
};
