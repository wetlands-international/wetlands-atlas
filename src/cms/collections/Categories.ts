import { slugField } from "@/cms/fields/slug";
import { revalidateTag } from "next/cache";
// import { revalidateTag } from "next/cache";
import { CollectionConfig } from "payload";

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
        revalidateTag("categories");
      },
    ],
  },
};
