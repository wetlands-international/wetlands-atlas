"use client";

import { Children, FC, HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

import { PopoverProvider } from "@/components/map/controls/provider";

type ControlsProps = PropsWithChildren<{
  className?: HTMLAttributes<HTMLDivElement>["className"];
}>;

export const Controls: FC<ControlsProps> = ({
  className = "absolute top-20 right-4",
  children,
}: ControlsProps) => (
  <PopoverProvider>
    <div
      className={cn({
        "bg-foreground/10 flex flex-col items-center justify-center space-y-2 rounded-4xl p-0.5 backdrop-blur-lg":
          true,
        [className]: !!className,
      })}
    >
      {Children.map(children, (child) => child)}
    </div>
  </PopoverProvider>
);

export default Controls;
