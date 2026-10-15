import { CollectionConfig, TextFieldSingleValidation } from "payload";

import { text } from "payload/shared";

import { PublicAccessControl } from "@/cms/access/public";

const validateColor: TextFieldSingleValidation = (value, args) => {
  if (typeof value === "string" && !/^#[0-9A-Fa-f]{6}$/.test(value)) {
    return "The color must be a hexadecimal code such as #ADBC3D.";
  }

  return text(value, args);
};

export const Regions: CollectionConfig = {
  slug: "regions",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "name", "order"],
  },
  defaultSort: ["order"],
  access: PublicAccessControl, // TODO revise permissions and uncomment later
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
