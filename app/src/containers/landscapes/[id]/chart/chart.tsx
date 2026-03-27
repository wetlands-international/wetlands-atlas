"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { IndicatorChartData } from "@/containers/indicators/types";

import WidgetChart from "@/components/chart";

import { Indicator, Location } from "@/payload-types";

import { collectionQueryOptions } from "@/services/sdk-query";

export const LandscapeChart = (props: {
  title: string;
  indicator: string | Indicator;
  location: string | Location;
}) => {
  const { title, indicator, location } = props;

  const locale = useLocale();

  const { data } = useQuery({
    ...collectionQueryOptions("indicator-data", {
      depth: 1,
      pagination: false,
      sort: "-createdAt",
      locale,
      where: {
        "indicator.id": {
          equals: typeof indicator === "string" ? indicator : indicator.id,
        },
        "location.id": {
          equals: typeof location === "string" ? location : location.id,
        },
      },
    }),
    select(data) {
      const labels =
        typeof indicator === "object" ? (indicator.labels as Record<string, string> | null) : null;
      return data.docs
        .map((doc) => {
          const items = doc?.data as IndicatorChartData[] | null;
          return (
            items?.map((d) => ({
              ...d,
              key: d.label,
              label: labels?.[d.label] ?? d.label,
            })) ?? []
          );
        })
        .flat();
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-10">
      <div className="flex w-full grow flex-col items-center justify-center">
        <h2 className="space-y-4">{title}</h2>
        <WidgetChart
          indicator={typeof indicator === "string" ? indicator : indicator.id}
          data={data || []}
        />
      </div>
    </div>
  );
};
