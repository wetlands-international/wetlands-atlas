"use client";

import { useCallback } from "react";

import { useField } from "@payloadcms/ui";

import { Switch } from "@/components/ui/switch";

import { Layer, Landscape } from "@/payload-types";

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
    <ul className="list-none space-y-1 p-0">
      {layers.map((layer) => {
        const isActive = value?.layers?.includes(layer.id);

        return (
          <li key={layer.id} className="flex items-center gap-1">
            <Switch
              checked={isActive}
              className="shrink-0"
              onCheckedChange={() => handleToogleLayer(layer.id)}
            />
            <button
              type="button"
              className="text-md w-full border-0 bg-transparent p-2 text-left text-white hover:underline"
              onClick={() => handleToogleLayer(layer.id)}
            >
              {layer.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
