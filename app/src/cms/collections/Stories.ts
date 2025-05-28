import { revalidatePath } from "next/cache";

import { CollectionConfig } from "payload";

import { slugField } from "@/cms/fields/slug";

export const Stories: CollectionConfig = {
  slug: "stories",
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
      required: true,
      localized: true,
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      localized: false,
    },
  ],
  access: {
    read: () => true,
  },
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
