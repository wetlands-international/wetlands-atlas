import { deepMerge, type JSONField } from "payload";

import { BASEMAPS } from "@/components/map/controls/settings/basemap";

export const MapField = (props?: Partial<JSONField>): JSONField => {
  return deepMerge(
    {
      name: "map",
      type: "json",
      jsonSchema: {
        uri: "a://b/map-field.json", // required
        fileMatch: ["a://b/map-field.json"], // required
        schema: {
          type: "object",
          properties: {
            bbox: {
              type: "array",
              maxLength: 4,
            },
            bearing: {
              type: "number",
              minimum: 0,
              maximum: 360,
            },
            pitch: {
              type: "number",
              minimum: 0,
              maximum: 60,
            },
            layers: {
              type: "array",
              items: {
                type: "string",
              },
            },
            basemap: {
              type: "string",
              enum: Object.keys(BASEMAPS),
            },
          },
          required: ["bbox"],
          additionalProperties: false,
        },
      },
      admin: {
        components: {
          Field: "@/cms/fields/map/field",
        },
        description: `This field allows you to select a bounding box, bearing, pitch, and layers for the map. The bounding box is defined by an array of four numbers: [minX, minY, maxX, maxY]. Bearing (0-360) controls the map rotation and pitch (0-60) controls the camera tilt for 3D views. Use right-click drag to rotate and adjust pitch. The layers are an array of layer IDs that you want to display on the map. You can toggle the visibility of each layer in the layers section. The basemap can be selected by using the control from the map settings. The available basemaps are: ${Object.keys(BASEMAPS).join(", ")}.`,
      },
    },
    props ?? {},
  );
};
