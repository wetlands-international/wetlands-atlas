"use client";

import { useSyncRegion } from "@/app/(frontend)/[locale]/(app)/store";

import { useCategories } from "@/hooks/use-categories";

import { CategoriesHeader } from "@/containers/categories/header";
import { CategoriesItem } from "@/containers/categories/item";

export const CategoriesList = () => {
  const [region] = useSyncRegion();
  const { data: categoriesData } = useCategories(region);

  return (
    <div className="flex flex-col gap-1">
      <CategoriesHeader />

      {categoriesData?.docs.map((category) => <CategoriesItem key={category.id} {...category} />)}
    </div>
  );
};
