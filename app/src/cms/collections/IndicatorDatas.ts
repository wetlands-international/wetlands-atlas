import { CollectionConfig } from "payload";

import { PublicAccessControl } from "@/cms/access/public";

// This entity will be seeded manually and is it not intended to be changed manually
export const IndicatorDatas: CollectionConfig = {
  slug: "indicator-data",
  admin: {
    defaultColumns: ["id", "indicator", "location"],
  },
  access: PublicAccessControl, // TODO revise permissions and uncomment later
  fields: [
    {
      name: "id",
      type: "text",
      unique: true,
    },
    {
      name: "indicator",
      type: "relationship",
      relationTo: "indicators",
      hasMany: false,
      required: true,
    },
    {
      name: "location",
      type: "relationship",
      relationTo: "locations",
      hasMany: false,
      required: true,
    },
    {
      name: "data",
      type: "json",
      required: true,
      defaultValue: {},
    },
    {
      name: "labels",
      type: "json",
      required: true,
      defaultValue: {},
      localized: true,
    },
  ],
};
