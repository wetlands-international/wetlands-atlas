"use client";

import { FC, useCallback } from "react";

import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import {
  useSyncIndicators,
  useSyncLayers,
  useSyncLocation,
  useSyncLayersSettings,
} from "@/app/(frontend)/[locale]/(app)/store";

import { IndicatorChartData } from "@/containers/indicators/types";

import WidgetChart from "@/components/chart";
import InfoButton from "@/components/ui/info-button";
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
              location: typeof doc.location === "object" ? doc.location.id : doc.location,
              chartData: (doc.data as IndicatorChartData[]).map((d) => ({
                ...d,
                key: d.label,
                label: doc?.labels?.[d.label] ?? d.label,
              })),
            }),
          );

          return result;
        },
      },
    ),
  );
  const chartData = data?.find((doc) => doc.location === location)?.chartData || [];
  const lexicalVariables = chartData.reduce(
    (acc, curr) => ({ [curr.key]: curr.value, ...acc }),
    {},
  );
  const [layersSettings, setLayersSettings] = useSyncLayersSettings();

  const handleSwitchChange = useCallback(
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

  return (
    <div
      key={indicator.id}
      className="bg-background animate-in fade-in slide-in-from-left-0 rounded-4xl p-6 duration-500"
    >
      <header className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold uppercase">{indicator.name}</h2>
          <div className="flex items-center gap-2">
            {indicator.description &&
              !!convertLexicalToPlaintext({ data: indicator.description }) && (
                <InfoButton>
                  <div className="prose prose-invert prose-sm">
                    <Lexical data={indicator.description} variables={lexicalVariables} />
                  </div>
                </InfoButton>
              )}
            {!!indicator.layers && !!indicator.layers.docs?.length && (
              <Switch
                checked={!!indicators?.includes(indicator.id)}
                onCheckedChange={handleSwitchChange}
              />
            )}
          </div>
        </div>

        {indicator.widget && Object.keys(lexicalVariables).length > 0 && (
          <div className="prose prose-invert prose-sm">
            <Lexical data={indicator.widget} variables={lexicalVariables} />
          </div>
        )}
      </header>
      {chartData.length > 0 && (
        <>
          <div className="aspect-square">
            <WidgetChart indicator={indicator.id} data={chartData} />
          </div>
        </>
      )}
    </div>
  );
};
