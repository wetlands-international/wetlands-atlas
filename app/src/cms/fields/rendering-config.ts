import { Field } from "payload";

export const RenderingConfigField: Field = {
  name: "config",
  label: "Rendering",
  type: "json",
  required: true,
  defaultValue: {},
  jsonSchema: {
    // The way the following two properties are defined is required to indicate that we will use a local schema
    uri: "a://b/layer_config.json", // required
    fileMatch: ["a://b/layer_config.json"], // required
    schema: {
      type: "object",
      // properties: {
      //   source: {
      //     type: "object",
      //     description:
      //       "The source of the layer. It can be a vector or raster source. See https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/",
      //     required: true,
      //     properties: {
      //       type: {
      //         type: "string",
      //         enum: ["vector", "raster"],
      //         description: "The type of the source, either 'vector' or 'raster'.",
      //       },
      //     },
      //   },
      //   styles: {
      //     type: "array",
      //     // items: {
      //     //   type: "object",
      //     //   description:
      //     //     "The styles of the layer. It can be a vector or raster layer. See https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/",
      //     //   properties: {
      //     //     type: {
      //     //       type: "string",
      //     //       enum: ["vector", "raster"],
      //     //       description: "The type of the layer, either 'vector' or 'raster'.",
      //     //     },
      //     //   },
      //     // },
      //   },
      // },
      // additionalProperties: false,
    },
  },
  admin: {
    description:
      'Describe how to render the layer on the map. Two keys are mandatory: "source" and "styles". "source" follows this specification: https://docs.mapbox.com/style-spec/reference/sources/. Only vector and raster sources are supported. "styles" follows this specification: https://docs.mapbox.com/style-spec/reference/layers/. Only vector and raster layers are supported. Parameters may be injected, for example to control the opacity and visibility of the layer.',
  },
};
