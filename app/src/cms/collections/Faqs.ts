import { CollectionConfig } from "payload";

import { PublicAccessControl } from "@/cms/access/public";
import { SlugIDField } from "@/cms/fields/slug";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "answer", "order"],
  },
  defaultSort: ["order"],
  access: PublicAccessControl,
  fields: [
    SlugIDField("id", "question"),
    {
      name: "question",
      label: "Question",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "answer",
      label: "Answer",
      type: "richText",
      localized: true,
      required: true,
    },
    {
      name: "order",
      type: "number",
      required: true,
      min: 0,
    },
  ],
};
