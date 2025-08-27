"use client";

import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Rectangle,
  BarProps,
  RectangleProps,
  ReferenceLine,
  Label,
  ReferenceArea,
  Legend,
} from "recharts";

import { IndicatorChartData } from "@/containers/indicators/types";

import ChartLegendContent from "@/components/chart/legend";
import { Tick } from "@/components/chart/tick";

export default function StackedBarChartComponent({ data }: { data: IndicatorChartData[] }) {
  const wetlandsCount = data.filter((d) => d.group === "wetlands").length;
  const yMax = Math.max(...data.map((item) => item.value));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 50,
          right: 30,
          left: 20,
          bottom: 65,
        }}
        barSize={20}
        barCategoryGap={16}
      >
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(42, 246, 250)" stopOpacity={0.6} />
            <stop offset="74.52%" stopColor="rgb(44, 95, 96)" stopOpacity={0.6} />
          </linearGradient>

          <pattern
            id="restorationDotPattern"
            x="0"
            y="0"
            width="5"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0.4" y="0.4" width="1.6" height="1.6" fill="var(--foreground)" />
            <rect x="3.4" y="3.4" width="1.6" height="1.6" fill="var(--foreground)" />
          </pattern>
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
          tick={(props) =>
            Tick({
              ...props,
              textAnchor: "end",
            })
          }
        />
        <XAxis dataKey="name" xAxisId="overlay" hide />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={Tick}
          label={
            <Label
              value="tCO2/ha"
              position="top"
              dy={-16}
              fill="var(--muted-foreground)"
              fontSize={10}
            />
          }
        />

        <ReferenceArea x1={data[0].label} x2={data[wetlandsCount - 1].label} fill="none">
          <Label
            value="Wetlands"
            position="insideTopRight"
            style={{
              fontSize: 10,
              fill: "var(--muted-foreground)",
              transform: "translate(-8px, -24px)",
            }}
          />
        </ReferenceArea>

        <ReferenceLine
          stroke="var(--foreground)"
          strokeDasharray="3 3"
          position="start"
          ifOverflow="visible"
          segment={[
            { x: data[wetlandsCount].label, y: 0 },
            { x: data[wetlandsCount].label, y: yMax + yMax / 2 },
          ]}
        />

        <ReferenceArea x1={data[wetlandsCount].label} x2={data[data.length - 1].label} fill="none">
          <Label
            value="Non-wetlands"
            position="insideTopRight"
            style={{
              fontSize: 10,
              fill: "var(--muted-foreground)",
              transform: "translateY(-24px)",
            }}
          />
        </ReferenceArea>

        <Legend
          verticalAlign="bottom"
          wrapperStyle={{ position: "relative", marginTop: 60 }}
          content={
            <ChartLegendContent
              items={[
                { label: "Restoration", shape: "square", pattern: true },
                { label: "Protection", shape: "square" },
              ]}
            />
          }
        />

        <Bar
          dataKey={(d) => d.restoration + d.protection}
          xAxisId="overlay"
          isAnimationActive={false}
          shape={(props: unknown) => {
            const { x = 0, y = 0, width = 0, height = 0 } = props as RectangleProps & BarProps;
            return (
              <Rectangle
                x={x}
                y={y}
                width={width}
                height={height}
                fill="url(#color)"
                stroke="var(--foreground)"
              />
            );
          }}
        />

        <Bar
          dataKey="restoration"
          stackId="a"
          fill="none"
          shape={(props: unknown) => {
            const { x = 0, y = 0, width = 0, height = 0 } = props as RectangleProps & BarProps;
            return (
              <>
                <Rectangle
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill="url(#restorationDotPattern)"
                />
                <line
                  x1={x}
                  x2={x + width}
                  y1={y}
                  y2={y}
                  stroke="var(--foreground)"
                  strokeWidth={1}
                />
              </>
            );
          }}
        />

        <Bar
          dataKey="protection"
          stackId="a"
          shape={(props: unknown) => {
            const rectProps = props as RectangleProps & BarProps;
            return (
              <Rectangle
                {...rectProps}
                fill="transparent"
                strokeDasharray={`${(rectProps.height ?? 0) + (rectProps.width ?? 0)} ${rectProps.width}`}
              />
            );
          }}
        >
          {data.map((_, index) => (
            <Cell key={`protection-cell-${index}`} fill="transparent" stroke="var(--foreground)" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
