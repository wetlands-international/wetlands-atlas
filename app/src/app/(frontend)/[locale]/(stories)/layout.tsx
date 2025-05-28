import { Suspense } from "react";

import { ClientProviders } from "@/app/(frontend)/[locale]/(app)/providers";

import { MapContainer } from "@/containers/map";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      <main className="relative flex">
        <aside className="z-10 w-xl shrink-0">{children}</aside>

        <Suspense>
          <div className="sticky top-0 left-0 flex h-svh w-full">
            <MapContainer
              interactive={false}
              scrollZoom={false}
              doubleClickZoom={false}
              dragPan={false}
              dragRotate={false}
              touchPitch={false}
              touchZoomRotate={false}
            />
          </div>
        </Suspense>
      </main>
    </ClientProviders>
  );
}
