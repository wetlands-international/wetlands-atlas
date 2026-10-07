import type { CollectionConfig } from "payload";

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
    // Injected by the GCS plugin, which is only enabled in production. Declared here so the
    // schema is the same in every environment (the plugin merges its definition into this one).
    {
      name: "prefix",
      type: "text",
      defaultValue: "media/",
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
  ],
  upload: true,
};
