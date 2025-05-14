import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { Playground } from "@/containers/playground";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("playground.title"),
    description: t("playground.description"),
  };
}

export default async function PlaygroundPage() {
  return <Playground />;
}
