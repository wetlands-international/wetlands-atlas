"use client";

import { PropsWithChildren } from "react";

import { useAtomValue } from "jotai";

import { cn } from "@/lib/utils";

import { locationsAtom } from "@/app/(frontend)/[locale]/(app)/store";

export const Locations = ({ children }: PropsWithChildren) => {
  const { enabled } = useAtomValue(locationsAtom);

  if (!enabled) {
    return null;
  }

  return (
    <section
      className={cn(
        "fill-mode-forwards bg-foreground absolute w-full rounded-4xl p-6 duration-300",
        {
          "animate-in fade-in slide-in-from-left-25 pointer-events-auto": enabled,
          "animate-out fade-out slide-out-to-left-25 pointer-events-none": !enabled,
        },
      )}
    >
      {children}
    </section>
  );
};
