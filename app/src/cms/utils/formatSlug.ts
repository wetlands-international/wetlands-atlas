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

export default formatSlug;
