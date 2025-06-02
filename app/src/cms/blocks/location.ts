import { Block } from "payload";

export const BLOCK_LOCATION_COORDINATES: Block = {
  slug: "location",
  fields: [
    {
      name: "latitude",
      type: "number",
      required: true,
      label: "Latitude",
      max: 90,
      min: -90,
    },
    {
      name: "longitude",
      type: "number",
      required: true,
      label: "Longitude",
      max: 180,
      min: -180,
    },
  ],
};
