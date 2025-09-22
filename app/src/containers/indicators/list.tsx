"use client";

import { Where } from "payload";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { useSyncInsight } from "@/app/(frontend)/[locale]/(app)/store";

import { CategoriesBack } from "@/containers/categories/back";
import { IndicatorsItem } from "@/containers/indicators/item";

import { Indicator } from "@/payload-types";

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
          sort: "-createdAt",
          locale,
          where: query,
        },
      },
    }),
  );

  return (
    <div className="flex flex-col gap-1">
      <CategoriesBack />

      {indicatorsData?.docs.map((indicator) => (
        <IndicatorsItem key={indicator.id} indicator={indicator as Indicator} />
      ))}
    </div>
  );
};
