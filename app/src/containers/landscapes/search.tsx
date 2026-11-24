"use client";

import { useEffect, useRef } from "react";

import { CommandInput } from "cmdk";
import { useAtom } from "jotai";
import { LucideXCircle } from "lucide-react";
import { LuFilter, LuSearch } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { landscapesAtom } from "@/app/(frontend)/[locale]/(app)/store";

export const LandscapesSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [landscapes, setLandscapes] = useAtom(landscapesAtom);

  const handleValueChange = (value: string) => {
    setLandscapes({
      ...landscapes,
      search: value,
    });
  };

  const handleFocus = () => {
    setLandscapes({
      search: undefined,
      enabled: true,
    });
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setLandscapes({
        search: undefined,
        enabled: false,
      });
    }
  };

  const handleClose = () => {
    setLandscapes({
      search: undefined,
      enabled: false,
    });
  };

  useEffect(() => {
    if (!landscapes.enabled) {
      inputRef.current?.blur();
    }
  }, [landscapes.enabled]);

  return (
    <div
      className={cn(
        // As high as the navigation on its row, on the small screens
        "flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-4xl text-left lg:h-16",
        landscapes.enabled && "bg-foreground outline-0",
      )}
    >
      <div
        className={cn(
          "bg-primary text-foreground pointer-events-none absolute top-1 left-1 flex size-8 shrink-0 items-center justify-center rounded-full lg:top-2 lg:left-2 lg:size-12",

          landscapes.enabled && "bg-foreground text-background",
        )}
      >
        {landscapes.enabled ? (
          <LuSearch className="h-4 w-4 text-current transition-colors" />
        ) : (
          <LuFilter className="h-4 w-4 text-current transition-colors" />
        )}
      </div>

      <CommandInput
        id="landscapes-search"
        ref={inputRef}
        className={cn({
          "h-full w-full rounded-4xl pl-11 transition-colors duration-300 lg:pl-16": true,
          // Room for the close button, only when it's shown
          "text-background placeholder:text-muted-foreground pr-10 outline-0 lg:pr-16":
            landscapes.enabled,
          "text-foreground placeholder:text-foreground pr-4 outline-0": !landscapes.enabled,
        })}
        value={cn({
          "Search or filter landscape...": !landscapes.enabled,
          [landscapes.search ?? ""]: landscapes.enabled,
        })}
        placeholder={"Search or filter landscape..."}
        onValueChange={handleValueChange}
        onKeyUp={handleKeyUp}
        onFocus={handleFocus}
      />

      {landscapes.enabled && (
        <button
          className={cn(
            "bg-foreground text-background animate-in fade-in absolute top-1 right-1 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 lg:top-3 lg:right-3 lg:size-10",
            "hover:text-destructive",
          )}
          onClick={handleClose}
        >
          <LucideXCircle className="size-5 text-current lg:size-6" />
        </button>
      )}
    </div>
  );
};
