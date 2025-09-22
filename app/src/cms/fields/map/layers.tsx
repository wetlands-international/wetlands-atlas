"use client";

import { useCallback } from "react";

import { useField } from "@payloadcms/ui";

import { Switch } from "@/components/ui/switch";

import { Layer, Landscape } from "@/payload-types";

const MapFieldLayersGroup = ({
  layers,
  type,
  value,
  handleToogleLayer,
}: {
  layers: Layer[];
  type: Layer["type"];
  value: NonNullable<Landscape["steps"]>[number]["map"];
  setValue: (value: NonNullable<Landscape["steps"]>[number]["map"]) => void;
  handleToogleLayer: (layerId: Layer["id"]) => void;
}) => {
  const LAYERS = layers.filter((layer) => layer.type === type);

  if (LAYERS.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2.5 overflow-auto pb-3">
      <h3 className="text-xs font-bold text-white uppercase">{type} layers</h3>
      <ul className="list-none space-y-0 p-0">
        {LAYERS.map((layer) => {
          const isActive = value?.layers?.includes(layer.id);

          return (
            <li key={layer.id} className="flex gap-1 py-1">
              <Switch
                className="mt-px shrink-0"
                checked={isActive}
                onCheckedChange={() => handleToogleLayer(layer.id)}
              />
              <button
                type="button"
                className="text-md w-full cursor-pointer border-0 bg-transparent px-2 py-0 text-left text-sm text-white hover:underline"
                onClick={() => handleToogleLayer(layer.id)}
              >
                {layer.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const MapFieldLayers = ({ layers }: { layers: Layer[] }) => {
  const { value, setValue } = useField<NonNullable<Landscape["steps"]>[number]["map"]>();

  const handleToogleLayer = useCallback(
    (layerId: Layer["id"]) => {
      const currentLayers = value?.layers || [];
      const newLayers = currentLayers.includes(layerId)
        ? currentLayers.filter((id) => id !== layerId)
        : [...currentLayers, layerId];
      setValue({
        ...value,
        layers: newLayers,
      });
    },
    [value, setValue],
  );

  return (
    <div className="divide-accent/50 space-y-4 divide-y">
      <MapFieldLayersGroup
        layers={layers}
        type="indicator"
        value={value}
        setValue={setValue}
        handleToogleLayer={handleToogleLayer}
      />
      <MapFieldLayersGroup
        layers={layers}
        type="contextual"
        value={value}
        setValue={setValue}
        handleToogleLayer={handleToogleLayer}
      />
      <MapFieldLayersGroup
        layers={layers}
        type="landscape"
        value={value}
        setValue={setValue}
        handleToogleLayer={handleToogleLayer}
      />
    </div>
  );
};
