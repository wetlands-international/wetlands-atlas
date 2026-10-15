import { CollectionConfig } from "payload";

import { READ_ONLY_COLLECTION_DESCRIPTION, ReadOnlyAccessControl } from "@/cms/access/read-only";

export const IndicatorDatas: CollectionConfig = {
  slug: "indicator-data",
  admin: {
    description: READ_ONLY_COLLECTION_DESCRIPTION,
    defaultColumns: ["id", "indicator", "location"],
  },
  access: ReadOnlyAccessControl,
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
