"use client";
import { FC, useState } from "react";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import Legend from "@/components/map/legend";
import LegendItem from "@/components/map/legend/item";
import { LegendTypeBasic } from "@/components/map/legend/item-types";
import { Button } from "@/components/ui/button";

const MapLegend: FC = () => {
  const [showLegend, setShowLegend] = useState<boolean>(false);

  return (
    <div className="pointer-events-auto">
      <div
        className={`bg-popover text-popover-foreground legend-container absolute bottom-16 left-1/2 z-50 w-xs -translate-x-10/12 rounded-lg transition-all duration-500 ease-in-out ${
          showLegend
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        } `}
      >
        <Legend
          sortable={{ enabled: true, handle: true }}
          onChangeOrder={(v) => {
            console.log(v);
          }}
        >
          <LegendItem
            id="wetland-types-1"
            name="Wetland types"
            sortable={{ enabled: false, handle: true }}
          >
            <LegendTypeBasic
              items={[
                { label: "Rivirine", color: "red", value: 1 },
                { label: "Flood plain", color: "blue", value: 1 },
                { label: "High Altitude", color: "green", value: 1 },
              ]}
            />
          </LegendItem>
          <LegendItem
            id="wetland-types-2"
            name="Wetland types"
            sortable={{ enabled: false, handle: true }}
          />
        </Legend>
      </div>

      <Button
        size="lg"
        variant="secondary"
        className={cn({
          "flex w-28 cursor-pointer items-center gap-2 rounded-full text-sm font-normal": true,
          "border-2": showLegend,
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
