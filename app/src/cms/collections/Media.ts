import type { CollectionConfig } from "payload";

import { nanoid } from "nanoid";

import { PublicAccessControl } from "@/cms/access/public";

export const Media: CollectionConfig = {
  slug: "media",
  access: PublicAccessControl, // TODO revise permissions and uncomment later
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    imageSizes: [
      {
        name: "avatar",
        width: 100,
        height: 100,
      },
      {
        name: "thumbnail",
        width: 500,
      },
    ],
  },
  hooks: {
    beforeOperation: [
      async (req) => {
        if (req.operation === "create") {
          if (req.req.file) req.req.file.name = nanoid();
        }
      },
    ],
  },
};
