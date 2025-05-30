import { revalidatePath } from "next/cache";

import { CollectionConfig } from "payload";

import { BLOCK_LOCATION_COORDINATES } from "@/cms/blocks/location";
import { SlugIDField } from "@/cms/fields/slug";

export const Stories: CollectionConfig = {
  slug: "stories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "title", "insight", "published"],
  },
  defaultSort: ["-createdAt"],
  //access: {}, // By default, users with an account have all permissions https://payloadcms.com/docs/access-control/overview#default-access-control
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
      name: "location",
      type: "blocks",
      blocks: [BLOCK_LOCATION_COORDINATES],
      required: true,
      maxRows: 1,
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
