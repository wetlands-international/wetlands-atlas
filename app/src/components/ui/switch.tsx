"use client";

import * as React from "react";

import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-4 w-8 shrink-0 cursor-pointer items-center rounded-full outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:from-accent data-[state=checked]:to-border data-[state=checked]:bg-linear-to-r",
        "data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-card-foreground pointer-events-none block size-3 rounded-full ring-0 transition-transform",
          "data-[state=checked]:bg-card data-[state=checked]:translate-x-4.5",
          "dark:data-[state=unchecked]:bg-foreground data-[state=unchecked]:translate-x-0.5",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
