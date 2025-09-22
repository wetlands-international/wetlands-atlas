import { deepMerge, type JSONField } from "payload";

export const ChartField = (props?: Partial<JSONField>): JSONField => {
  return deepMerge(
    {
      name: "chart",
      type: "group",
      label: "Chart",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "indicator",
          type: "relationship",
          relationTo: "indicators",
          required: true,
          hasMany: false,
        },
        {
          name: "location",
          type: "relationship",
          relationTo: "locations",
          required: true,
          hasMany: false,
        },
      ],
    },
    props ?? {},
  );
};
