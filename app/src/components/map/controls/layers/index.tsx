"use client";

import { FC, HTMLAttributes, PropsWithChildren, useState } from "react";

import { TooltipPortal } from "@radix-ui/react-tooltip";
import { LuLayers2 } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { CONTROL_BUTTON_STYLES } from "../constants";

interface LayersControlProps {
  id?: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

export const LayersControl: FC<PropsWithChildren<LayersControlProps>> = ({
  id,
  className,
  children,
}: PropsWithChildren<LayersControlProps>) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className={cn("flex flex-col space-y-0.5", className)}>
      <Popover onOpenChange={setPopoverOpen}>
        <Tooltip delayDuration={300}>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild autoFocus={false}>
              <button
                id={id}
                className={cn({
                  [CONTROL_BUTTON_STYLES.default]: true,
                  [CONTROL_BUTTON_STYLES.hover]: true,
                  [CONTROL_BUTTON_STYLES.active]: true,
                  [CONTROL_BUTTON_STYLES.open]: popoverOpen,
                })}
                aria-label="Layers"
                type="button"
              >
                <LuLayers2
                  className={cn({
                    [CONTROL_BUTTON_STYLES.icon]: true,
                  })}
                />
              </button>
            </TooltipTrigger>
          </PopoverTrigger>

          {!popoverOpen && (
            <TooltipPortal>
              <TooltipContent side="left" align="center">
                <div className="text-xxs">Layers</div>
              </TooltipContent>
            </TooltipPortal>
          )}

          <PopoverContent side="left" align="start">
            {children}
          </PopoverContent>
        </Tooltip>
      </Popover>
    </div>
  );
};

export default LayersControl;
