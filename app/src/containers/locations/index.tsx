"use client";

import { PropsWithChildren } from "react";

import { useAtomValue } from "jotai";

import { cn } from "@/lib/utils";

import { locationsAtom } from "@/app/(frontend)/[locale]/(app)/store";

import { ScrollArea } from "@/components/ui/scroll-area";

export const Locations = ({ children }: PropsWithChildren) => {
  const { enabled } = useAtomValue(locationsAtom);

  if (!enabled) {
    return null;
  }

  return (
    <section
      className={cn(
        "fill-mode-forwards relative flex w-full grow flex-col overflow-hidden duration-300",
        {
          "animate-in fade-in slide-in-from-left-25 pointer-events-auto": enabled,
          "animate-out fade-out slide-out-to-left-25 pointer-events-none": !enabled,
        },
      )}
    >
      {/* Not inset on the small screens, where the header above it reaches the sides of the screen. Its content as wide
          as the list, not as the longest name, for the names to be truncated: Radix wraps it in a table, which grows
          to fit it. */}
      <ScrollArea className="relative flex w-full overflow-auto rounded-4xl lg:px-2.5 [&_[data-slot=scroll-area-viewport]>div]:block!">
        {children}
      </ScrollArea>
    </section>
  );
};
