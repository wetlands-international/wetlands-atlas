"use client";
import React, { useMemo, Children, isValidElement } from "react";

import { cn } from "@/lib/utils";

import SortableList from "./sortable/list";
import { LegendProps } from "./types";

export const Legend: React.FC<LegendProps> = ({
  children,
  className = "",
  sortable,
  onChangeOrder,
}: LegendProps) => {
  const isChildren = useMemo(() => {
    return !!Children.count(Children.toArray(children).filter((c) => isValidElement(c)));
  }, [children]);

  return (
    <div
      className={cn({
        "relative flex max-h-[700px] grow flex-col rounded-lg select-none": true,
        hidden: !isChildren,
        [className]: !!className,
      })}
    >
      {isChildren && (
        <div className="bg-popover text-popover-foreground flex h-full flex-col">
          {!!sortable.enabled && !!onChangeOrder && (
            <SortableList sortable={sortable} onChangeOrder={onChangeOrder}>
              {children}
            </SortableList>
          )}

          {!sortable.enabled && children}
        </div>
      )}
    </div>
  );
};

export default Legend;
