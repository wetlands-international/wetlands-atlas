import { Suspense } from "react";

import { Metadata } from "next";

import { notFound } from "next/navigation";

import { getStoryId } from "@/app/(frontend)/[locale]/(stories)/stories/[id]/actions";

import { StoriesIdArticle } from "@/containers/stories/[id]/article";
import { StoryChartContainer } from "@/containers/stories/[id]/chart";
import { StoriesIdHeader } from "@/containers/stories/[id]/header";
import { StoryMapContainer } from "@/containers/stories/[id]/map";

export type StoriesIdPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: StoriesIdPageProps): Promise<Metadata> {
  try {
    const { id } = await params;

    const story = await getStoryId(id);

    return {
      title: story.name,
      description: story.description,
    };
  } catch (error) {
    console.error("Error fetching story:", error);
    notFound();
  }
}

export default async function StoriesIdPage({ params }: StoriesIdPageProps) {
  const { id } = await params;
  const story = await getStoryId(id);

  if (!story) {
    notFound();
  }

  return (
    <>
      <aside className="z-10 w-xl shrink-0">
        <StoriesIdHeader {...story} />
        <StoriesIdArticle {...story} />
      </aside>

      <Suspense>
        <div className="sticky top-0 left-0 flex h-svh w-full">
          <StoryMapContainer {...story} />
          <StoryChartContainer {...story} />
        </div>
      </Suspense>
    </>
  );
}
