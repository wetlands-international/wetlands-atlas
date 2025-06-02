import { CollectionConfig } from "payload";

import { SlugIDField } from "@/cms/fields/slug";
import { DevOnlyAccessControl } from "@/cms/utils/dev-only-access-control";

export const LOCATION_TYPE = {
  ADMIN_REGION: "ADMIN_REGION",
  HYDRO_BASIN: "HYDRO_BASIN",
};
export const Locations: CollectionConfig = {
  slug: "locations",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "name", "type"],
  },
  defaultSort: ["name"],
  access: DevOnlyAccessControl,
  fields: [
    SlugIDField(),
    {
      name: "name",
      type: "text",
      localized: true,
      unique: true,
      required: true,
    },
    {
      name: "geometry",
      type: "json",
      required: true,
    },
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "Admin Region",
          value: LOCATION_TYPE.ADMIN_REGION,
        },
        {
          label: "Hydro Basin",
          value: LOCATION_TYPE.HYDRO_BASIN,
        },
      ],
      required: true,
    },
  ],
};
