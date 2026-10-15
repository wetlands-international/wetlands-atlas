import { FilterOptionsProps, PayloadRequest, Where } from "payload";

import { LAYER_TYPE } from "@/cms/collections/Layers";
import { Category, Landscape } from "@/payload-types";

// Returns the ID of the region of a category, or null if there is no category
export const getCategoryRegion = async (
  req: PayloadRequest,
  category: Category | Category["id"] | null | undefined,
) => {
  if (!category) {
    return null;
  }

  const doc =
    typeof category === "object"
      ? category
      : await req.payload.findByID({
          collection: "categories",
          id: category,
          depth: 0,
          disableErrors: true,
          req,
        });

  if (!doc) {
    return null;
  }

  return typeof doc.region === "object" ? doc.region.id : doc.region;
};

// Only offers the records whose `regionPath` matches the region of the landscape's category, and none until a
// category is selected
export const landscapeRegionFilterOptions =
  (regionPath: string) =>
  async ({ data, req }: FilterOptionsProps<Partial<Landscape>>): Promise<boolean | Where> => {
    const regionId = await getCategoryRegion(req, data?.category);
    if (!regionId) {
      return false;
    }

    return { [regionPath]: { equals: regionId } };
  };

// Landscape layers are offered in every region, while indicator and contextual layers are limited to the landscape's
// region
export const landscapeMapLayersWhere = (regionId: string | null): Where => {
  if (!regionId) {
    return { type: { equals: LAYER_TYPE.LANDSCAPE } };
  }

  return {
    or: [
      { type: { equals: LAYER_TYPE.LANDSCAPE } },
      { region: { equals: regionId } },
      { "indicators.category.region": { equals: regionId } },
    ],
  };
};
