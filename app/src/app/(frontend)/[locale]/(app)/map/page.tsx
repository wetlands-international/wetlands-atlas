import { Suspense } from "react";

import { Metadata } from "next";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Command } from "cmdk";
import { getLocale, getTranslations } from "next-intl/server";
import { createLoader, type SearchParams } from "nuqs/server";

import {
  insightParser,
  locationParser,
  regionParser,
} from "@/app/(frontend)/[locale]/(app)/parsers";

import { categoriesQueryOptions } from "@/hooks/use-categories";
import { landscapesQueryOptions } from "@/hooks/use-landscapes";

import { Categories } from "@/containers/categories";
import { CategoriesList } from "@/containers/categories/list";
import { Header } from "@/containers/header";
import { Indicators } from "@/containers/indicators";
import { IndicatorsList } from "@/containers/indicators/list";
import { Locations } from "@/containers/locations";
import { LocationsList } from "@/containers/locations/list";
import { LocationsSearch } from "@/containers/locations/search";
import { Regions } from "@/containers/regions";
import { RegionsList } from "@/containers/regions/list";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("home.title"),
    description: t("home.description"),
  };
}

const loadSearchParams = createLoader({
  region: regionParser,
  insight: insightParser,
  location: locationParser,
});

export default async function AppPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const locale = await getLocale();
  const filters = await loadSearchParams(searchParams);
  const queryClient = new QueryClient();

  // The categories are only listed inside a region
  if (filters.region) {
    await queryClient.prefetchQuery(categoriesQueryOptions(locale, filters.region));
  }

  // The map's landscape markers
  await queryClient.prefetchQuery(landscapesQueryOptions(locale, filters));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Wide enough for the search placeholder that lists every region */}
      <aside className="absolute top-0 left-0 z-10 h-[calc(100svh_-_theme(space.16))] w-full max-w-[472px] overflow-hidden">
        <Command className="flex h-full w-full flex-col gap-2.5 p-4" shouldFilter={false}>
          <Header>
            <Suspense>
              <LocationsSearch />
            </Suspense>
          </Header>

          <Suspense>
            <Regions>
              <RegionsList />
            </Regions>

            <Categories>
              <CategoriesList />
            </Categories>

            <Indicators>
              <IndicatorsList />
            </Indicators>

            <Locations>
              <LocationsList />
            </Locations>
          </Suspense>
        </Command>
      </aside>
    </HydrationBoundary>
  );
}
