import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { Header } from "@/containers/header";
import { Stories } from "@/containers/stories";

import { Search } from "@/components/ui/search";

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
      <aside className="absolute top-4 left-4 z-10 flex w-full max-w-md flex-col gap-2.5">
        <Header>
          <Search />
        </Header>
      </aside>

      <aside className="absolute bottom-12 left-4 z-10 flex w-[calc(100%_-_theme(spacing.8))] flex-col gap-2.5">
        <Stories />
      </aside>
    </>
  );
}
