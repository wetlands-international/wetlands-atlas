import { revalidatePath } from "next/cache";

import { CollectionConfig } from "payload";

import { SlugIDField } from "@/cms/fields/slug";

export const Stories: CollectionConfig = {
  slug: "stories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["slug_id", "title", "insight", "published"],
  },
  defaultSort: ["-createdAt"],
  access: {
    // TODO: give proper access control
    read: () => true,
  },
  fields: [
    SlugIDField("slug_id"),
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
      name: "published",
      type: "checkbox",
      defaultValue: false,
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
