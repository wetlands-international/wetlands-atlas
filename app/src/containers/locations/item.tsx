"use client";

import { PropsWithChildren } from "react";

import { CommandItem } from "cmdk";
import { useSetAtom } from "jotai";

import { locationsAtom, useSyncLocation } from "@/app/(frontend)/[locale]/(app)/store";

export const LocationsItem = ({ children }: PropsWithChildren) => {
  const [, setLocation] = useSyncLocation();
  const setLocations = useSetAtom(locationsAtom);

  return (
    <CommandItem
      className="text-background data-[selected=true]:bg-accent data-[selected=true]:text-background cursor-pointer px-3 py-1 text-left transition-colors duration-150 data-[selected=true]:indent-1"
      onSelect={(v) => {
        setLocation(v);

        setLocations({
          search: undefined,
          enabled: false,
        });
      }}
    >
      {children}
    </CommandItem>
  );
};
// Compare this snippet from src/containers/locations/list.tsx:
