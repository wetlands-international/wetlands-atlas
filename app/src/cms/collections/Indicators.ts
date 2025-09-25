import { revalidatePath } from "next/cache";

import { CollectionConfig } from "payload";

import {
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical";

import { PublicAccessControl } from "@/cms/access/public";
import { NumberBlock } from "@/cms/blocks/number";
import { SlugIDField } from "@/cms/fields/slug";

export const Indicators: CollectionConfig = {
  slug: "indicators",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["slug_id", "name", "category", "layers"],
  },
  access: PublicAccessControl, // TODO revise permissions and uncomment later
  defaultSort: ["name"],
  fields: [
    SlugIDField(),
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "richText",
      localized: true,
      admin: {},
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
      required: true,
    },
    {
      name: "layers",
      type: "join",
      collection: "layers",
      on: "indicators",
      admin: {
        defaultColumns: ["id", "name"],
      },
    },
    {
      name: "widget",
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        features: () => [
          FixedToolbarFeature(),
          BoldFeature(),
          LinkFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          BlocksFeature({
            inlineBlocks: [NumberBlock],
          }),
        ],
      }),
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        revalidatePath("/", "layout");
      },
    ],
  },
};
