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

import ChartLegendContent from "@/components/chart/legend";
import { Tick } from "@/components/chart/tick";

interface IndicatorData {
  name: string;
  restoration: number;
  protection: number;
  isWetland?: boolean;
}

export default function StackedBarChartComponent({ data }: { data: IndicatorData[] }) {
  const wetlandsCount = data.filter((d) => d.isWetland).length;
  const yMax = Math.max(...data.map((item) => item.protection));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 10,
        }}
        barSize={20}
        barCategoryGap={16}
      >
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#97E0AA" stopOpacity={1} />
            <stop offset="100%" stopColor="#97E0AA" stopOpacity={0} />
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
          xAxisId={0}
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
        <XAxis dataKey="name" xAxisId={1} hide />
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

        <ReferenceArea x1={data[0].name} x2={data[wetlandsCount - 1].name} fill="none">
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
            { x: data[wetlandsCount].name, y: 0 },
            { x: data[wetlandsCount].name, y: yMax + yMax / 2 },
          ]}
        />

        <ReferenceArea x1={data[wetlandsCount].name} x2={data[data.length - 1].name} fill="none">
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
          wrapperStyle={{ position: "relative" }}
          content={
            <ChartLegendContent
              items={[
                { label: "Wetlands", shape: "square", pattern: true },
                { label: "Non-wetlands", shape: "square" },
              ]}
            />
          }
        />
        <Bar
          dataKey="protection"
          xAxisId={0}
          shape={(props: unknown) => {
            const rectangleProps = props as RectangleProps & BarProps;
            return (
              <Rectangle
                {...rectangleProps}
                strokeDasharray={`${(rectangleProps.height ?? 0) + (rectangleProps.width ?? 0)} ${rectangleProps.width}`}
              />
            );
          }}
          activeBar={{ fill: "url(#activeColor)" }}
        >
          {data.map((_, index) => (
            <Cell
              key={`protection-cell-${index}`}
              fill="url(#color)"
              stroke={"var(--foreground)"}
            />
          ))}
        </Bar>

        <Bar
          dataKey="restoration"
          xAxisId={1}
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
      </BarChart>
    </ResponsiveContainer>
  );
}
