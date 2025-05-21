"use client";

import { CommandInput } from "cmdk";
import { useAtom } from "jotai";
import { LuMapPin } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { locationsAtom } from "@/app/(frontend)/[locale]/(app)/store";

export const LocationsSearch = () => {
  const [locations, setLocations] = useAtom(locationsAtom);

  const handleClick = () => {
    setLocations({
      ...locations,
      enabled: !locations.enabled,
    });
  };

  return (
    <label
      htmlFor="location-search"
      className={cn(
        "flex h-16 w-full items-center justify-start gap-2 p-2 text-left",
        locations.enabled && "bg-accent",
      )}
      onClick={handleClick}
    >
      <div className="bg-primary flex size-12 shrink-0 items-center justify-center rounded-full">
        <LuMapPin className="h-4 w-4 text-white" />
      </div>

      <CommandInput id="location-search" className="outline-0" />
    </label>
  );
};
