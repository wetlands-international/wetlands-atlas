import { Field } from "payload";

export const BBoxField: Field = {
  name: "bbox",
  label: "Bounding Box",
  type: "json",
  required: true,
  admin: {
    description:
      "The bounding box of the location, represented as an array of four numbers, representing two sets of coordinates (SW and NE).",
  },
  jsonSchema: {
    // The way the following two properties are defined is required to indicate that we will use a local schema
    uri: "a://b/bbox.json", // required
    fileMatch: ["a://b/bbox.json"], // required
    schema: {
      type: "object",
      properties: {
        bbox: {
          type: "array",
          items: {
            type: "number",
          },
          minItems: 4,
          maxItems: 4,
        },
      },
      required: ["bbox"],
      additionalProperties: false,
    },
  },
};
