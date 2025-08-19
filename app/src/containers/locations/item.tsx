"use client";

import { CommandItem } from "cmdk";
import { useSetAtom } from "jotai";

import { locationsAtom, tmpBboxAtom, useSyncLocation } from "@/app/(frontend)/[locale]/(app)/store";

import { Location } from "@/payload-types";

export const LocationsItem = (props: Location) => {
  const [, setLocation] = useSyncLocation();
  const setTmpBbox = useSetAtom(tmpBboxAtom);
  const setLocations = useSetAtom(locationsAtom);

  return (
    <CommandItem
      className="text-background data-[selected=true]:bg-accent data-[selected=true]:text-background cursor-pointer px-3 py-1 text-left transition-colors duration-150 data-[selected=true]:indent-1"
      onSelect={() => {
        setLocation(props.id);

        setTmpBbox(props.bbox.bbox);

        setLocations({
          search: undefined,
          enabled: false,
        });
      }}
    >
      {props.name}
    </CommandItem>
  );
};
// Compare this snippet from src/containers/locations/list.tsx:
