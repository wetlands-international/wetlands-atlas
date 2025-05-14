import React, { cloneElement, isValidElement } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { cn } from "@/lib/utils";

import { SortableItemProps } from "@/components/map/legend/types";

export const SortableItem: React.FC<SortableItemProps> = ({
  id,
  sortable,
  children,
}: SortableItemProps) => {
  const { attributes, listeners, transform, transition, isDragging, setNodeRef } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!isValidElement(children)) {
    throw new Error("SortableItem requires a valid React element as a child.");
  }

  const CHILD = cloneElement(children, {
    // @ts-expect-error No idea why this is not working
    sortable,
    listeners,
    attributes,
    isDragging,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn({
        "w-full": true,
        "opacity-0": isDragging,
      })}
      style={style}
      {...(!sortable.handle && {
        ...listeners,
        ...attributes,
      })}
    >
      {CHILD}
    </div>
  );
};

export default SortableItem;
