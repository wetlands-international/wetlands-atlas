/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidatePath } from "next/cache";

import { CollectionConfig } from "payload";

import {
  BoldFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical";

import { PublicAccessControl } from "@/cms/access/public";
import { MapField } from "@/cms/fields/map";
import { SlugIDField } from "@/cms/fields/slug";
import { storiesReadLocationCriteriaExtension } from "@/cms/hooks/story-read-location-criteria-extension";

const validateEmbeddedVideoSource = (value: any, opts: any) => {
  const { embedded_video } = opts.data;
  if (embedded_video.type && !embedded_video.source) {
    return "Embedded video source is required.";
  }
  return true;
};

const validateEmbeddedVideoTitle = (value: any, opts: any) => {
  const { embedded_video } = opts.data;
  if (embedded_video.type && !embedded_video.title) {
    return "Embedded video title is required.";
  }
  return true;
};

export const Stories: CollectionConfig = {
  slug: "stories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "title", "insight", "published"],
  },
  defaultSort: ["-createdAt"],
  access: PublicAccessControl, // TODO revise permissions and uncomment later
  fields: [
    SlugIDField(),
    {
      name: "name",
      type: "text",
      localized: true,
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      localized: false,
    },
    {
      type: "group",
      name: "embedded_video",
      label: "Embedded video",
      required: false,

      fields: [
        {
          type: "select",
          name: "type",
          options: [{ label: "Youtube", value: "youtube" }],
        },
        {
          name: "source",
          type: "text",
          localized: false,
          validate: validateEmbeddedVideoSource,
        },
        {
          name: "title",
          type: "text",
          localized: true,
          validate: validateEmbeddedVideoTitle,
        },
      ],
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      hasMany: false,
    },
    {
      name: "location",
      type: "point",
      required: true,
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Uncheck to hide this story from the public view.",
      },
    },
    {
      type: "array",
      name: "steps",
      fields: [
        {
          type: "radio",
          name: "type",
          required: true,
          options: [
            {
              label: "Map",
              value: "map",
            },
            {
              label: "Chart",
              value: "chart",
            },
          ],
        },
        {
          type: "richText",
          name: "sidebar",
          localized: true,
          required: true,
          editor: lexicalEditor({
            features: () => [
              InlineToolbarFeature(),
              HeadingFeature({
                enabledHeadingSizes: ["h2", "h3"],
              }),
              UnorderedListFeature(),
              OrderedListFeature(),
              BoldFeature(),
              ItalicFeature(),
              LinkFeature(),
            ],
          }),
        },
        MapField({
          required: true,
          admin: {
            condition: (_, siblingData) => {
              return siblingData.type === "map";
            },
          },
        }),
        {
          type: "json",
          name: "chart",
          required: true,
          admin: {
            condition: (_, siblingData) => {
              return siblingData.type === "chart";
            },
          },
        },
      ],
    },
  ],
  hooks: {
    beforeOperation: [storiesReadLocationCriteriaExtension],
    afterChange: [
      async (props) => {
        if (props.operation === "update") {
          const { doc } = props;
          revalidatePath(`/stories/${doc.id}`, "page");
        }
        revalidatePath("/stories", "layout");
      },
    ],
  },
};
