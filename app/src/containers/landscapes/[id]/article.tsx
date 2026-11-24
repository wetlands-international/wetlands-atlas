import { RichText } from "@payloadcms/richtext-lexical/react";

import { LandscapeImage } from "@/containers/landscapes/[id]/image";
import { ScrollIndicator } from "@/containers/landscapes/[id]/scroll-indicator";
import { LandscapeSteps } from "@/containers/landscapes/[id]/steps";

import { Landscape } from "@/payload-types";

export const LandscapesIdArticle = (props: Landscape) => {
  const imageUrl = typeof props.cover === "object" ? props.cover?.url : undefined;

  return (
    // In portrait, the page's scroll container, below the visual
    <article className="px-4 sm:px-6 lg:px-11 portrait:min-h-0 portrait:flex-1 portrait:overflow-y-auto">
      {/* In portrait, right below the visual, without filling the screen */}
      <div className="relative flex min-h-[calc(100svh_-_theme(spacing.24))] flex-col portrait:min-h-0 portrait:pt-6">
        <h1 className="font-display animate-in fade-in slide-in-from-top-10 text-3xl font-bold text-blue-300 lg:text-6xl 2xl:text-7xl">
          <RichText data={props.name} />
        </h1>
        <RichText
          className="animate-in fade-in slide-in-from-top-10 my-4 text-base text-gray-400 lg:text-lg"
          data={props.description}
        />
        {imageUrl ? <LandscapeImage imageUrl={imageUrl} /> : null}
      </div>

      <ScrollIndicator />
      <LandscapeSteps {...props} />
    </article>
  );
};
