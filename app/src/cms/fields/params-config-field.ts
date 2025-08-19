import { Field } from "payload";

export const ParamsConfigField: Field = {
  name: "params_config",
  label: "Dynamic parameters",
  type: "json",
  required: true,
  jsonSchema: {
    // The way the following two properties are defined is required to indicate that we will use a local schema
    uri: "a://b/params_config.json", // required
    fileMatch: ["a://b/params_config.json"], // required
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          key: {
            type: "string",
          },
          default: {
            type: ["string", "number", "boolean", "object", "array", "null"],
          },
        },
        required: ["key", "default"],
        additionalProperties: false,
      },
    },
  },
  defaultValue: [
    {
      key: "opacity",
      default: 1,
    },
    {
      key: "visibility",
      default: true,
    },
  ],
  admin: {
    description:
      'Describe parameters to inject into the Rendering field above. It is an array of objects containing two keys: "key" and "default". "key" is the name of the parameter. "default" is its default value, which may be overwritten by the application.',
  },
};
