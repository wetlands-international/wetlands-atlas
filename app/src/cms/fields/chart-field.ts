import { deepMerge, type JSONField } from "payload";

import { landscapeRegionFilterOptions } from "@/cms/utils/landscape-region";

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
          filterOptions: landscapeRegionFilterOptions("category.region"),
          admin: {
            description:
              "Only the indicators of the landscape category's region are offered. Select a category first.",
          },
        },
        {
          name: "location",
          type: "relationship",
          relationTo: "locations",
          required: true,
          hasMany: false,
          filterOptions: landscapeRegionFilterOptions("region"),
          admin: {
            description:
              "Only the locations of the landscape category's region are offered. Select a category first.",
          },
        },
      ],
    },
    props ?? {},
  );
};
