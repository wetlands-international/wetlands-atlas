"use client";

import { FC, HTMLAttributes, PropsWithChildren, useState } from "react";

import { TooltipPortal } from "@radix-ui/react-tooltip";
import { LuSettings } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { CONTROL_BUTTON_STYLES } from "../constants";

interface SettingsControlProps {
  id?: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

export const SettingsControl: FC<PropsWithChildren<SettingsControlProps>> = ({
  id,
  className,
  children,
}: PropsWithChildren<SettingsControlProps>) => {
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
                aria-label="Map settings"
                type="button"
              >
                <LuSettings
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
                <div className="text-xxs">Map settings</div>
              </TooltipContent>
            </TooltipPortal>
          )}

          <PopoverContent side="left" align="start" className="w-auto overflow-hidden p-0">
            {children}
          </PopoverContent>
        </Tooltip>
      </Popover>
    </div>
  );
};

export default SettingsControl;
