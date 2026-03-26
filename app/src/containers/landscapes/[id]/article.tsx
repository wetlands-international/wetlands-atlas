import { RichText } from "@payloadcms/richtext-lexical/react";

import { LandscapeImage } from "@/containers/landscapes/[id]/image";
import { ScrollIndicator } from "@/containers/landscapes/[id]/scroll-indicator";
import { LandscapeSteps } from "@/containers/landscapes/[id]/steps";

import { Landscape } from "@/payload-types";

export const LandscapesIdArticle = (props: Landscape) => {
  const imageUrl = typeof props.cover === "object" ? props.cover?.url : undefined;

  return (
    <article className="px-11">
      <div className="relative flex min-h-[calc(100svh_-_theme(spacing.24))] flex-col">
        <h1 className="font-display animate-in fade-in slide-in-from-top-10 text-6xl font-bold text-blue-300 2xl:text-7xl">
          <RichText data={props.name} />
        </h1>
        <RichText
          className="animate-in fade-in slide-in-from-top-10 my-4 text-lg text-gray-400"
          data={props.description}
        />
        {imageUrl ? <LandscapeImage imageUrl={imageUrl} /> : null}
      </div>

      <ScrollIndicator />
      <LandscapeSteps {...props} />
    </article>
  );
};
