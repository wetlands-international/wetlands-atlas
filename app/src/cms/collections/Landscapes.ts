import { revalidatePath } from "next/cache";

import { CollectionConfig } from "payload";

import {
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";

import { PublicAccessControl } from "@/cms/access/public";
import { VideoEmbedBlock } from "@/cms/blocks/video-embed";
import { ChartField } from "@/cms/fields/chart-field";
import { MapField } from "@/cms/fields/map";
import { SlugIDField } from "@/cms/fields/slug";
import { landscapesReadLocationCriteriaExtension } from "@/cms/hooks/landscapes-read-location-criteria-extension";
import { env } from "@/env";

export const Landscapes: CollectionConfig = {
  slug: "landscapes",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "title", "insight", "published"],
    preview: ({ id }) => {
      const encodedParams = new URLSearchParams({
        path: `/landscapes/${String(id)}`,
        previewSecret: env.PREVIEW_SECRET,
      });

      return `/api/preview?${encodedParams.toString()}`;
    },
  },
  defaultSort: ["-createdAt"],
  access: PublicAccessControl, // TODO revise permissions and uncomment later
  fields: [
    SlugIDField(),
    {
      name: "name",
      type: "richText",
      localized: true,
      required: true,
      unique: true,
      editor: lexicalEditor({
        features: () => [BoldFeature(), ItalicFeature(), InlineToolbarFeature()],
      }),
    },
    {
      name: "description",
      type: "richText",
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
      name: "geoLocation",
      type: "point",
      required: true,
    },
    {
      name: "location",
      type: "relationship",
      relationTo: "locations",
      hasMany: false,
      required: false,
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Uncheck to hide this landscape from the public view.",
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
              FixedToolbarFeature(),
              HeadingFeature({
                enabledHeadingSizes: ["h2", "h3"],
              }),
              UnorderedListFeature(),
              OrderedListFeature(),
              BoldFeature(),
              ItalicFeature(),
              LinkFeature(),
              UploadFeature(),
              BlocksFeature({
                blocks: [VideoEmbedBlock],
              }),
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
          hooks: {
            beforeChange: [
              ({ value, siblingData }) => {
                if (siblingData.type !== "map") return null;

                return value;
              },
            ],
          },
        }),
        ChartField({
          required: true,
          admin: {
            condition: (_, siblingData) => {
              return siblingData.type === "chart";
            },
          },
          hooks: {
            beforeChange: [
              ({ value, siblingData }) => {
                if (siblingData.type !== "chart") return null;

                return value;
              },
            ],
          },
        }),
      ],
    },
  ],
  hooks: {
    beforeOperation: [landscapesReadLocationCriteriaExtension],
    afterChange: [
      async (props) => {
        if (props.operation === "update") {
          const { doc } = props;
          revalidatePath(`/landscapes/${doc.id}`, "page");
        }
        revalidatePath("/landscapes", "layout");
      },
    ],
  },
};
