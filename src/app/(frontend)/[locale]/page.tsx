import { prefetch } from "@/app/(frontend)/[locale]/cache";
import { Categories } from "@/containers/categories";
import { Indicators } from "@/containers/indicators";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
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
  const { queryClient } = await prefetch();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-20">
        {/* <Hero /> */}
        <Categories />
        <Indicators />
      </div>
    </HydrationBoundary>
  );
}
