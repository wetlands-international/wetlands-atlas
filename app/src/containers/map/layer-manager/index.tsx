"use client";

import { FC, useMemo } from "react";

import { Layer, useMap } from "react-map-gl/mapbox";

import { LayersSettings } from "@/app/(frontend)/[locale]/(app)/parsers";

import LayerManagerItem from "./item";

export const LayerManager: FC<{
  layers: string[];
  layersSettings: LayersSettings<unknown> | null;
}> = ({ layers, layersSettings }) => {
  const { current: map } = useMap();

  const baseLayer = useMemo(() => {
    if (map && map.isStyleLoaded()) {
      const layers = map!.getStyle()!.layers;
      // Find the custom layer to be able to sort the layers
      const customLayer = layers?.find((l) => l.id.includes("custom-layer"));
      // Find the first label layer to be able to sort the layers if there is no custom layer
      const labelLayer = layers?.find((l) => l.id.includes("label"));
      return customLayer ? customLayer.id : labelLayer?.id;
    }
  }, [map]);

  const LAYERS = useMemo(() => {
    return layers.toReversed();
  }, [layers]);

  return (
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

      {/*
          Loop through active layers. The id is gonna be used to fetch the current layer and know how to order the layers.
          The first item will always be at the top of the layers stack
        */}
      {LAYERS.map((l, i, arr) => {
        const beforeId = i === 0 ? baseLayer : `${arr[i - 1]}-layer`;

        return (
          <LayerManagerItem
            key={l}
            id={l}
            settings={{
              // ...{ opacity: 1, visibility: true },
              ...(!!layersSettings && layersSettings[l]),
            }}
            beforeId={beforeId}
          />
        );
      })}
    </>
  );
};
