import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { Config, Region } from "@/payload-types";

import { collectionQueryOptions } from "@/services/sdk-query";

// Shared by the server prefetch in `(app)/map/page.tsx` and the client, so that both use the same query key
export const categoriesQueryOptions = (locale: Config["locale"], region: Region["id"] | null) =>
  collectionQueryOptions("categories", {
    depth: 1,
    limit: 0,
    locale,
    where: {
      published: {
        equals: true,
      },
      region: {
        equals: region,
      },
    },
  });

export const useCategories = (region: Region["id"] | null) => {
  const locale = useLocale();

  return useSuspenseQuery(categoriesQueryOptions(locale, region));
};
