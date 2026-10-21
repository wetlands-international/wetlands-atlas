"use client";

import { useEffect, useMemo } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useQueryStates } from "nuqs";

import { getInvalidParams } from "@/lib/invalid-params";

import {
  indicatorsParser,
  insightParser,
  locationParser,
  regionParser,
} from "@/app/(frontend)/[locale]/(app)/parsers";

import { categoriesQueryOptions } from "@/hooks/use-categories";
import { useRegions } from "@/hooks/use-regions";

/**
 * Removes the URL params that don't exist or don't belong to the region (legacy or edited links), so
 * that the map falls back to the deepest valid view
 */
export const UrlParamsValidator = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [params] = useQueryStates({
    region: regionParser,
    insight: insightParser,
    indicators: indicatorsParser,
    location: locationParser,
  });

  const { data: regionsData } = useRegions();
  const regionIds = useMemo(() => regionsData.docs.map(({ id }) => id), [regionsData]);
  const isRegionValid = params.region !== null && regionIds.includes(params.region);

  // Prefetched by the pages, so that the insight is checked without a request
  const { data: categoriesData } = useQuery({
    ...categoriesQueryOptions(locale, params.region),
    enabled: isRegionValid,
  });
  const categoryIds = useMemo(() => categoriesData?.docs.map(({ id }) => id), [categoriesData]);

  const invalidParams = useMemo(
    () => getInvalidParams(params, { regionIds, categoryIds }),
    [params, regionIds, categoryIds],
  );

  useEffect(() => {
    const invalidKeys = Object.keys(invalidParams);
    if (!invalidKeys.length) return;

    const newSearchParams = new URLSearchParams(searchParams);
    invalidKeys.forEach((key) => newSearchParams.delete(key));
    const url = `${pathname}?${newSearchParams}`;

    // Not through the nuqs setters: they update the other nuqs hooks synchronously, so the page's Suspense
    // boundaries that are still hydrating would read the new params and not match the server HTML. Next
    // applies these URL updates in a transition, after the hydration.
    if ("region" in invalidParams) {
      // Like `useSyncRegion`, so that the server prefetches the data without the region again
      router.replace(url, { scroll: false });
    } else {
      window.history.replaceState(null, "", url);
    }
  }, [invalidParams, pathname, router, searchParams]);

  return null;
};
