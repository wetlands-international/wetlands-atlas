"use client";

import { useEffect, useRef } from "react";

import { CommandInput } from "cmdk";
import { useAtom } from "jotai";
import { LucideXCircle } from "lucide-react";
import { LuMapPin, LuSearch } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { locationsAtom, useSyncLocation } from "@/app/(frontend)/[locale]/(app)/store";

export const LocationsSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [location] = useSyncLocation();
  const [locations, setLocations] = useAtom(locationsAtom);

  const handleValueChange = (value: string) => {
    setLocations({
      ...locations,
      search: value,
    });
  };

  const handleFocus = () => {
    setLocations({
      search: undefined,
      enabled: true,
    });
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setLocations({
        search: undefined,
        enabled: false,
      });
    }
  };

  const handleClose = () => {
    setLocations({
      search: undefined,
      enabled: false,
    });
  };

  useEffect(() => {
    if (!locations.enabled) {
      inputRef.current?.blur();
    }
  }, [locations.enabled]);

  return (
    <div
      className={cn(
        "flex h-16 w-full cursor-pointer items-center justify-start gap-2 rounded-4xl text-left",
        locations.enabled && "bg-foreground outline-0",
      )}
    >
      <div
        className={cn(
          "bg-primary text-foreground absolute top-2 left-2 flex size-12 shrink-0 items-center justify-center rounded-full",

          locations.enabled && "bg-foreground text-background",
        )}
      >
        {locations.enabled ? (
          <LuSearch className="h-4 w-4 text-current transition-colors" />
        ) : (
          <LuMapPin className="h-4 w-4 text-current transition-colors" />
        )}
      </div>

      <CommandInput
        id="location-search"
        ref={inputRef}
        className={cn({
          "h-full w-full rounded-4xl px-16 transition-colors duration-300": true,
          "text-background placeholder:text-muted-foreground outline-0": locations.enabled,
          "text-foreground placeholder:text-foreground outline-0": !locations.enabled,
        })}
        value={cn({
          [location]: !locations.enabled,
          [locations.search ?? ""]: locations.enabled,
        })}
        placeholder={cn({
          [location]: !locations.enabled,
          "Search for a location...": locations.enabled,
        })}
        onValueChange={handleValueChange}
        onKeyUp={handleKeyUp}
        onFocus={handleFocus}
      />

      {locations.enabled && (
        <button
          className={cn(
            "bg-foreground text-background animate-in fade-in absolute top-3 right-3 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-150",
            "hover:text-destructive",
          )}
          onClick={handleClose}
        >
          <LucideXCircle className="h-6 w-6 text-current" />
        </button>
      )}
    </div>
  );
};
