import type { FieldHook } from "payload";

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

      if (fallbackData && typeof fallbackData === "string") {
        console.log(`Slugify fallback data: ${fallbackData} from field: ${fallback}`);
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
      console.log(slugify(siblingData[field1], slugifyOptions));
      return slugify(slugData, slugifyOptions); // TODO doesn't seem to work for updates
    }

    return value;
  };

export default formatSlug;
