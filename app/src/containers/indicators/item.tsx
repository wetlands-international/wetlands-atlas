"use client";

import { FC } from "react";

import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { useSyncLocation } from "@/app/(frontend)/[locale]/(app)/store";

import { useToggleLayers } from "@/hooks/use-toggle-layers";

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
  const { indicators, toggleLayer } = useToggleLayers(indicator);
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
                  <div className="prose prose-invert prose-sm prose-p:leading-5">
                    <Lexical data={indicator.description} variables={lexicalVariables} />
                  </div>
                </InfoButton>
              )}
            {!!indicator.layers && !!indicator.layers.docs?.length && (
              <Switch
                checked={!!indicators?.includes(indicator.id)}
                onCheckedChange={toggleLayer}
              />
            )}
          </div>
        </div>

        {indicator.widget && Object.keys(lexicalVariables).length > 0 && (
          <div className="prose prose-invert prose-sm prose-p:leading-5">
            <Lexical data={indicator.widget} variables={lexicalVariables} />
          </div>
        )}
      </header>
      {chartData.length > 0 && <WidgetChart indicator={indicator.id} data={chartData} />}
    </div>
  );
};
