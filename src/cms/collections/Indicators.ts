import { slugField } from "@/cms/fields/slug";
import {
  lexicalEditor,
  BoldFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  FixedToolbarFeature,
} from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

export const Indicators: CollectionConfig = {
  slug: "indicators",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "name", "category", "layers"],
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
      name: "description",
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        features: () => [
          FixedToolbarFeature(),
          BoldFeature(),
          LinkFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
        ],
      }),
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
};
