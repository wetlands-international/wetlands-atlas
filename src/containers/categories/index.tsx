"use client";

import API from "@/services/api";
import { useLocale } from "next-intl";

export const Categories = () => {
  const locale = useLocale();

  const { data } = API.useQuery("get", "/api/categories", {
    params: {
      query: {
        locale,
        sort: "name",
      },
    },
  });

  if (!data) {
    return null;
  }

  return (
    <div className="grid gap-4">
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
