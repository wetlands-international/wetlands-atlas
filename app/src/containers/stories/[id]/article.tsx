import { StoryImage } from "@/containers/stories/[id]/image";
import { StorySteps } from "@/containers/stories/[id]/steps";

import { Story } from "@/payload-types";

export const StoriesIdArticle = (props: Story) => {
  return (
    <article className="px-11 py-10">
      <h1 className="font-display animate-in fade-in slide-in-from-top-10 text-7xl font-bold text-blue-300">
        {props.name}
      </h1>

      <StoryImage />
      <StorySteps {...props} />
    </article>
  );
};
