import { Field } from "payload";

export const LegendConfigField: Field = {
  name: "legend_config",
  type: "json",
  required: true,
  defaultValue: {
    type: "basic",
    items: [
      {
        color: "#000000",
        value: "value",
      },
    ],
  },
  jsonSchema: {
    // The way the following two properties are defined is required to indicate that we will use a local schema
    uri: "a://b/legend_config.json", // required
    fileMatch: ["a://b/legend_config.json"], // required
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["basic", "choropleth", "gradient"],
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              color: {
                type: "string",
              },
              value: {
                type: ["string", "number"],
              },
            },
            required: ["color"],
            additionalProperties: false,
          },
        },
      },
      required: ["type", "items"],
    },
  },
  admin: {
    description:
      'Describe how to render the legend of the layer. It is an object containing two keys: "type" and "items". "type" is the type of legend. "items" is an array of objects containing two keys: "color" and "value". "color" is the color of the item. "value" is the value associated with the color. The value may be a string or a number.',
  },
};
