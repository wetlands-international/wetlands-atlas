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
          "This field is used to store the map data in Mapbox. It is required for the map to function correctly.",
      },
    },
    props ?? {},
  );
};
