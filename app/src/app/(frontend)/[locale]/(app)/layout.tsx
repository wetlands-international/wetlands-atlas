import { Suspense } from "react";

import { ClientProviders } from "@/app/(frontend)/[locale]/(app)/providers";

import { Language } from "@/containers/language";
import { MapContainer } from "@/containers/map";
import { Toggle } from "@/containers/toogle";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      <main className="relative flex h-[100svh] flex-col overflow-hidden">
        {children}

        <div className="pointer-events-none fixed top-4 right-4 z-10 flex items-center gap-2">
          <Language />
          <Toggle />
        </div>

        <Suspense>
          <MapContainer />
        </Suspense>
      </main>
    </ClientProviders>
  );
}
