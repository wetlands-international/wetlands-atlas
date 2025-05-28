import { CollectionConfig } from "payload";

export const STORY_STEP_TYPE = {
  INTRO: "INTRO",
  MAP: "MAP",
};

// TODO Steps type need to be figured out, so it will probably need more fields and more complex validation
// of those fields depending on the type of step
// TODO have a more complex validation for the step type, in order to give a more user friendly error message when order is duplicate
export const StorySteps: CollectionConfig = {
  slug: "story-steps",
  indexes: [{ unique: true, fields: ["story", "order"] }], // to ensure no duplicate steps for the same story with the same order
  admin: {
    useAsTitle: "title",
    hidden: true, //These should be created only from the corresponding Story edit page
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Description",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media", // Assuming you have a media collection
      required: false,
      label: "Image",
    },
    {
      name: "order",
      type: "number",
      required: true,
      label: "Order",
      min: 1,
    },
    {
      name: "story",
      type: "relationship",
      relationTo: "stories",
      hasMany: false,
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      label: "Type",
      options: [
        {
          label: "Intro",
          value: STORY_STEP_TYPE.INTRO,
        },
        {
          label: "Map",
          value: STORY_STEP_TYPE.MAP,
        },
      ],
    },
  ],
};
