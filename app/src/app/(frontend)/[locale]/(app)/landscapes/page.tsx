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

import { landscapesQueryOptions } from "@/hooks/use-landscapes";

import { Header } from "@/containers/header";
import { Landscapes } from "@/containers/landscapes";
import LandscapesFilters from "@/containers/landscapes/filters";
import { LandscapesFilteredList } from "@/containers/landscapes/filters/list";
import { LandscapesSearch } from "@/containers/landscapes/search";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("landscapes.title"),
    description: t("landscapes.description"),
  };
}

const loadSearchParams = createLoader({
  region: regionParser,
  insight: insightParser,
  location: locationParser,
});

export default async function LandscapesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const locale = await getLocale();
  const filters = await loadSearchParams(searchParams);
  const queryClient = new QueryClient();

  // Shared by the list and the map's landscape markers
  await queryClient.prefetchQuery(landscapesQueryOptions(locale, filters));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <aside className="absolute top-0 left-0 z-10 w-full max-w-md">
        <Command className="flex w-full flex-col gap-2.5 p-4" shouldFilter={false}>
          <Header>
            <Suspense>
              <LandscapesSearch />
            </Suspense>
          </Header>

          <Suspense>
            <LandscapesFilters>
              <LandscapesFilteredList />
            </LandscapesFilters>
          </Suspense>
        </Command>
      </aside>

      <aside className="absolute bottom-12 left-4 z-10 flex w-[calc(100%_-_theme(spacing.8))] flex-col gap-2.5">
        <Suspense>
          <Landscapes />
        </Suspense>
      </aside>
    </HydrationBoundary>
  );
}
