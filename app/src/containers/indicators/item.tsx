"use client";

import { useCallback } from "react";

import { useSyncIndicators, useSyncLayers } from "@/app/(frontend)/[locale]/(app)/store";

import RankingChartComponent from "@/components/chart/ranking";
// import ScatterChartComponent from "@/components/chart/scatter";
import { Lexical } from "@/components/ui/lexical";
import { Switch } from "@/components/ui/switch";

import { Indicator } from "@/payload-types";

export const IndicatorsItem = (indicator: Indicator) => {
  const [indicators, setIndicators] = useSyncIndicators();
  const [, setLayers] = useSyncLayers();

  const handleSwitchChange = useCallback(() => {
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
  }, [indicator.id, indicator.layers, setIndicators, setLayers]);

  return (
    <div
      key={indicator.id}
      className="bg-background animate-in fade-in slide-in-from-left-0 rounded-4xl p-6 duration-500"
    >
      <header className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold uppercase">{indicator.name}</h2>
        <Switch
          checked={!!indicators?.includes(indicator.id)}
          onCheckedChange={handleSwitchChange}
        />
      </header>

      {!!indicator.description && (
        <div className="prose prose-invert prose-sm">
          <Lexical
            data={indicator.description}
            variables={{
              value: "11M km²",
              percentage: "7%",
              location: "World",
              total: 1000000,
              totalPercentage: 0.3897,
            }}
          />
        </div>
      )}

      <div className="-mx-6 aspect-video">
        {/* <BarChartComponent /> */}
        <RankingChartComponent />
      </div>
    </div>
  );
};
