import { deepMerge, type JSONField } from "payload";

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
            layers: {
              type: "array",
              items: {
                type: "string",
              },
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
        description:
          "This field allows you to select a bounding box and layers for the map. The bounding box is defined by an array of four numbers: [minX, minY, maxX, maxY]. The layers are an array of layer IDs that you want to display on the map. You can toggle the visibility of each layer in the layers section.",
      },
    },
    props ?? {},
  );
};
