import type { Where } from "payload";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { Config, Region } from "@/payload-types";

import { collectionQueryOptions } from "@/services/sdk-query";

/**
 * Returns the `where` condition that keeps the landscapes of a region, or all of them if there is no region
 */
export const getLandscapesRegionWhere = (region: Region["id"] | null): Where =>
  region ? { "category.region": { equals: region } } : {};

// Shared by the server prefetch in `(app)/map/page.tsx` and `(app)/landscapes/page.tsx` and the client, so that
// all use the same query key
export const landscapesQueryOptions = (locale: Config["locale"], region: Region["id"] | null) =>
  collectionQueryOptions("landscapes", {
    depth: 1,
    limit: 100,
    page: 1,
    sort: "-createdAt",
    locale,
    where: {
      published: {
        equals: true,
      },
      ...getLandscapesRegionWhere(region),
    },
  });

export const useLandscapes = (region: Region["id"] | null) => {
  const locale = useLocale();

  return useSuspenseQuery(landscapesQueryOptions(locale, region));
};
