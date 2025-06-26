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
      name: "stories",
      label: "Related Stories",
      type: "join",
      collection: "stories",
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
