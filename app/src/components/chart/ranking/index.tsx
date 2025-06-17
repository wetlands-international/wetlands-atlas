"use client";

import React, { useMemo } from "react";

const data = [
  {
    name: "Peatland",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Floodplain",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Mangroves",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function RankingChartComponent() {
  const scale = useMemo(() => {
    const maxValue = Math.max(...data.map((item) => item.pv));
    return (value: number) => (value / maxValue) * 100; // Scale to percentage
  }, []);

  return (
    <div className="px-6">
      <ul className="space-y-2">
        {data
          .sort((a, b) => b.pv - a.pv)
          .map((item, index) => (
            <li key={index} className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-1">
                <span className="shrink-0 text-sm">{item.name}</span>
                <span className="text-muted-foreground text-sm">{item.pv}</span>
              </div>
              <div className="h-2.5 w-full">
                <div className="h-2.5 bg-blue-500" style={{ width: `${scale(item.pv)}%` }}></div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
