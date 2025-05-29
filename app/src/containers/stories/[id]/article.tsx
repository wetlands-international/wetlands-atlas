import { StoryImage } from "@/containers/stories/[id]/image";
import { StorySteps } from "@/containers/stories/[id]/steps";

import { Story } from "@/payload-types";

export const StoriesIdArticle = (props: Story) => {
  return (
    <article className="px-11">
      <div className="flex min-h-[calc(100svh_-_theme(spacing.24))] flex-col">
        <h1 className="font-display animate-in fade-in slide-in-from-top-10 text-6xl font-bold text-blue-300 2xl:text-7xl">
          {props.name}
        </h1>
        <StoryImage />
      </div>

      <StorySteps {...props} />
    </article>
  );
};
