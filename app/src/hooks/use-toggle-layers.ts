import { useCallback } from "react";

import {
  useSyncIndicators,
  useSyncLayers,
  useSyncLayersSettings,
} from "@/app/(frontend)/[locale]/(app)/store";

import { Indicator } from "@/payload-types";

export function useToggleLayers(indicator: Indicator) {
  const [indicators, setIndicators] = useSyncIndicators();
  const [, setLayers] = useSyncLayers();

  const [layersSettings, setLayersSettings] = useSyncLayersSettings();

  const toggleLayer = useCallback(
    (checked: boolean) => {
      if (!checked && layersSettings) {
        setLayersSettings(null);
      }

      setIndicators((prev) => {
        if (prev?.includes(indicator.id)) {
          const updatedIndicators = prev.filter((id) => id !== indicator.id);
          // If no indicators are left, reset layers
          if (updatedIndicators.length === 0) {
            return null;
          }

          return updatedIndicators;
        } else {
          return [...(prev || []), indicator.id];
        }
      });

      setLayers((prev) => {
        const newLayers = indicator?.layers?.docs?.map((l) => {
          if (typeof l !== "string" && "id" in l) {
            return l.id;
          }
          return l; // If l is already a string, return it as is
        });

        if (!newLayers?.length) return prev;

        // If the layers are already present, remove them
        if (prev?.length) {
          const filteredLayers = prev.filter((layer) => !newLayers.includes(layer));
          if (filteredLayers.length === prev.length) {
            // If no layers were removed, add the new layers
            return [...new Set([...prev, ...newLayers])]; // Ensure unique layers
          }
          return filteredLayers;
        }

        // If no layers are present, add the new layers
        return newLayers;
      });
    },
    [indicator.id, indicator.layers, layersSettings, setIndicators, setLayers, setLayersSettings],
  );

  return { indicators, toggleLayer };
}
