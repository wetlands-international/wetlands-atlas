"use client";

import { useMemo } from "react";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { CommandEmpty, CommandGroup, CommandList } from "cmdk";
import { useAtomValue } from "jotai";
import { useDebounceValue } from "usehooks-ts";

import { locationsAtom } from "@/app/(frontend)/[locale]/(app)/store";

import { LocationsItem } from "@/containers/locations/item";

import { Loader } from "@/components/ui/loader";

import { LOCATION_TYPE } from "@/cms/collections/Location";
import type { Location } from "@/payload-types";

import { collectionQueryOptions } from "@/services/sdk-query";

const typeOrder: Record<string, number> = {
  [LOCATION_TYPE.ADMIN_REGION]: 1,
  [LOCATION_TYPE.HYDRO_BASIN]: 2,
  [LOCATION_TYPE.ECO_REGION]: 3,
  [LOCATION_TYPE.WDPA]: 4,
  [LOCATION_TYPE.GLOBAL]: 5,
} as const;

const typeLabels: Record<string, string> = {
  [LOCATION_TYPE.ADMIN_REGION]: "Countries",
  [LOCATION_TYPE.HYDRO_BASIN]: "Basins",
  [LOCATION_TYPE.ECO_REGION]: "Ecoregions",
  [LOCATION_TYPE.WDPA]: "WDPA",
  [LOCATION_TYPE.GLOBAL]: "Global",
} as const;

export const LocationsList = () => {
  const locations = useAtomValue(locationsAtom);

  const [search] = useDebounceValue(locations.search, 300);

  const {
    data: locationsData,
    isFetched,
    isFetching,
  } = useQuery({
    ...collectionQueryOptions("locations", {
      depth: 1,
      limit: 0,
      page: 1,
      sort: "name",
      // Locations are currently only in English
      locale: "en",
      select: {
        id: true,
        name: true,
        type: true,
        code: true,
        bbox: true,
      },
      where: {
        ...(!!search && {
          name: {
            like: `%${search}%`,
          },
        }),
      },
    }),
    placeholderData: keepPreviousData,
  });

  const groupedLocations = useMemo(() => {
    if (!locationsData?.docs) return {} as Record<string, Location[]>;

    const grouped = locationsData.docs.reduce(
      (acc, location) => {
        const type = location.type;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(location);
        return acc;
      },
      {} as Record<string, Location[]>,
    );

    // Sort locations within each group alphabetically
    Object.keys(grouped).forEach((type) => {
      grouped[type].sort((a, b) => a.name.localeCompare(b.name));
    });

    return grouped;
  }, [locationsData?.docs]);

  const orderedGroups = useMemo(() => {
    return Object.keys(groupedLocations)
      .filter((type) => typeOrder[type] !== undefined)
      .sort((a, b) => (typeOrder[a] ?? 999) - (typeOrder[b] ?? 999));
  }, [groupedLocations]);

  return (
    <CommandList className="bg-foreground relative rounded-4xl p-6">
      <Loader isLoading={isFetching} />

      {!isFetching && isFetched && (
        <CommandEmpty>
          <span className="text-muted-foreground">No locations found</span>
        </CommandEmpty>
      )}

      {orderedGroups.map((type) => {
        const locations = groupedLocations[type];
        if (!locations) return null;

        return (
          <CommandGroup
            key={type}
            heading={typeLabels[type] ?? type}
            className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-bold [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase"
          >
            <div className="py-2">
              {locations.map((location) => (
                <LocationsItem key={location.id} {...location} />
              ))}
            </div>
          </CommandGroup>
        );
      })}
    </CommandList>
  );
};
