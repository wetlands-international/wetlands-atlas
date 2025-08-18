import { Suspense } from "react";

import { getPayload } from "payload";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getLocale } from "next-intl/server";

import { ClientProviders } from "@/app/(frontend)/[locale]/(app)/providers";

import { Language } from "@/containers/language";
import { MapContainer } from "@/containers/map";
import { Toggle } from "@/containers/toogle";

import payloadConfig from "@/payload.config";

import API from "@/services/api";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const queryClient = new QueryClient();
  const payload = await getPayload({ config: payloadConfig });

  const stories = await payload.find({
    collection: "stories",
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
          where: {},
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
            <MapContainer stories={stories.docs} />
          </Suspense>
        </main>
      </ClientProviders>
    </HydrationBoundary>
  );
}
