import { Block } from "payload";

export const NumberBlock: Block = {
  slug: "number",
  admin: {
    disableBlockName: true,
  },
  fields: [
    {
      name: "variable",
      type: "text",
      label: "Variable",
      required: true,
    },
    {
      name: "format",
      type: "radio",
      options: [
        {
          label: "Number",
          value: "number",
        },
        {
          label: "Percentage",
          value: "percentage",
        },
      ],
      defaultValue: "number",
      required: true,
    },
  ],
};
