import { Suspense } from "react";

import { Metadata } from "next";

import { Command } from "cmdk";
import { getTranslations } from "next-intl/server";

import { Header } from "@/containers/header";
import { Stories } from "@/containers/stories";
import { StoriesFilters } from "@/containers/stories/filters";
import { StoriesSearch } from "@/containers/stories/search";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("stories.title"),
    description: t("stories.description"),
  };
}

export default async function StoriesPage() {
  return (
    <>
      <aside className="absolute top-0 left-0 z-10 w-full max-w-md">
        <Command className="flex w-full flex-col gap-2.5 p-4">
          <Header>
            <Suspense>
              <StoriesSearch />
            </Suspense>
          </Header>

          <Suspense>
            <div className="relative">
              <StoriesFilters>
                <p className="text-background">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
                  ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis,
                  architecto ut veritatis eius exercitationem aperiam perspiciatis qui doloribus
                  debitis?
                </p>
              </StoriesFilters>
            </div>
          </Suspense>
        </Command>
      </aside>

      <aside className="absolute bottom-12 left-4 z-10 flex w-[calc(100%_-_theme(spacing.8))] flex-col gap-2.5">
        <Stories />
      </aside>
    </>
  );
}
