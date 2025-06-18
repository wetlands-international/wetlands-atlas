"use client";

import { useCallback } from "react";

import { useSyncIndicators } from "@/app/(frontend)/[locale]/(app)/store";

import RankingChartComponent from "@/components/chart/ranking";
// import ScatterChartComponent from "@/components/chart/scatter";
import { Lexical } from "@/components/ui/lexical";
import { Switch } from "@/components/ui/switch";

import { Indicator } from "@/payload-types";

export const IndicatorsItem = (indicator: Indicator) => {
  const [indicators, setIndicators] = useSyncIndicators();

  const handleSwitchChange = useCallback(() => {
    setIndicators((prev) => {
      if (prev?.includes(indicator.id)) {
        return prev.filter((id) => id !== indicator.id);
      } else {
        return [...(prev || []), indicator.id];
      }
    });
  }, [indicator.id, setIndicators]);

  return (
    <div key={indicator.id} className="bg-background rounded-4xl p-6">
      <header className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold uppercase">{indicator.name}</h2>
        <Switch checked={indicators?.includes(indicator.id)} onCheckedChange={handleSwitchChange} />
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
