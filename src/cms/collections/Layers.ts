import { slugField } from "@/cms/fields/slug";
import { CollectionConfig } from "payload";

export const Layers: CollectionConfig = {
  slug: "layers",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "name"],
  },
  defaultSort: ["name"],
  fields: [
    slugField(),
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "config",
      label: "Rendering",
      type: "json",
      jsonSchema: {
        uri: "a://b/layer_config.json", // required
        fileMatch: ["a://b/layer_config.json"], // required
        schema: {
          type: "object",
        },
      },
      required: true,
      defaultValue: {},
      admin: {
        description:
          'Describe how to render the layer on the map. Two keys are mandatory: "source" and "styles". "source" follows this specification: https://docs.mapbox.com/style-spec/reference/sources/. Only vector and raster sources are supported. "styles" follows this specification: https://docs.mapbox.com/style-spec/reference/layers/. Only vector and raster layers are supported. Parameters may be injected, for example to control the opacity and visibility of the layer.',
      },
    },
    {
      name: "params_config",
      label: "Dynamic parameters",
      type: "json",
      required: true,
      jsonSchema: {
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
                type: ["string", "number", "boolean"],
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
    },
    {
      name: "legend_config",
      type: "json",
      jsonSchema: {
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
      admin: {
        description:
          'Describe how to render the legend of the layer. It is an object containing two keys: "type" and "items". "type" is the type of legend. "items" is an array of objects containing two keys: "color" and "value". "color" is the color of the item. "value" is the value associated with the color. The value may be a string or a number.',
      },
    },

    // {
    //   name: 'indicator',
    //   type: 'join',
    //   collection: 'indicators',
    //   on: 'layer',
    // },
  ],
};
