import type { FieldHook } from "payload";

import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";

import slugify from "slugify";

const slugifyOptions = {
  lower: true,
  strict: true,
  replacement: "-",
  trim: true,
};

const formatSlug =
  (fallback: string): FieldHook =>
  ({ operation, value, originalDoc, data }) => {
    if (typeof value === "string") {
      return slugify(value, slugifyOptions);
    }

    if (operation === "create") {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback];

      if (typeof fallbackData === "object" && convertLexicalToPlaintext({ data: fallbackData })) {
        return slugify(convertLexicalToPlaintext({ data: fallbackData }));
      }

      if (typeof fallbackData === "string") {
        return slugify(fallbackData, slugifyOptions);
      }
    }

    return value;
  };

export const formatCompoundSlug =
  (field1: string, field2: string): FieldHook =>
  ({ operation, value, siblingData }) => {
    if (operation === "create" || operation === "update") {
      const slugData = `${siblingData[field1]}_${siblingData[field2]}`;
      return slugify(slugData, slugifyOptions); // TODO doesn't seem to work for updates
    }

    return value;
  };

export default formatSlug;
