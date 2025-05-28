import { Suspense } from "react";

import { ClientProviders } from "@/app/(frontend)/[locale]/(app)/providers";

import { StoryMapContainer } from "@/containers/stories/[id]/map";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      <main className="relative flex">
        <aside className="z-10 w-xl shrink-0">{children}</aside>

        <Suspense>
          <div className="sticky top-0 left-0 flex h-svh w-full">
            <StoryMapContainer />
          </div>
        </Suspense>
      </main>
    </ClientProviders>
  );
}
