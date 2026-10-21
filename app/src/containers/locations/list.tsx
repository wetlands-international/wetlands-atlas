"use client";

import { useMemo } from "react";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { CommandEmpty, CommandGroup, CommandList } from "cmdk";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useDebounceValue } from "usehooks-ts";

import { locationsAtom, useSyncRegion } from "@/app/(frontend)/[locale]/(app)/store";

import { useRegions } from "@/hooks/use-regions";

import { LocationsItem } from "@/containers/locations/item";

import { Loader } from "@/components/ui/loader";

import type { Location } from "@/payload-types";

import { collectionQueryOptions } from "@/services/sdk-query";

// In the order of the groups. Global locations aren't searchable: the region cards and the reset
// button already select them.
const SEARCHABLE_TYPES = [
  "admin_region",
  "hydro_basin",
  "eco_region",
  "wdpa",
] as const satisfies readonly Location["type"][];

// Maximum number of results per group (type and region), so that each one gets the same space
const GROUP_LIMIT = 10;

export const LocationsList = () => {
  const t = useTranslations("locations");
  const locations = useAtomValue(locationsAtom);
  const [region] = useSyncRegion();
  const { data: regionsData } = useRegions();

  const [search] = useDebounceValue(locations.search, 300);

  // Inside a region, only its locations are searched
  const groups = useMemo(
    () =>
      SEARCHABLE_TYPES.flatMap((type) =>
        regionsData.docs
          .filter(({ id }) => !region || id === region)
          .map((groupRegion) => ({ type, region: groupRegion })),
      ),
    [regionsData.docs, region],
  );

  const groupsQueryOptions = groups.map(({ type, region: groupRegion }) =>
    collectionQueryOptions("locations", {
      depth: 1,
      limit: GROUP_LIMIT,
      page: 1,
      sort: "name",
      // Location names are only seeded in English and Payload doesn't apply the fallback locale to
      // filters, so searching in another locale would return no results
      locale: "en",
      select: {
        id: true,
        name: true,
        bbox: true,
        parent: true,
      },
      // Only the parent's name is needed, to show the country of WDPAs
      populate: {
        locations: {
          name: true,
        },
      },
      where: {
        type: {
          equals: type,
        },
        region: {
          equals: groupRegion.id,
        },
        name: {
          like: `%${search}%`,
        },
      },
    }),
  );

  // A single query that runs every group's query in parallel, because `useQueries` doesn't support
  // `keepPreviousData`
  const {
    data: groupsData,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: ["locations-search", ...groupsQueryOptions.map(({ queryKey }) => queryKey)],
    queryFn: () =>
      Promise.all(
        groups.map(async (group, index) => ({
          ...group,
          // The database's collation ignores spaces and punctuation, unlike `localeCompare`
          locations: (await groupsQueryOptions[index].queryFn()).docs.sort((a, b) =>
            a.name.localeCompare(b.name),
          ),
        })),
      ),
    enabled: !!search,
    placeholderData: keepPreviousData,
  });

  return (
    <CommandList className="bg-foreground relative rounded-4xl p-6">
      <Loader isLoading={isFetching} />

      {/* Not debounced, so that the hint disappears as soon as the user types */}
      {!locations.search && <span className="text-muted-foreground">{t("hint")}</span>}

      {!!locations.search && !!search && !isFetching && isFetched && (
        <CommandEmpty>
          <span className="text-muted-foreground">{t("empty")}</span>
        </CommandEmpty>
      )}

      {!!locations.search &&
        !!search &&
        groupsData?.map(({ type, region: groupRegion, locations }) => {
          if (!locations.length) return null;

          // On the selection screen, results from several regions are listed
          const heading = region
            ? t(`types.${type}`)
            : t("group", { type: t(`types.${type}`), region: groupRegion.name });

          return (
            <CommandGroup
              key={`${type}-${groupRegion.id}`}
              heading={heading}
              className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-bold [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase"
            >
              <div className="py-2">
                {locations.map((location) => (
                  <LocationsItem key={location.id} location={location} region={groupRegion.id} />
                ))}
              </div>
            </CommandGroup>
          );
        })}
    </CommandList>
  );
};
