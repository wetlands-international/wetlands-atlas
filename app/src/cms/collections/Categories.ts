import { revalidatePath } from "next/cache";

import { CollectionConfig } from "payload";

import { PublicAccessControl } from "@/cms/access/public";
import { SlugIDField } from "@/cms/fields/slug";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "name"],
  },
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
      name: "cover",
      type: "upload",
      relationTo: "media",
      localized: false,
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
    {
      name: "defaultIndicators",
      label: "Default Indicators",
      type: "relationship",
      relationTo: "indicators",
      hasMany: true,
      admin: {
        description:
          "Define the default indicators for this category. These will be activated by default when a user selects this category.",
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
