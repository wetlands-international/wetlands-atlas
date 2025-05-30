import { CollectionBeforeValidateHook, ValidationError } from "payload";

import { LAYER_TYPE } from "@/cms/collections/Layers";
import { Layer } from "@/payload-types";

// This validation function checks that the Layer is associated with an indicator if it is of type INDICATOR,
// or that it does not have an indicator if it is of type CONTEXTUAL.
export const LayerTypeValidation: CollectionBeforeValidateHook<Layer> = (args) => {
  const { data } = args;
  if (data && data.type === LAYER_TYPE.INDICATOR && !data.indicator) {
    throw new ValidationError({
      collection: "layers",
      errors: [
        {
          label: "Indicator",
          path: "indicator",
          message: "Indicator is required for indicator layers.",
        },
      ],
    });
  }
  if (data && data.type === LAYER_TYPE.CONTEXTUAL && data.indicator) {
    throw new ValidationError({
      collection: "layers",
      errors: [
        {
          label: "Indicator",
          path: "indicator",
          message: "Contextual Layers cannot have an indicator.",
        },
      ],
    });
  }
  return data;
};
