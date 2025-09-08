import { Suspense } from "react";

import { Metadata } from "next";

import { Command } from "cmdk";
import { getTranslations } from "next-intl/server";

import { Header } from "@/containers/header";
import { Landscapes } from "@/containers/landscapes";
import { LandscapesFilters } from "@/containers/landscapes/filters";
import { LandscapesSearch } from "@/containers/landscapes/search";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("landscapes.title"),
    description: t("landscapes.description"),
  };
}

export default async function LandscapesPage() {
  return (
    <>
      <aside className="absolute top-0 left-0 z-10 w-full max-w-md">
        <Command className="flex w-full flex-col gap-2.5 p-4" shouldFilter={false}>
          <Header>
            <Suspense>
              <LandscapesSearch />
            </Suspense>
          </Header>

          <Suspense>
            <LandscapesFilters>
              <p className="text-background bg-foreground p-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
                ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis,
                architecto ut veritatis eius exercitationem aperiam perspiciatis qui doloribus
                debitis?
              </p>
            </LandscapesFilters>
          </Suspense>
        </Command>
      </aside>

      <aside className="absolute bottom-12 left-4 z-10 flex w-[calc(100%_-_theme(spacing.8))] flex-col gap-2.5">
        <Landscapes />
      </aside>
    </>
  );
}
