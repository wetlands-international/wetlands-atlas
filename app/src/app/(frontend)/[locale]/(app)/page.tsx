import { Suspense } from "react";

import { Metadata } from "next";

import { Command } from "cmdk";
import { getTranslations } from "next-intl/server";

import { Header } from "@/containers/header";
import { Indicators } from "@/containers/indicators";
import { IndicatorsList } from "@/containers/indicators/list";
import { Locations } from "@/containers/locations";
import { LocationsList } from "@/containers/locations/list";
import { LocationsSearch } from "@/containers/locations/search";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("home.title"),
    description: t("home.description"),
  };
}

export default async function AppPage() {
  return (
    <aside className="absolute top-4 left-4 z-10 w-full max-w-md">
      <Command className="flex w-full flex-col gap-2.5">
        <Header>
          <Suspense>
            <LocationsSearch />
          </Suspense>
        </Header>

        <Suspense>
          <div className="relative">
            <Locations>
              <LocationsList />
            </Locations>

            <Indicators>
              <IndicatorsList />
            </Indicators>
          </div>
        </Suspense>
      </Command>
    </aside>
  );
}
