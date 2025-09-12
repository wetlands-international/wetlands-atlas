import { CollectionConfig } from "payload";

import { PublicAccessControl } from "@/cms/access/public";
import { BBoxField } from "@/cms/fields/bbox-field";
import { formatCompoundSlug } from "@/cms/utils/formatSlug";

export const LOCATION_TYPE = {
  ADMIN_REGION: "admin_region",
  HYDRO_BASIN: "hydro_basin",
  GLOBAL: "global",
  WDPA: "wdpa",
  ECO_REGION: "eco_region",
  LANDSCAPES: "landscapes",
};
export const Locations: CollectionConfig = {
  slug: "locations",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "name", "type"],
  },
  defaultSort: ["name"],
  indexes: [{ unique: true, fields: ["type", "code"] }],
  access: PublicAccessControl, // TODO revise permissions and uncomment later
  fields: [
    {
      name: "id",
      type: "text",
      index: true,
      unique: true,
      required: true,
      admin: {
        position: "sidebar",
        readOnly: true,
        description: `This field is automatically generated from 'type' and 'code' fields. It is usually used to create a URL-friendly version of the name.`,
      },
      hooks: {
        beforeValidate: [formatCompoundSlug("type", "code")],
      },
    },
    {
      name: "name",
      type: "text",
      localized: true,
      unique: true,
      required: true,
    },
    {
      name: "code",
      type: "text",
      localized: false,
      unique: false,
      required: true,
      admin: {
        description:
          "A unique identifying code for the location. Could be an ISO code or any other unique identifier, depending on the type of location.",
      },
    },
    {
      name: "geometry",
      type: "json",
      required: true,
      hidden: true,
    },
    BBoxField,
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "Admin Region",
          value: LOCATION_TYPE.ADMIN_REGION,
        },
        {
          label: "Eco Region",
          value: LOCATION_TYPE.ECO_REGION,
        },
        {
          label: "Hydro Basin",
          value: LOCATION_TYPE.HYDRO_BASIN,
        },
        {
          label: "Global",
          value: LOCATION_TYPE.GLOBAL,
        },
        {
          label: "Landscapes",
          value: LOCATION_TYPE.LANDSCAPES,
        },
        {
          label: "WDPA",
          value: LOCATION_TYPE.WDPA,
        },
      ],
      required: true,
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "locations",
      hasMany: false,
    },
  ],
};
