import { revalidatePath } from "next/cache";


import { SlugIDField } from "@/cms/fields/slug";
import { LegendConfigField } from "@/cms/fields/legend-config";
import { ParamsConfigField } from "@/cms/fields/params-config-field";
import { RenderingConfigField } from "@/cms/fields/rendering-config";
import { LayerTypeValidation } from "@/cms/utils/layer-validation";
import { CollectionConfig } from "payload";

export const enum LAYER_TYPE {
  INDICATOR = "INDICATOR",
  CONTEXTUAL = "CONTEXTUAL",
}

export const Layers: CollectionConfig = {
  slug: "layers",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "name"],
  },
  defaultSort: ["name"],
  hooks: {
    beforeValidate: [LayerTypeValidation],
    afterChange: [
      async () => {
        revalidatePath("/", "layout");
      },
    ],
  },

  fields: [
    SlugIDField(),
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "info",
      type: "textarea",
      localized: false,
    },
    RenderingConfigField,
    ParamsConfigField,
    LegendConfigField,
    {
      name: "indicator",
      type: "relationship",
      relationTo: "indicators",
      hasMany: false,
    },
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "Indicator",
          value: LAYER_TYPE.INDICATOR,
        },
        {
          label: "Contextual",
          value: LAYER_TYPE.CONTEXTUAL,
        },
      ],
      defaultValue: LAYER_TYPE.CONTEXTUAL,
      required: true,
    },
  ],
};
