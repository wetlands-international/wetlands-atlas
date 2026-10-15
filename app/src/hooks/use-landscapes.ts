import type { Where } from "payload";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useQueryStates } from "nuqs";

import {
  insightParser,
  locationParser,
  regionParser,
} from "@/app/(frontend)/[locale]/(app)/parsers";

import { Category, Config, Location, Region } from "@/payload-types";

import { collectionQueryOptions } from "@/services/sdk-query";

export interface LandscapesFilters {
  region: Region["id"] | null;
  insight: Category["id"] | null;
  location: Location["id"] | null;
}

/**
 * Returns the `where` condition that keeps the landscapes of the region, category and location, if any
 */
export const getLandscapesWhere = ({ region, insight, location }: LandscapesFilters): Where => ({
  ...(region && { "category.region": { equals: region } }),
  ...(insight && { category: { equals: insight } }),
  // Resolved by the `landscapesReadLocationCriteriaExtension` CMS hook
  ...(location && { geoLocation: { within: location } }),
});

// Shared by the server prefetch in `(app)/map/page.tsx` and `(app)/landscapes/page.tsx` and the client, so that
// all use the same query key
export const landscapesQueryOptions = (locale: Config["locale"], filters: LandscapesFilters) =>
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
      ...getLandscapesWhere(filters),
    },
  });

// Reads the URL params with the parsers instead of `(app)/store`, which can't be imported on the server
export const useLandscapesFilters = (): LandscapesFilters => {
  const [filters] = useQueryStates({
    region: regionParser,
    insight: insightParser,
    location: locationParser,
  });

  return filters;
};

export const useLandscapes = () => {
  const locale = useLocale();
  const filters = useLandscapesFilters();

  return useSuspenseQuery(landscapesQueryOptions(locale, filters));
};
