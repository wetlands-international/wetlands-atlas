"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { CategoriesHeader } from "@/containers/categories/header";
import { CategoriesItem } from "@/containers/categories/item";

import { collectionQueryOptions } from "@/services/sdk-query";

export const CategoriesList = () => {
  const locale = useLocale();

  const { data: categoriesData } = useSuspenseQuery(
    collectionQueryOptions("categories", {
      depth: 1,
      limit: 0,
      locale,
      where: {
        published: {
          equals: true,
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
