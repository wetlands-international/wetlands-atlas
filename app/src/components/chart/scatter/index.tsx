"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Label,
  Cell,
  Legend,
} from "recharts";

import { IndicatorChartData } from "@/containers/indicators/types";

import ChartLegendContent from "@/components/chart/legend";
import { Tick } from "@/components/chart/tick";
import { ChartLabelTooltip } from "@/components/chart/tooltip";

export default function ScatterChartComponent({ data }: { data: IndicatorChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{
          top: 30,
          right: 30,
          bottom: 20,
          left: 10,
        }}
      >
        <CartesianGrid
          strokeDasharray={"1.5 1.5"}
          syncWithTicks={false}
          stroke="rgba(255, 255, 255, 0.11)"
        />
        <XAxis
          dataKey="restoration"
          tick={Tick}
          tickLine={false}
          stroke="#fff"
          label={
            <Label
              value="Cost of intervention($/ha)"
              position="insideBottomRight"
              dy={10}
              fill="var(--muted-foreground)"
              fontSize={10}
            />
          }
        />
        <YAxis
          dataKey="protection"
          tick={Tick}
          stroke="#fff"
          tickLine={false}
          label={
            <Label
              value="Mitigation Potential (tCO2/ha)"
              position="insideTopLeft"
              dy={-30}
              fill="var(--muted-foreground)"
              fontSize={10}
            />
          }
        />
        <Tooltip content={ChartLabelTooltip} isAnimationActive={false} cursor={false} />
        <Legend
          verticalAlign="bottom"
          wrapperStyle={{ position: "relative" }}
          content={
            <ChartLegendContent
              items={[
                { label: "Wetlands", shape: "circle", filled: true },
                { label: "Non-wetlands", shape: "circle" },
              ]}
            />
          }
        />
        <Scatter data={data} fill="#fff">
          {data.map((entry, index) => (
            <Cell
              key={`scatter-cell-${index}`}
              fill={entry.group === "wetlands" ? "#fff" : "rgba(255, 255, 255, 0.10)"}
              stroke="#fff"
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
