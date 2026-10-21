import { CollectionConfig, TextFieldSingleValidation } from "payload";

import { text } from "payload/shared";

import { READ_ONLY_COLLECTION_DESCRIPTION, ReadOnlyAccessControl } from "@/cms/access/read-only";

const validateColor: TextFieldSingleValidation = (value, args) => {
  if (typeof value === "string" && !/^#[0-9A-Fa-f]{6}$/.test(value)) {
    return "The color must be a hexadecimal code such as #ADBC3D.";
  }

  return text(value, args);
};

export const Regions: CollectionConfig = {
  slug: "regions",
  admin: {
    description: READ_ONLY_COLLECTION_DESCRIPTION,
    useAsTitle: "name",
    defaultColumns: ["id", "name", "order", "published"],
  },
  defaultSort: ["order"],
  access: ReadOnlyAccessControl,
  fields: [
    {
      name: "id",
      type: "text",
      index: true,
      unique: true,
      required: true,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "name",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "introTitle",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "introDescription",
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "color",
      type: "text",
      required: true,
      validate: validateColor,
    },
    {
      name: "order",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description:
          "An unpublished region is hidden from the public view, but its landscapes are still shown on the global map.",
      },
    },
    {
      name: "categories",
      label: "Related categories",
      type: "join",
      collection: "categories",
      on: "region",
      admin: {
        allowCreate: false,
      },
    },
  ],
};
