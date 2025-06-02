import { revalidatePath } from "next/cache";

import { CollectionConfig } from "payload";

import { SlugIDField } from "@/cms/fields/slug";
import { DevOnlyAccessControl } from "@/cms/utils/dev-only-access-control";

export const Indicators: CollectionConfig = {
  slug: "indicators",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["slug_id", "name", "category", "layers"],
  },
  access: DevOnlyAccessControl,
  defaultSort: ["name"],

  fields: [
    SlugIDField(),
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "richText",
      localized: true,
      admin: {
        description:
          'Formatted data values can be injected using a special syntax. If the widget type is Percentage bar, then you can use "{value}". If it is Range bar, then you can use "{min}", "{max}" and "{average}". If it is Pie, you can use "{value[0]}", "{value[1]}", and so on.',
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
      required: true,
    },
    {
      name: "layers",
      type: "join",
      collection: "layers",
      on: "indicator",
      admin: {
        defaultColumns: ["id", "name"],
      },
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        revalidatePath("/", "layout");
      },
    ],
  },
};
