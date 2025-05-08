import { revalidatePath } from "next/cache";

import { CollectionConfig } from "payload";

import { slugField } from "@/cms/fields/slug";

export const Categories: CollectionConfig = {
  slug: "categories",
  fields: [
    slugField(),
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
      localized: true,
    },
  ],
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        revalidatePath("/", "layout");
      },
    ],
  },
};
