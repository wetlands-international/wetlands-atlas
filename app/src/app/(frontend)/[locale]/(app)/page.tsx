import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { Header } from "@/containers/header";
import { Indicators } from "@/containers/indicators";

import { Search } from "@/components/ui/search";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("home.title"),
    description: t("home.description"),
  };
}

export default async function AppPage() {
  return (
    <aside className="absolute top-4 left-4 z-10 flex w-full max-w-md flex-col gap-2.5">
      <Header>
        <Search />
      </Header>

      <div className="animate-in fade-in slide-in-from-left-25 duration-300">
        <Indicators />
      </div>
      {/* <Hero /> */}
    </aside>
  );
}
