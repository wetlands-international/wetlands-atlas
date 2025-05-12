import { Suspense } from "react";

import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { ClientProviders } from "@/app/(frontend)/[locale]/providers";

import { Indicators } from "@/containers/indicators";
import { MapContainer } from "@/containers/map";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("home.title"),
    description: t("home.description"),
  };
}

export default async function HomePage() {
  return (
    <ClientProviders>
      <main className="relative flex h-[100svh] flex-col gap-20 overflow-hidden">
        <aside className="absolute top-24 left-4 z-10 flex w-full max-w-md flex-col gap-10">
          {/* <Hero /> */}
          <Indicators />
        </aside>

        <Suspense>
          <MapContainer />
        </Suspense>
      </main>
    </ClientProviders>
  );
}
