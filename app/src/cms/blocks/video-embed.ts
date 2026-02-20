import { Block } from "payload";

export const VideoEmbedBlock: Block = {
  slug: "videoEmbed",
  labels: {
    singular: "Video Embed",
    plural: "Video Embeds",
  },
  fields: [
    {
      type: "select",
      name: "type",
      label: "Video Type",
      required: true,
      defaultValue: "youtube",
      options: [{ label: "YouTube", value: "youtube" }],
    },
    {
      name: "source",
      type: "text",
      label: "Video URL",
      required: true,
      admin: {
        description: "YouTube embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)",
      },
    },
    {
      name: "title",
      type: "text",
      label: "Video Title",
      required: true,
      localized: true,
      admin: {
        description: "Accessible title for the video iframe",
      },
    },
  ],
};
