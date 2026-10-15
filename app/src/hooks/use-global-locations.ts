import { useMemo } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { Config } from "@/payload-types";

import { collectionQueryOptions } from "@/services/sdk-query";

// Shared by the server prefetch in `(app)/layout.tsx` and the client, so that both use the same query key
export const globalLocationsQueryOptions = (locale: Config["locale"]) =>
  collectionQueryOptions("locations", {
    // Populates `region` to get its color
    depth: 1,
    limit: 0,
    locale,
    select: {
      id: true,
      bbox: true,
      geometry: true,
      region: true,
    },
    where: {
      type: {
        equals: "global",
      },
    },
  });

/**
 * Returns the global location of every region and the union of their bounding boxes
 */
export const useGlobalLocations = () => {
  const locale = useLocale();
  const { data } = useSuspenseQuery(globalLocationsQueryOptions(locale));

  const unionBbox = useMemo(() => {
    if (!data.docs.length) return undefined;

    return data.docs.reduce<[number, number, number, number]>(
      (union, { bbox }) => [
        Math.min(union[0], bbox[0]),
        Math.min(union[1], bbox[1]),
        Math.max(union[2], bbox[2]),
        Math.max(union[3], bbox[3]),
      ],
      [Infinity, Infinity, -Infinity, -Infinity],
    );
  }, [data]);

  return { globalLocations: data.docs, unionBbox };
};
