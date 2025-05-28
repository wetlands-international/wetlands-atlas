import { CollectionConfig } from "payload";

// This entity will be seeded manually and is it not intended to be changed manually
export const IndicatorWidgets: CollectionConfig = {
  slug: "indicator-widgets",
  admin: {
    defaultColumns: ["id", "indicator", "location"],
  },
  access: {
    read: () => true,
    // TODO : uncomment when data importing is implemented
    //create: () => false,
    //update: () => false,
    //delete: ()=> false,
  },
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
