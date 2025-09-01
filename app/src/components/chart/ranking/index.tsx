"use client";

import React, { useMemo } from "react";

import { formatNumber } from "@/lib/formats";
import { cn } from "@/lib/utils";

import { IndicatorChartData } from "@/containers/indicators/types";

export default function RankingChartComponent({ data }: { data: IndicatorChartData[] }) {
  const scale = useMemo(() => {
    const maxValue = Math.max(...data.map((item) => item.value));
    return (value: number) => (value / maxValue) * 100; // Scale to percentage
  }, [data]);

  return (
    <div className="px-6">
      <ul className="space-y-2">
        {data
          .sort((a, b) => b.value - a.value)
          .map((item, index) => (
            <li key={index} className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2 text-base font-normal">
                <span className="flex-1">{item.label}</span>
                <span className="text-blue-300">{formatNumber(item.value)}</span>
              </div>
              <div className="h-2.5 w-full rounded-lg bg-[rgba(250,250,250,0.05)]">
                <div
                  className={cn({
                    "h-full rounded-l-lg bg-blue-300": true,
                    "rounded-r-lg": scale(item.value) === 100,
                  })}
                  style={{ width: `${scale(item.value)}%` }}
                ></div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
