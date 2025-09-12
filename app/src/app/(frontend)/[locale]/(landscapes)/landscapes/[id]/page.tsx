import { Suspense } from "react";

import { Metadata } from "next";

import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";

import { getLandscapeById } from "@/app/(frontend)/[locale]/(landscapes)/landscapes/[id]/actions";

import { LandscapesIdArticle } from "@/containers/landscapes/[id]/article";
import { LandscapeChartContainer } from "@/containers/landscapes/[id]/chart";
import { LandscapesIdHeader } from "@/containers/landscapes/[id]/header";
import { LandscapeMapContainer } from "@/containers/landscapes/[id]/map";

export type LandscapesIdPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: LandscapesIdPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const { isEnabled: isDraftMode } = await draftMode();
    const landscape = await getLandscapeById(id, isDraftMode);

    return {
      title: landscape.name,
      description: convertLexicalToPlaintext({
        data: landscape.description,
      }),
    };
  } catch (error) {
    console.error("Error fetching landscape:", error);
    notFound();
  }
}

export default async function LandscapesIdPage({ params }: LandscapesIdPageProps) {
  const { id } = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  const landscape = await getLandscapeById(id, isDraftMode);

  if (!landscape || (!isDraftMode && !landscape.published)) {
    notFound();
  }

  return (
    <>
      <aside className="z-10 w-xl shrink-0">
        <LandscapesIdHeader {...landscape} />
        <LandscapesIdArticle {...landscape} />
      </aside>

      <Suspense>
        <div className="sticky top-0 left-0 flex h-svh w-full">
          <LandscapeMapContainer {...landscape} />
          <LandscapeChartContainer {...landscape} />
        </div>
      </Suspense>
    </>
  );
}
