import { revalidatePath } from "next/cache";

import { CollectionConfig } from "payload";

import { PublicAccessControl } from "@/cms/access/public";
import { SlugIDField } from "@/cms/fields/slug";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "name", "order"],
  },
  defaultSort: ["order"],
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
      label: "Description",
      type: "textarea",
      localized: true,
    },
    {
      name: "order",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      localized: false,
    },
    {
      name: "defaultIndicators",
      label: "Default Indicators",
      type: "relationship",
      relationTo: "indicators",
      hasMany: true,
      filterOptions: (args) => ({
        category: {
          equals: args?.id,
        },
        layers: { exists: true },
      }),
      admin: {
        description:
          "Define the default indicators for this category. These will be activated by default when a user selects this category. Only indicators that belongs to this category and has layers can be selected.",
      },
    },
    {
      name: "indicators",
      label: "Related indicators",
      type: "join",
      collection: "indicators",
      on: "category",
      admin: {
        allowCreate: false,
      },
    },
    {
      name: "landscapes",
      label: "Related Landscapes",
      type: "join",
      collection: "landscapes",
      on: "category",
      admin: {
        allowCreate: false,
      },
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
