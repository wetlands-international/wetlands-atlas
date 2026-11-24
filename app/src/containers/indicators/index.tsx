"use client";

import { PropsWithChildren } from "react";

import { useAtomValue } from "jotai";

import { cn } from "@/lib/utils";

import {
  locationsAtom,
  useSyncInsight,
  useSyncRegion,
} from "@/app/(frontend)/[locale]/(app)/store";

import { ScrollArea } from "@/components/ui/scroll-area";

export const Indicators = ({ children }: PropsWithChildren) => {
  const { enabled } = useAtomValue(locationsAtom);
  const [region] = useSyncRegion();
  const [insight] = useSyncInsight();

  // Checks the region too, so that a legacy link without region shows the region selection screen only
  const visible = !enabled && !!region && !!insight;

  if (!visible) {
    return null;
  }

  return (
    <section
      className={cn(
        "fill-mode-forwards relative flex w-full grow flex-col overflow-hidden duration-300",
        {
          // Only in the sidebar of the large screens: not in the bottom sheet of the small ones
          "lg:animate-in lg:fade-in lg:slide-in-from-left-25 pointer-events-auto": visible,
          "animate-out fade-out slide-out-to-left-25 pointer-events-none": !visible,
        },
      )}
    >
      {/* Not inset on the small screens, where the header above it reaches the sides of the screen */}
      <ScrollArea className="relative flex w-full overflow-auto rounded-4xl lg:px-2.5">
        {children}
      </ScrollArea>
    </section>
  );
};
