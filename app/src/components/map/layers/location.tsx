import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { Layer, Source } from "react-map-gl/mapbox";

import { Location } from "@/payload-types";

import { collectionByIdQueryOptions } from "@/services/sdk-query";

export const LocationLayer = ({ location }: { location: Location["id"] }) => {
  const locale = useLocale();
  const { data: locationsIdData } = useQuery({
    ...collectionByIdQueryOptions("locations", location ?? "", {
      locale,
    }),
    enabled: !!location, // Only run this query if location is defined
  });

  const FEATURE = useMemo(() => {
    if (!locationsIdData?.geometry) return null;
    return {
      type: "Feature",
      geometry: locationsIdData.geometry as unknown as GeoJSON.Geometry,
      properties: locationsIdData,
    } as GeoJSON.Feature;
  }, [locationsIdData]);

  if (!FEATURE) return null;

  return (
    <Source id={location} key={location} type="geojson" data={FEATURE}>
      <Layer id={location} type="line" paint={{ "line-color": "#cadb6b", "line-width": 2 }} />
    </Source>
  );
};
