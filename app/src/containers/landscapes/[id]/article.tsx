import { RichText } from "@payloadcms/richtext-lexical/react";

import { LandscapeImage } from "@/containers/landscapes/[id]/image";
import { LandscapeSteps } from "@/containers/landscapes/[id]/steps";

import EmbeddedVideo from "@/components/embedded-video";

import { Landscape } from "@/payload-types";

export const LandscapesIdArticle = (props: Landscape) => {
  const embeddedVideo = props["embedded_video"]?.source ? props["embedded_video"] : null;
  const imageUrl = typeof props.cover === "object" ? props.cover?.url : undefined;

  return (
    <article className="px-11">
      <div className="flex min-h-[calc(100svh_-_theme(spacing.24))] flex-col">
        <h1 className="font-display animate-in fade-in slide-in-from-top-10 text-6xl font-bold text-blue-300 2xl:text-7xl">
          {props.name}
        </h1>
        <RichText
          className="animate-in fade-in slide-in-from-top-10 my-4 text-lg text-gray-400"
          data={props.description}
        />
        {embeddedVideo ? (
          <EmbeddedVideo src={embeddedVideo.source} title={embeddedVideo.title} />
        ) : imageUrl ? (
          <LandscapeImage imageUrl={imageUrl} />
        ) : null}
      </div>

      <LandscapeSteps {...props} />
    </article>
  );
};
