"use client";

import { Where } from "payload";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { useSyncInsight } from "@/app/(frontend)/[locale]/(app)/store";

import { CategoriesBack } from "@/containers/categories/back";
import { IndicatorsItem } from "@/containers/indicators/item";
import OtherIndicators from "@/containers/indicators/others";
import { LandscapesIndicator } from "@/containers/landscapes/indicator";

import API from "@/services/api";

export const IndicatorsList = () => {
  const locale = useLocale();

  const [insight] = useSyncInsight();

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
          locale,
          where: query,
        },
      },
    }),
  );
  const widgets =
    indicatorsData?.docs.filter((d) => d.widget && Object.keys(d.widget).length > 0) || [];
  const others =
    indicatorsData?.docs.filter(
      (d) => (!d.widget || Object.keys(d.widget).length === 0) && d.layers?.docs?.length,
    ) || [];

  return (
    <div className="flex flex-col gap-1">
      <CategoriesBack />

      <LandscapesIndicator />

      {widgets.map((indicator) => (
        <IndicatorsItem key={indicator.id} indicator={indicator} />
      ))}
      {others.length > 0 ? <OtherIndicators indicators={others} /> : null}
    </div>
  );
};
