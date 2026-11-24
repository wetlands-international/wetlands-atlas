import { Suspense } from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getLocale } from "next-intl/server";

import { ClientProviders } from "@/app/(frontend)/[locale]/(app)/providers";

import { contextualLayersQueryOptions } from "@/hooks/use-contextual-layers";
import { globalLocationsQueryOptions } from "@/hooks/use-global-locations";
import { regionsQueryOptions } from "@/hooks/use-regions";

import { MapContainer } from "@/containers/map";
import MapLegend from "@/containers/map/map-legend";
import { UrlParamsValidator } from "@/containers/url-params-validator";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(regionsQueryOptions(locale));

  // Read by the layers menu and by `UrlParamsValidator`, to remove the layers of other regions
  await queryClient.prefetchQuery(contextualLayersQueryOptions(locale));

  // The map needs it before mounting, for its initial bounds
  await queryClient.prefetchQuery(globalLocationsQueryOptions(locale));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientProviders>
        <Suspense>
          <UrlParamsValidator />
        </Suspense>

        <main className="relative flex h-[100svh] flex-col overflow-hidden">
          {children}

          <Suspense>
            <MapContainer />
          </Suspense>

          <MapLegend />
        </main>
      </ClientProviders>
    </HydrationBoundary>
  );
}
