import { revalidatePath } from "next/cache";

import { CollectionConfig } from "payload";

import { PublicAccessControl } from "@/cms/access/public";
import { LegendConfigField } from "@/cms/fields/legend-config";
import { ParamsConfigField } from "@/cms/fields/params-config-field";
import { RenderingConfigField } from "@/cms/fields/rendering-config";
import { SlugIDField } from "@/cms/fields/slug";
import { LayerTypeValidation } from "@/cms/utils/layer-validation";

export const enum LAYER_TYPE {
  INDICATOR = "indicator",
  CONTEXTUAL = "contextual",
  LANDSCAPE = "landscape",
}

export const Layers: CollectionConfig = {
  slug: "layers",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "name", "type"],
  },
  defaultSort: ["name"],
  access: PublicAccessControl, // TODO revise permissions and uncomment later
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
        {
          label: "Landscape",
          value: LAYER_TYPE.LANDSCAPE,
        },
      ],
      defaultValue: LAYER_TYPE.CONTEXTUAL,
      required: true,
    },
  ],
};
