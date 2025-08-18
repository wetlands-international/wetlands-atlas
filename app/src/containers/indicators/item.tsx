"use client";

import { FC, useCallback } from "react";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import {
  useSyncIndicators,
  useSyncLayers,
  useSyncLocation,
} from "@/app/(frontend)/[locale]/(app)/store";

import { chartCategoriesMap } from "@/containers/indicators/constants";
import { IndicatorChartData } from "@/containers/indicators/types";

import RankingChartComponent from "@/components/chart/ranking";
import { Lexical } from "@/components/ui/lexical";
import { Switch } from "@/components/ui/switch";

import { Indicator } from "@/payload-types";

import API from "@/services/api";

interface IndicatorsItemProps {
  indicator: Indicator;
}
export const IndicatorsItem: FC<IndicatorsItemProps> = ({ indicator }) => {
  const [indicators, setIndicators] = useSyncIndicators();
  const [, setLayers] = useSyncLayers();
  const locale = useLocale();
  const [location] = useSyncLocation();
  const { data } = useQuery(
    API.queryOptions(
      "get",
      "/api/indicator-data",
      {
        params: {
          query: {
            depth: 1,
            limit: 100,
            page: 1,
            sort: "-createdAt",
            locale,
            where: {
              "indicator.id": {
                equals: indicator.id,
              },
            },
          },
        },
      },
      {
        select: (data) => {
          const result: { location: string; chartData: IndicatorChartData[] }[] = data.docs.map(
            (doc) => ({
              location: typeof doc.location === "object" ? doc.location.name : doc.location,
              chartData: Object.entries(
                doc.data as Record<keyof typeof chartCategoriesMap, number>,
              ).map(([name, value]) => ({
                name,
                value,
                ...chartCategoriesMap[name as keyof typeof chartCategoriesMap],
              })),
            }),
          );

          return result;
        },
      },
    ),
  );
  const chartData = data?.find((doc) => doc.location === location)?.chartData || [];

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
      <header className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold uppercase">{indicator.name}</h2>
          <Switch
            checked={indicators?.includes(indicator.id)}
            onCheckedChange={handleSwitchChange}
          />
        </div>
        <p className="text-sm">
          Wetlands stand out for their potential to mitigate climate change, especially peatlands
          and coastal wetlands. 
        </p>
      </header>
      <div className="mt-7 mb-4 w-full border-t border-dashed" />

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
        <RankingChartComponent data={chartData} />
      </div>
    </div>
  );
};
