"use client";

import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Rectangle,
  BarProps,
  RectangleProps,
} from "recharts";

import { Tick } from "@/components/chart/tick";

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

export default function BarChartComponent() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8884d8" stopOpacity={1} />
            <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="name"
          axisLine={{
            stroke: "var(--foreground)",
            strokeWidth: 1,
            strokeOpacity: 1,
          }}
          angle={-30}
          tickLine={false}
          interval={0}
          tick={Tick}
        />
        <YAxis axisLine={false} tickLine={false} tick={Tick} />
        <Tooltip isAnimationActive={false} wrapperClassName="text-background" />
        <Bar
          dataKey="pv"
          fill="url(#colorUv)"
          shape={(props: unknown) => {
            const rectangleProps = props as RectangleProps & BarProps;

            return (
              <Rectangle
                {...rectangleProps}
                strokeDasharray={`${(rectangleProps.height ?? 0) + (rectangleProps.width ?? 0)} ${rectangleProps.width}`}
              />
            );
          }}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill="url(#colorUv)" stroke={"var(--foreground)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
