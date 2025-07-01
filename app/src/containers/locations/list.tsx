"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { CommandEmpty, CommandGroup, CommandList } from "cmdk";
import { useAtomValue } from "jotai";
import { useLocale } from "next-intl";
import { useDebounceValue } from "usehooks-ts";

import { locationsAtom } from "@/app/(frontend)/[locale]/(app)/store";

import { LocationsItem } from "@/containers/locations/item";

import API from "@/services/api";

export const LocationsList = () => {
  const locale = useLocale();
  const locations = useAtomValue(locationsAtom);

  console.log("LocationsAtom", locations);

  const [search] = useDebounceValue(locations.search, 300);

  const { data: locationsData } = useSuspenseQuery(
    API.queryOptions("get", "/api/indicators", {
      params: {
        query: {
          depth: 1,
          limit: 25,
          page: 1,
          sort: "-createdAt",
          locale,
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
  );

  return (
    <CommandList className="bg-foreground rounded-4xl p-6">
      <CommandEmpty>
        <span className="text-muted-foreground">No locations found</span>
      </CommandEmpty>
      <CommandGroup
        heading="All regions"
        className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-bold [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase"
      >
        <div className="py-2">
          <LocationsItem>Worldwide</LocationsItem>
          <LocationsItem>Location</LocationsItem>
          <LocationsItem>Location 2</LocationsItem>
          <LocationsItem>Location 3</LocationsItem>
          <LocationsItem>Location 4</LocationsItem>
          <LocationsItem>Location 5</LocationsItem>
          <LocationsItem>Location 6</LocationsItem>
          <LocationsItem>Location 7</LocationsItem>

          {locationsData?.docs.map((indicator) => (
            <LocationsItem key={indicator.id}>{indicator.name}</LocationsItem>
          ))}
        </div>
      </CommandGroup>
    </CommandList>
  );
};
