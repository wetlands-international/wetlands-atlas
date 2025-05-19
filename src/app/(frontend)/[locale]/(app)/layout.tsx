import { Suspense } from "react";

import { ClientProviders } from "@/app/(frontend)/[locale]/(app)/providers";

import { MapContainer } from "@/containers/map";
import { Toggle } from "@/containers/toogle";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      <main className="relative flex h-[100svh] flex-col overflow-hidden">
        {children}

        <Toggle />

        <Suspense>
          <MapContainer />
        </Suspense>
      </main>
    </ClientProviders>
  );
}
