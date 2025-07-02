import { Suspense } from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getLocale } from "next-intl/server";

import { ClientProviders } from "@/app/(frontend)/[locale]/(app)/providers";

import { Language } from "@/containers/language";
import { MapContainer } from "@/containers/map";
import { Toggle } from "@/containers/toogle";

import API from "@/services/api";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    API.queryOptions("get", "/api/categories", {
      params: {
        query: {
          depth: 1,
          limit: 100,
          sort: "name",
          locale,
        },
      },
    }),
  );

  await queryClient.prefetchQuery(
    API.queryOptions("get", "/api/locations", {
      params: {
        query: {
          depth: 1,
          limit: 25,
          page: 1,
          sort: "name",
          locale,
        },
      },
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientProviders>
        <main className="relative flex h-[100svh] flex-col overflow-hidden">
          {children}

          <div className="pointer-events-none fixed top-4 right-4 z-10 flex items-center gap-2">
            <Suspense>
              <Language />
              <Toggle />
            </Suspense>
          </div>

          <Suspense>
            <MapContainer />
          </Suspense>
        </main>
      </ClientProviders>
    </HydrationBoundary>
  );
}
