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
  Tooltip,
  Label,
  ReferenceArea,
  ReferenceLine,
} from "recharts";

import { IndicatorChartData } from "@/containers/indicators/types";

import { Tick } from "@/components/chart/tick";
import { ChartTooltip } from "@/components/chart/tooltip";

export default function BarChartComponent({ data }: { data: IndicatorChartData[] }) {
  const numericData = data.filter(
    (d): d is IndicatorChartData & { value: number } => typeof d.value === "number",
  );

  const wetlandsCount = numericData.filter((d) => d.group === "wetlands").length;
  const yMax = Math.max(...numericData.map((item) => item.value));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={numericData}
        margin={{
          top: 50,
          right: 30,
          left: 20,
          bottom: 80,
        }}
        barSize={20}
        barCategoryGap={16}
      >
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#97E0AA" stopOpacity={1} />
            <stop offset="100%" stopColor="rgb(44,95,96)" stopOpacity={0.19} />
          </linearGradient>

          <linearGradient id="activeColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="label"
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
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={Tick}
          label={
            <Label
              value={numericData[0]?.unit || ""}
              position="top"
              dy={-16}
              fill="var(--muted-foreground)"
              fontSize={10}
            />
          }
        />

        {numericData[wetlandsCount - 1] ? (
          <ReferenceArea
            x1={numericData[0].label}
            x2={numericData[wetlandsCount - 1].label}
            fill="none"
          >
            <Label
              value="Wetlands"
              position="insideTopRight"
              style={{
                fontSize: 10,
                fill: "var(--muted-foreground)",
                transform: "translate(-8px, -18%)",
              }}
            />
          </ReferenceArea>
        ) : null}

        {numericData[wetlandsCount - 1] && numericData[wetlandsCount] ? (
          <ReferenceLine
            stroke="var(--foreground)"
            strokeDasharray="3 3"
            position="start"
            ifOverflow="visible"
            segment={[
              { x: numericData[wetlandsCount].label, y: 0 },
              { x: numericData[wetlandsCount].label, y: yMax + yMax / 2 },
            ]}
          />
        ) : null}

        {numericData[wetlandsCount] ? (
          <ReferenceArea
            x1={numericData[wetlandsCount].label}
            x2={numericData[numericData.length - 1].label}
            fill="none"
          >
            <Label
              value="Non-wetlands"
              position="insideTopRight"
              style={{
                fontSize: 10,
                fill: "var(--muted-foreground)",
                transform: "translateY(-18%)",
              }}
            />
          </ReferenceArea>
        ) : null}

        <Tooltip
          content={ChartTooltip}
          isAnimationActive={false}
          cursor={{
            fill: "var(--foreground)",
            fillOpacity: 0.1,
          }}
        />

        <Bar
          dataKey="value"
          fill="url(#color)"
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
          {numericData.map((_, index) => (
            <Cell key={`cell-${index}`} fill="url(#color)" stroke={"var(--foreground)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
