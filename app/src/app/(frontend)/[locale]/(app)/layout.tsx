import { Suspense } from "react";

import { getPayload } from "payload";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getLocale } from "next-intl/server";

import { ClientProviders } from "@/app/(frontend)/[locale]/(app)/providers";

import { Language } from "@/containers/language";
import { MapContainer } from "@/containers/map";
import MapLegend from "@/containers/map/map-legend";
import { Toggle } from "@/containers/toogle";

import payloadConfig from "@/payload.config";

import API from "@/services/api";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const queryClient = new QueryClient();
  const payload = await getPayload({ config: payloadConfig });

  const landscapes = await payload.find({
    collection: "landscapes",
    depth: 1,
    limit: 100,
    page: 1,
    sort: "-createdAt",
    locale,
    where: {
      published: {
        equals: true,
      },
    },
  });

  await queryClient.prefetchQuery(
    API.queryOptions("get", "/api/categories", {
      params: {
        query: {
          depth: 1,
          limit: 0,
          locale,
        },
      },
    }),
  );

  // Default locations
  await queryClient.prefetchQuery(
    API.queryOptions("get", "/api/locations", {
      params: {
        query: {
          depth: 1,
          limit: 0,
          page: 1,
          sort: "name",
          locale,
          select: {
            id: true,
            name: true,
            type: true,
            code: true,
            bbox: true,
          },
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
            <MapContainer landscapes={landscapes.docs} />
          </Suspense>

          <div className="pointer-events-none fixed right-5 bottom-7 z-10">
            <MapLegend />
          </div>
        </main>
      </ClientProviders>
    </HydrationBoundary>
  );
}
