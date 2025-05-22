import { Suspense } from "react";

import { ClientProviders } from "@/app/(frontend)/[locale]/(app)/providers";

import { MapContainer } from "@/containers/map";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      <main className="relative flex">
        {children}

        <Suspense>
          <div className="sticky top-0 left-0 flex h-svh w-full">
            <MapContainer />
          </div>
        </Suspense>
      </main>
    </ClientProviders>
  );
}
