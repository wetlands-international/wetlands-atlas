"use client";

import { DEFAULT_CATEGORIES_OPTIONS } from "@/services/prefetches";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const Categories = () => {
  const locale = useLocale();

  const { data } = useSuspenseQuery(DEFAULT_CATEGORIES_OPTIONS(locale));

  return (
    <div className="container grid gap-4">
      {data.docs.map((category) => (
        <div key={category.id} className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold uppercase">{category.name}</h2>
          {!!category.description && (
            <div className="prose dark:prose-invert prose-sm">{category.description}</div>
          )}
        </div>
      ))}
    </div>
  );
};
