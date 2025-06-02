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

import { BLOCK_LOCATION_COORDINATES } from "@/cms/blocks/location";
import { MapField } from "@/cms/fields/map";
import { SlugIDField } from "@/cms/fields/slug";

export const Stories: CollectionConfig = {
  slug: "stories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "title", "insight", "published"],
  },
  defaultSort: ["-createdAt"],
  //access: {}, // By default, users with an account have all permissions https://payloadcms.com/docs/access-control/overview#default-access-control
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
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      hasMany: false,
    },
    {
      name: "location",
      type: "blocks",
      blocks: [BLOCK_LOCATION_COORDINATES],
      required: true,
      maxRows: 1,
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: false,
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
