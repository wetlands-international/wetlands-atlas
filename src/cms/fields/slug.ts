import type { Field } from "payload";

import formatSlug from "@/cms/utils/formatSlug";

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field;

export const slugField: Slug = (fieldToUse = "name") => {
  return {
    name: "id",
    type: "text",
    index: true,
    unique: true,
    required: true,
    admin: {
      position: "sidebar",
      readOnly: true,
      description:
        "This field is automatically generated from the name field. It is used to create a URL-friendly version of the name.",
    },
    hooks: {
      beforeValidate: [formatSlug(fieldToUse)],
    },
  };
};
