import { CollectionConfig } from "payload";

import { DevOnlyAccessControl } from "@/cms/utils/dev-only-access-control";

// This entity will be seeded manually and is it not intended to be changed manually
export const IndicatorDatas: CollectionConfig = {
  slug: "indicator-data",
  admin: {
    defaultColumns: ["id", "indicator", "location"],
  },
  access: DevOnlyAccessControl,
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
  ],
};
