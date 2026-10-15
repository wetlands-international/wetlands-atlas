import { useMemo } from "react";

import { Layer, Source } from "react-map-gl/mapbox";

import { useGlobalLocations } from "@/hooks/use-global-locations";

/**
 * Outline of each region's global location, in the region's color
 */
export const RegionsLayer = () => {
  const { globalLocations } = useGlobalLocations();

  const FEATURES = useMemo(
    () =>
      ({
        type: "FeatureCollection",
        features: globalLocations.map((location) => ({
          type: "Feature",
          geometry: location.geometry as unknown as GeoJSON.Geometry,
          properties: {
            color: typeof location.region === "object" ? location.region.color : undefined,
          },
        })),
      }) as GeoJSON.FeatureCollection,
    [globalLocations],
  );

  return (
    <Source id="regions" type="geojson" data={FEATURES}>
      <Layer id="regions" type="line" paint={{ "line-color": ["get", "color"], "line-width": 2 }} />
    </Source>
  );
};
