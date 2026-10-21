"use client";

import { useEffect, useRef } from "react";

import { useQuery } from "@tanstack/react-query";
import { CommandInput } from "cmdk";
import { useAtom, useSetAtom } from "jotai";
import { LucideXCircle, SearchIcon } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { LuMapPin, LuSearch } from "react-icons/lu";

import { cn } from "@/lib/utils";

import {
  locationsAtom,
  tmpBboxAtom,
  useSyncLocation,
  useSyncRegion,
} from "@/app/(frontend)/[locale]/(app)/store";

import { useGlobalLocation } from "@/hooks/use-global-locations";
import { useLocationId } from "@/hooks/use-location-id";
import { useRegions } from "@/hooks/use-regions";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { collectionByIdQueryOptions } from "@/services/sdk-query";

export const LocationsSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const locale = useLocale();
  const t = useTranslations();
  const format = useFormatter();

  const [region] = useSyncRegion();
  const [, setLocation] = useSyncLocation();
  const location = useLocationId();
  const globalLocation = useGlobalLocation(region);
  const [locations, setLocations] = useAtom(locationsAtom);
  const setTmpBbox = useSetAtom(tmpBboxAtom);
  const { data: regionsData } = useRegions();

  // Names the searched regions: every region on the selection screen, the current one inside a region
  const searchPlaceholder = t("locations.placeholder", {
    regions: format.list(
      regionsData.docs.filter(({ id }) => !region || id === region).map(({ name }) => name),
      // "Sahel & Europe" in English, as in the design
      { type: "conjunction", style: "short" },
    ),
  });

  const { data: locationsIdData } = useQuery({
    ...collectionByIdQueryOptions("locations", location ?? "", {
      locale,
    }),
    enabled: !!location, // Only run this query if location is defined
  });

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

  const handleReset = () => {
    setLocation(null);
    setTmpBbox(globalLocation?.bbox);
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
          "bg-primary text-foreground pointer-events-none absolute top-2 left-2 flex size-12 shrink-0 items-center justify-center rounded-full",

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
          "h-full w-full rounded-4xl pr-12 pl-15 text-sm text-ellipsis transition-colors duration-300":
            true,
          "text-background placeholder:text-muted-foreground outline-0": locations.enabled,
          "text-foreground placeholder:text-foreground outline-0": !locations.enabled,
        })}
        value={
          !locations.enabled && locationsIdData?.name
            ? locationsIdData.name
            : locations.search || ""
        }
        placeholder={cn({
          [`${locationsIdData?.name}`]: !locations.enabled && locationsIdData?.name,
          [searchPlaceholder]: locations.enabled || !location,
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

      {!locations.enabled && (
        <button
          type="button"
          className={cn({
            // Positioned like the other buttons, in the input's right padding
            "absolute top-3 right-3 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full":
              true,
            hidden: locationsIdData && locationsIdData?.type !== "global",
          })}
          onClick={() => inputRef.current?.focus()}
        >
          <SearchIcon className="h-6 w-6 text-current" />
        </button>
      )}

      {!locations.enabled && locationsIdData && locationsIdData?.type !== "global" && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleReset}
              className={cn(
                "text-foreground animate-in fade-in absolute top-3 right-3 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-150",
                "hover:text-accent",
              )}
            >
              <LucideXCircle className="h-6 w-6 text-current" />
            </button>
          </TooltipTrigger>

          <TooltipContent side="right" align="center">
            {t("common.reset")}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
