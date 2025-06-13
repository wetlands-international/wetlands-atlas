import { revalidatePath } from "next/cache";

import { CollectionConfig } from "payload";

import { LegendConfigField } from "@/cms/fields/legend-config";
import { ParamsConfigField } from "@/cms/fields/params-config-field";
import { RenderingConfigField } from "@/cms/fields/rendering-config";
import { SlugIDField } from "@/cms/fields/slug";
import { LayerTypeValidation } from "@/cms/utils/layer-validation";

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
  // access: DevOnlyAccessControl, // TODO revise permissions and uncomment later
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
    RenderingConfigField,
    ParamsConfigField,
    LegendConfigField,
    {
      name: "indicator",
      type: "relationship",
      relationTo: "indicators",
      hasMany: false,
      admin: {
        condition: (_, siblingData) => {
          // Don't show this field if the layer type is CONTEXTUAL
          return siblingData?.type === LAYER_TYPE.INDICATOR;
        },
      },
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
