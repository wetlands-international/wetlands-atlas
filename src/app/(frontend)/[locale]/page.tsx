import { Categories } from "@/containers/categories";
import { Indicators } from "@/containers/indicators";
import { MapContainer } from "@/containers/map";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("home.title"),
    description: t("home.description"),
  };
}

export default async function HomePage() {
  return (
    <main className="relative flex h-[calc(100svh_-_theme(spacing.16))] flex-col gap-20 overflow-hidden">
      <aside className="bg-background absolute top-0 left-0 z-10 flex h-screen w-full max-w-lg flex-col gap-10 p-4">
        {/* <Hero /> */}
        <Categories />
        <Indicators />
      </aside>

      <MapContainer />
    </main>
  );
}
