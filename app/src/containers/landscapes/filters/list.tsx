"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { CommandEmpty, CommandGroup, CommandList } from "cmdk";
import { useAtomValue } from "jotai";
import { useLocale } from "next-intl";
import { useDebounceValue } from "usehooks-ts";

import { landscapesAtom } from "@/app/(frontend)/[locale]/(app)/store";

import { LandscapesItem } from "@/containers/landscapes/filters/item";

import { Loader } from "@/components/ui/loader";

import { collectionQueryOptions } from "@/services/sdk-query";

export const LandscapesFilteredList = () => {
  const locale = useLocale();
  const landscapes = useAtomValue(landscapesAtom);

  const [search] = useDebounceValue(landscapes.search, 100);

  const {
    data: landscapesData,
    isFetched,
    isFetching,
  } = useQuery({
    ...collectionQueryOptions("landscapes", {
      depth: 1,
      limit: 0,
      page: 1,
      sort: "id",
      locale,
      select: {
        id: true,
        name: true,
      },
      where: {
        published: {
          equals: true,
        },
        ...(!!search && {
          "name.root.children.children.text": {
            like: search,
          },
        }),
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

      {!!landscapesData?.docs.length && (
        <CommandGroup className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-bold [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase">
          <div className="py-2">
            {landscapesData?.docs.map((location) => (
              <LandscapesItem key={location.id} {...location} />
            ))}
          </div>
        </CommandGroup>
      )}
    </CommandList>
  );
};
