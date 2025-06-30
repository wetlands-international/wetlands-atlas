"use client";

import { Where } from "payload";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { useSyncInsight } from "@/app/(frontend)/[locale]/(app)/store";

import { CategoriesBack } from "@/containers/categories/back";
import { IndicatorsItem } from "@/containers/indicators/item";

import API from "@/services/api";

export const IndicatorsList = () => {
  const locale = useLocale();

  const [insight] = useSyncInsight();

  const query: Where = {
    "category.id": {
      equals: insight,
    },
  };

  const { data: indicatorsData } = useSuspenseQuery(
    API.queryOptions("get", "/api/indicators", {
      params: {
        query: {
          depth: 1,
          limit: 100,
          page: 1,
          sort: "-createdAt",
          locale,
          // TODO: openapi is not correctly handling the `where` clause with a nested object
          // @ts-expect-error -- TypeScript is not correctly handling the `where` clause
          where: query,
        },
      },
    }),
  );

  return (
    <div className="flex flex-col gap-1">
      <CategoriesBack />

      {indicatorsData.docs.map((indicator) => (
        // @ts-expect-error -- Media is not well defined in the types, but it works in practice. It doesn't take into account that the Media has a number as an id
        <IndicatorsItem key={indicator.id} {...indicator} />
      ))}
    </div>
  );
};
