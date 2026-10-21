"use client";

import { useEffect, useMemo } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { createSerializer, useQueryStates } from "nuqs";

import { getInvalidParams } from "@/lib/invalid-params";

import {
  indicatorsParser,
  insightParser,
  layersParser,
  locationParser,
  regionParser,
} from "@/app/(frontend)/[locale]/(app)/parsers";

import { categoriesQueryOptions } from "@/hooks/use-categories";
import { useContextualLayers } from "@/hooks/use-contextual-layers";
import { useRegions } from "@/hooks/use-regions";

const regionScopedParsers = {
  region: regionParser,
  insight: insightParser,
  indicators: indicatorsParser,
  location: locationParser,
  layers: layersParser,
};

// Serializes each param with its own parser, and removes the ones set to `null`
const serializeRegionScopedParams = createSerializer(regionScopedParsers);

/**
 * Removes the URL params that don't exist or don't belong to the region (legacy or edited links), so
 * that the map falls back to the deepest valid view
 */
export const UrlParamsValidator = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [params] = useQueryStates(regionScopedParsers);

  const { data: regionsData } = useRegions();
  const regionIds = useMemo(() => regionsData.docs.map(({ id }) => id), [regionsData]);
  const isRegionValid = params.region !== null && regionIds.includes(params.region);

  // Prefetched by the pages, so that the insight is checked without a request
  const { data: categoriesData } = useQuery({
    ...categoriesQueryOptions(locale, params.region),
    enabled: isRegionValid,
  });
  const categoryIds = useMemo(() => categoriesData?.docs.map(({ id }) => id), [categoriesData]);

  const { data: contextualLayers } = useContextualLayers();

  const invalidParams = useMemo(
    () => getInvalidParams(params, { regionIds, categoryIds, contextualLayers }),
    [params, regionIds, categoryIds, contextualLayers],
  );

  useEffect(() => {
    if (!Object.keys(invalidParams).length) return;

    const url = serializeRegionScopedParams(`${pathname}?${searchParams}`, invalidParams);

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
