import { revalidatePath } from "next/cache";

import { CollectionConfig } from "payload";

import { PublicAccessControl } from "@/cms/access/public";
import { LegendConfigField } from "@/cms/fields/legend-config";
import { ParamsConfigField } from "@/cms/fields/params-config-field";
import { RenderingConfigField } from "@/cms/fields/rendering-config";
import { SlugIDField } from "@/cms/fields/slug";
import { getCategoryRegion } from "@/cms/utils/landscape-region";
import { LayerTypeValidation } from "@/cms/utils/layer-validation";
import { Layer } from "@/payload-types";

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
      name: "indicators",
      type: "relationship",
      relationTo: "indicators",
      hasMany: true,
      filterOptions: async ({ siblingData, req }) => {
        // Once a first indicator is selected, only offer the indicators of the same region
        const [firstIndicator] = (siblingData as Partial<Layer>)?.indicators ?? [];
        if (!firstIndicator) {
          return true;
        }

        const indicator =
          typeof firstIndicator === "object"
            ? firstIndicator
            : await req.payload.findByID({
                collection: "indicators",
                id: firstIndicator,
                depth: 0,
                disableErrors: true,
                req,
              });

        const regionId = await getCategoryRegion(req, indicator?.category);
        if (!regionId) {
          return true;
        }

        return { "category.region": { equals: regionId } };
      },
      admin: {
        description:
          "Once a first indicator is selected, only the indicators of the same region are offered.",
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
    {
      name: "region",
      type: "relationship",
      relationTo: "regions",
      required: true,
      admin: {
        condition: (_, siblingData) => {
          // Indicator layers get their region from their indicators, and landscape layers have none
          return siblingData?.type === LAYER_TYPE.CONTEXTUAL;
        },
      },
    },
  ],
};
