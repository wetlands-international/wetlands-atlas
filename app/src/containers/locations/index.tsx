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
      <ScrollArea className="relative flex w-full overflow-auto rounded-4xl px-2.5">
        {children}
      </ScrollArea>
    </section>
  );
};
