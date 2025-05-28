import { revalidatePath } from "next/cache";

import { CollectionConfig } from "payload";

import { SlugIDField } from "@/cms/fields/slug";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "name"],
  },
  access: {
    read: () => true,
  },
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
      name: "stories",
      label: "Related Stories",
      type: "join",
      collection: "stories",
      on: "category",
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
