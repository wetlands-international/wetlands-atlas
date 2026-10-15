import { deepMerge, type JSONField } from "payload";

import { BASEMAPS } from "@/components/map/controls/settings/basemap";

import { getCategoryRegion, landscapeMapLayersWhere } from "@/cms/utils/landscape-region";
import { Landscape } from "@/payload-types";

type MapValue = NonNullable<Landscape["steps"]>[number]["map"];

export const MapField = (props?: Partial<JSONField>): JSONField => {
  return deepMerge(
    {
      name: "map",
      type: "json",
      jsonSchema: {
        uri: "a://b/map-field.json", // required
        fileMatch: ["a://b/map-field.json"], // required
        schema: {
          type: "object",
          properties: {
            bbox: {
              type: "array",
              maxLength: 4,
            },
            bearing: {
              type: "number",
              minimum: 0,
              maximum: 360,
            },
            pitch: {
              type: "number",
              minimum: 0,
              maximum: 60,
            },
            layers: {
              type: "array",
              items: {
                type: "string",
              },
            },
            basemap: {
              type: "string",
              enum: Object.keys(BASEMAPS),
            },
          },
          required: ["bbox"],
          additionalProperties: false,
        },
      },
      hooks: {
        beforeChange: [
          // Remove the layers that are not offered for the landscape's region, which the editor can't see in the field
          async ({ value, data, originalDoc, req }) => {
            const map = value as MapValue;
            if (!map?.layers?.length) {
              return value;
            }

            const regionId = await getCategoryRegion(req, data?.category ?? originalDoc?.category);
            const { docs } = await req.payload.find({
              collection: "layers",
              depth: 0,
              pagination: false,
              where: {
                and: [{ id: { in: map.layers } }, landscapeMapLayersWhere(regionId)],
              },
              req,
            });
            const layerIds = new Set(docs.map((layer) => layer.id));

            return { ...map, layers: map.layers.filter((layerId) => layerIds.has(layerId)) };
          },
        ],
      },
      admin: {
        components: {
          Field: "@/cms/fields/map/field",
        },
        description: `This field allows you to select a bounding box, bearing, pitch, and layers for the map. The bounding box is defined by an array of four numbers: [minX, minY, maxX, maxY]. Bearing (0-360) controls the map rotation and pitch (0-60) controls the camera tilt for 3D views. Use right-click drag to rotate and adjust pitch. The layers are an array of layer IDs that you want to display on the map. You can toggle the visibility of each layer in the layers section. Only the indicator and contextual layers of the category's region are offered: select a category first, and reload the page after changing it. The basemap can be selected by using the control from the map settings. The available basemaps are: ${Object.keys(BASEMAPS).join(", ")}. 3D terrain elevation (DEM) is always enabled.`,
      },
    },
    props ?? {},
  );
};
