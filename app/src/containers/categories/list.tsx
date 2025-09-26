"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { CategoriesHeader } from "@/containers/categories/header";
import { CategoriesItem } from "@/containers/categories/item";

import API from "@/services/api";

export const CategoriesList = () => {
  const locale = useLocale();

  const { data: categoriesData } = useSuspenseQuery(
    API.queryOptions("get", "/api/categories", {
      params: {
        query: {
          depth: 1,
          limit: 0,
          locale, // Replace with the actual locale if needed
        },
      },
    }),
  );

  return (
    <div className="flex flex-col gap-1">
      <CategoriesHeader />

      {categoriesData?.docs.map((category) => <CategoriesItem key={category.id} {...category} />)}
    </div>
  );
};
