import { CollectionConfig } from "payload";
import { SlugIDField } from "@/cms/fields/slug";
import { BLOCK_LOCATION_COORDINATES } from "@/cms/blocks/location";

export const Locations: CollectionConfig = {
  slug: "locations",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["slug_id", "name", "type", "location_type"],
  },
  defaultSort: ["name"],
  access: {
    read: () => true,
  },
  fields: [
    SlugIDField("slug_id"),
    {
      name: "name",
      type: "text",
      localized: true,
      unique: true,
      required: true,
    },
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "Coordinates",
          value: "coordinates",
        },
      ],
      required: false, // TODO change to required when type has been decided on possible values
    },
    {
      name: "coordinates",
      type: "blocks",
      blocks: [BLOCK_LOCATION_COORDINATES],
      required: false, // TODO change to required when type has been decided on possible values
      maxRows: 1,
    },
  ],
};
