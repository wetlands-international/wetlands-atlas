import type { CollectionConfig } from "payload";

import { EditorAccessControl } from "@/cms/access/editor";

export const Media: CollectionConfig = {
  slug: "media",
  access: EditorAccessControl,
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
