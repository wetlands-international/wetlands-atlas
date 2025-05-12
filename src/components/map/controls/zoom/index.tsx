"use client";

import { FC, useCallback, MouseEvent, HTMLAttributes, useEffect, useState } from "react";

import { TooltipPortal } from "@radix-ui/react-tooltip";
import { LuZoomIn, LuZoomOut } from "react-icons/lu";
import { useMap } from "react-map-gl/mapbox";
import { useDebounceCallback } from "usehooks-ts";

import { cn } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { CONTROL_BUTTON_STYLES } from "../constants";

interface ZoomControlProps {
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

export const ZoomControl: FC<ZoomControlProps> = ({ className }: ZoomControlProps) => {
  const { current: mapRef } = useMap();
  const [zoom, setZoom] = useState<number>(Math.round(mapRef?.getZoom() ?? 0));
  // const zoom = Math.round(mapRef?.getZoom() ?? 0);
  const minZoom = mapRef?.getMinZoom();
  const maxZoom = mapRef?.getMaxZoom();

  const increaseZoom = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      mapRef?.zoomIn();
    },
    [mapRef],
  );

  const decreaseZoom = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      mapRef?.zoomOut();
    },
    [mapRef],
  );

  const handleZoom = useDebounceCallback(() => {
    if (mapRef) {
      const newZoom = Math.round(mapRef.getZoom());
      setZoom(newZoom);
    }
  }, 100);

  useEffect(() => {
    if (mapRef) {
      mapRef.on("zoom", handleZoom);
    }
    return () => {
      if (mapRef) {
        mapRef.off("zoom", handleZoom);
      }
    };
  }, [handleZoom, mapRef]);

  return (
    <div className={cn("flex flex-col", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn({
              [CONTROL_BUTTON_STYLES.default]: true,
              "rounded-none rounded-t-lg": true,
              [CONTROL_BUTTON_STYLES.hover]: zoom !== maxZoom,
              [CONTROL_BUTTON_STYLES.active]: zoom !== maxZoom,
              [CONTROL_BUTTON_STYLES.disabled]: zoom === maxZoom,
            })}
            aria-label="Zoom in"
            type="button"
            disabled={zoom === maxZoom}
            onClick={increaseZoom}
          >
            <LuZoomIn className="h-full w-full" />
          </button>
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent side="left" align="center">
            <div className="text-xxs">Zoom in</div>
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn({
              [CONTROL_BUTTON_STYLES.default]: true,
              "rounded-none rounded-b-lg": true,
              [CONTROL_BUTTON_STYLES.hover]: zoom !== minZoom,
              [CONTROL_BUTTON_STYLES.active]: zoom !== minZoom,
              [CONTROL_BUTTON_STYLES.disabled]: zoom === minZoom,
            })}
            aria-label="Zoom out"
            type="button"
            disabled={zoom === minZoom}
            onClick={decreaseZoom}
          >
            <LuZoomOut className="h-full w-full" />
          </button>
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent side="left" align="center">
            <div className="text-xxs">Zoom out</div>
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </div>
  );
};

export default ZoomControl;
