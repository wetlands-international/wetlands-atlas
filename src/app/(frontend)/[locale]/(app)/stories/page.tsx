import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { Header } from "@/containers/header";

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
    <aside className="absolute top-4 left-4 z-10 flex w-full max-w-md flex-col gap-2.5">
      <Header>
        <Search />
      </Header>
    </aside>
  );
}
