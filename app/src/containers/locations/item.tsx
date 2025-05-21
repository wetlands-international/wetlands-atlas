"use client";

import { PropsWithChildren } from "react";

import { CommandItem } from "cmdk";

export const LocationsItem = ({ children }: PropsWithChildren) => {
  return (
    <CommandItem
      className="text-background data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground text-left"
      onSelect={(v) => {
        console.log(v);
      }}
    >
      {children}
    </CommandItem>
  );
};
// Compare this snippet from src/containers/locations/list.tsx:
