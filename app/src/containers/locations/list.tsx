"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { CommandEmpty, CommandGroup, CommandList } from "cmdk";
import { useAtomValue } from "jotai";
import { useLocale } from "next-intl";
import { useDebounceValue } from "usehooks-ts";

import { locationsAtom } from "@/app/(frontend)/[locale]/(app)/store";

import { LocationsItem } from "@/containers/locations/item";

import { Loader } from "@/components/ui/loader";

import API from "@/services/api";

export const LocationsList = () => {
  const locale = useLocale();
  const locations = useAtomValue(locationsAtom);

  const [search] = useDebounceValue(locations.search, 300);

  const {
    data: locationsData,
    isFetched,
    isFetching,
  } = useQuery({
    ...API.queryOptions("get", "/api/locations", {
      params: {
        query: {
          depth: 1,
          limit: 0,
          page: 1,
          sort: "name",
          locale,
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
        },
      },
    }),
    placeholderData: keepPreviousData,
  });

  return (
    <CommandList className="bg-foreground relative rounded-4xl p-6">
      <Loader isLoading={isFetching} />

      {!isFetching && isFetched && (
        <CommandEmpty>
          <span className="text-muted-foreground">No locations found</span>
        </CommandEmpty>
      )}

      {!!locationsData?.docs.length && (
        <CommandGroup
          heading="All regions"
          className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-bold [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase"
        >
          <div className="py-2">
            {locationsData?.docs.map((location) => (
              <LocationsItem key={location.id} {...location} />
            ))}
          </div>
        </CommandGroup>
      )}
    </CommandList>
  );
};
