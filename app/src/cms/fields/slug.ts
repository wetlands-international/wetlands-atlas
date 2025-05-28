import type { Field } from "payload";

import formatSlug from "@/cms/utils/formatSlug";

type Slug = (fieldName?: string, fieldToUse?: string, overrides?: Partial<Field>) => Field;

export const SlugIDField: Slug = (fieldName = "id", baseFieldToUse = "name") => {
  return {
    name: fieldName,
    type: "text",
    index: true,
    unique: true,
    required: true,
    admin: {
      position: "sidebar",
      readOnly: true,
      description: `This field is automatically generated from the name ${baseFieldToUse}. It is usually used to create a URL-friendly version of the name.`,
    },
    hooks: {
      beforeValidate: [formatSlug(baseFieldToUse)],
    },
  };
};
