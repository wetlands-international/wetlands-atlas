"use client";

import { useEffect, useRef } from "react";

import { CommandInput } from "cmdk";
import { useAtom } from "jotai";
import { LucideXCircle } from "lucide-react";
import { LuFilter, LuSearch } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { storiesAtom } from "@/app/(frontend)/[locale]/(app)/store";

export const StoriesSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [stories, setStories] = useAtom(storiesAtom);

  const handleValueChange = (value: string) => {
    setStories({
      ...stories,
      search: value,
    });
  };

  const handleFocus = () => {
    setStories({
      search: undefined,
      enabled: true,
    });
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setStories({
        search: undefined,
        enabled: false,
      });
    }
  };

  const handleClose = () => {
    setStories({
      search: undefined,
      enabled: false,
    });
  };

  useEffect(() => {
    if (!stories.enabled) {
      inputRef.current?.blur();
    }
  }, [stories.enabled]);

  return (
    <div
      className={cn(
        "flex h-16 w-full cursor-pointer items-center justify-start gap-2 rounded-4xl text-left",
        stories.enabled && "bg-foreground outline-0",
      )}
    >
      <div
        className={cn(
          "bg-primary text-foreground pointer-events-none absolute top-2 left-2 flex size-12 shrink-0 items-center justify-center rounded-full",

          stories.enabled && "bg-foreground text-background",
        )}
      >
        {stories.enabled ? (
          <LuSearch className="h-4 w-4 text-current transition-colors" />
        ) : (
          <LuFilter className="h-4 w-4 text-current transition-colors" />
        )}
      </div>

      <CommandInput
        id="stories-search"
        ref={inputRef}
        className={cn({
          "h-full w-full rounded-4xl px-16 transition-colors duration-300": true,
          "text-background placeholder:text-muted-foreground outline-0": stories.enabled,
          "text-foreground placeholder:text-foreground outline-0": !stories.enabled,
        })}
        value={cn({
          "Search or filter story...": !stories.enabled,
          [stories.search ?? ""]: stories.enabled,
        })}
        placeholder={"Search or filter story..."}
        onValueChange={handleValueChange}
        onKeyUp={handleKeyUp}
        onFocus={handleFocus}
      />

      {stories.enabled && (
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
