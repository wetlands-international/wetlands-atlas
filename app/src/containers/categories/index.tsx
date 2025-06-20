"use client";

import { PropsWithChildren } from "react";

import { useAtomValue } from "jotai";

import { cn } from "@/lib/utils";

import { locationsAtom, useSyncInsight } from "@/app/(frontend)/[locale]/(app)/store";

import { ScrollArea } from "@/components/ui/scroll-area";

export const Categories = ({ children }: PropsWithChildren) => {
  const { enabled } = useAtomValue(locationsAtom);
  const [insight] = useSyncInsight();

  const visible = !enabled && !insight;

  if (!visible) {
    return null;
  }

  return (
    <section
      className={cn(
        "fill-mode-forwards relative flex w-full grow flex-col overflow-hidden duration-300",
        {
          "animate-in fade-in slide-in-from-left-25 pointer-events-auto": visible,
          "animate-out fade-out slide-out-to-left-25 pointer-events-none": !visible,
        },
      )}
    >
      <ScrollArea className="relative flex w-full overflow-auto rounded-4xl px-2.5">
        {children}
      </ScrollArea>
    </section>
  );
};
