"use client";

import { CommandItem } from "cmdk";
import { useSetAtom } from "jotai";

import {
  locationsAtom,
  tmpBboxAtom,
  useSyncLocation,
  useSyncRegion,
} from "@/app/(frontend)/[locale]/(app)/store";

import { Location, Region } from "@/payload-types";

export const LocationsItem = ({
  location,
  region,
}: {
  location: Location;
  region: Region["id"];
}) => {
  const [currentRegion, setRegion] = useSyncRegion();
  const [, setLocation] = useSyncLocation();
  const setTmpBbox = useSetAtom(tmpBboxAtom);
  const setLocations = useSetAtom(locationsAtom);

  return (
    <CommandItem
      className="text-background data-[selected=true]:bg-accent data-[selected=true]:text-background flex cursor-pointer items-center justify-between gap-2 px-3 py-1 text-left transition-colors duration-150 data-[selected=true]:indent-1"
      onSelect={() => {
        // On the selection screen, picking a location also enters its region. nuqs batches both
        // params into a single URL update.
        if (region !== currentRegion) {
          setRegion(region);
        }

        setLocation(location.id);

        setTmpBbox(location.bbox);

        setLocations({
          search: undefined,
          enabled: false,
        });
      }}
    >
      <span className="truncate">{location.name}</span>

      {typeof location.parent === "object" && !!location.parent?.name && (
        <span className="text-muted-foreground shrink-0 text-xs">{location.parent.name}</span>
      )}
    </CommandItem>
  );
};
