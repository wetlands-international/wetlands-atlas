"use client";
import { FC, useEffect, useState } from "react";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { useSyncLayers } from "@/app/(frontend)/[locale]/(app)/store";

import MapLegendItem from "@/containers/map/map-legend/item";

import Legend from "@/components/map/legend";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const MapLegend: FC = () => {
  const [showLegend, setShowLegend] = useState<boolean>(false);
  const [layers, setLayers] = useSyncLayers();

  useEffect(() => {
    if (layers.length > 0) {
      setShowLegend(true);
    }
  }, [layers]);

  useEffect(() => {
    if (layers.length === 0 && showLegend) {
      setShowLegend(false);
    }
  }, [layers, showLegend]);

  return (
    <div className="pointer-events-auto">
      <div
        className={cn({
          "legend-container pointer-events-none absolute bottom-16 left-1/2 z-50 w-xs -translate-x-10/12 translate-y-full opacity-0 transition-all duration-500 ease-in-out":
            true,
          "pointer-events-auto translate-y-0 opacity-100": showLegend,
        })}
      >
        <ScrollArea className="h-full rounded-lg px-2.5">
          <Legend
            sortable={{ enabled: true, handle: true }}
            onChangeOrder={(v) => setLayers(v.toReversed())}
          >
            {layers.toReversed().map((l) => (
              <MapLegendItem
                sortable={{ enabled: true, handle: true }}
                key={`map-legend-item-${l}`}
                id={l}
              />
            ))}
          </Legend>
        </ScrollArea>
      </div>

      <Button
        size="lg"
        variant="secondary"
        className={cn({
          "pointer-events-none flex w-28 translate-y-full cursor-pointer items-center gap-2 rounded-full text-sm font-normal opacity-0":
            true,
          "pointer-events-auto translate-y-0 border-2 opacity-100": layers.length > 0,
        })}
        onClick={() => setShowLegend((prev) => !prev)}
      >
        <span
          className={`flex items-center gap-1 transition-opacity duration-300 ${showLegend ? "opacity-100" : "pointer-events-none absolute opacity-0"} `}
        >
          <span>Hide</span>
          <ArrowDownIcon className="h-4 w-4" />
        </span>

        <span
          className={`flex items-center gap-1 transition-opacity duration-300 ${!showLegend ? "opacity-100" : "pointer-events-none absolute opacity-0"} `}
        >
          <span>Legend</span>
          <ArrowUpIcon className="h-4 w-4" />
        </span>
      </Button>
    </div>
  );
};

export default MapLegend;
