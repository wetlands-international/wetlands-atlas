"use client";

import { Where } from "payload";

import { useQueries, useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { useSyncInsight, useSyncLocation } from "@/app/(frontend)/[locale]/(app)/store";

import { CategoriesBack } from "@/containers/categories/back";
import { chartCategoriesMap } from "@/containers/indicators/constants";
import { IndicatorsItem } from "@/containers/indicators/item";
import { IndicatorChartData } from "@/containers/indicators/types";

import API from "@/services/api";

export const IndicatorsList = () => {
  const locale = useLocale();

  const [insight] = useSyncInsight();
  const [location] = useSyncLocation();

  const query: Where = {
    "category.id": {
      equals: insight,
    },
  };

  const { data: indicatorsData } = useQuery(
    API.queryOptions("get", "/api/indicators", {
      params: {
        query: {
          depth: 1,
          limit: 100,
          page: 1,
          sort: "-createdAt",
          locale,
          where: query,
        },
      },
    }),
  );
  const indicatorQueries = useQueries({
    queries:
      indicatorsData?.docs.map((doc) => {
        return API.queryOptions(
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
                    equals: doc.id,
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
        );
      }) ?? [],
  });

  return (
    <div className="flex flex-col gap-1">
      <CategoriesBack />

      {indicatorsData?.docs.map((indicator, index) => (
        <IndicatorsItem
          key={indicator.id}
          indicator={indicator}
          chartData={
            indicatorQueries[index]?.data?.find((doc) => doc.location === location)?.chartData || []
          }
        />
      ))}
    </div>
  );
};
