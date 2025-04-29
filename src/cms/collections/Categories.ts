import { slugField } from "@/cms/fields/slug";
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
};
