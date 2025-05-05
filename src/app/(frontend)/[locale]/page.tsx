import { Categories } from "@/containers/categories";
import { Indicators } from "@/containers/indicators";
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
    <>
      {/* <Hero /> */}
      <Categories />
      <Indicators />
    </>
  );
}
