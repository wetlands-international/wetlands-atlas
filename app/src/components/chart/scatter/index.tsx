"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
  Label,
} from "recharts";

import { IndicatorChartData } from "@/containers/indicators/types";

import ChartLegendContent from "@/components/chart/legend";
import { Tick } from "@/components/chart/tick";
import { ChartLabelTooltip } from "@/components/chart/tooltip";

export default function ScatterChartComponent({ data }: { data: IndicatorChartData[] }) {
  const points = data.map((d) => {
    const tuple = Array.isArray(d.value) ? d.value : [d.value, 0];
    const [x, y] = tuple;
    return { ...d, x, y, name: d.label };
  });
  const unit = data.reduce((acc, d) => d.unit || acc, "") || "";

  return (
    <div className="aspect-square">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 30,
            right: 0,
            bottom: 20,
            left: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray={"1.5 1.5"}
            syncWithTicks={false}
            stroke="rgba(255, 255, 255, 0.11)"
          />
          <XAxis
            dataKey="x"
            tick={Tick}
            tickLine={false}
            stroke="#fff"
            label={
              <Label
                value="Cost of intervention($/ha)"
                position="insideBottomRight"
                dy={5}
                dx={5}
                fill="var(--muted-foreground)"
                fontSize={10}
              />
            }
          />
          <YAxis
            dataKey="y"
            tick={Tick}
            stroke="#fff"
            tickLine={false}
            tickMargin={0}
            width={35}
            label={
              <Label
                value={unit}
                position="insideTopLeft"
                dy={-30}
                dx={-5}
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
                  { label: "Restoration", shape: "circle", filled: true },
                  { label: "Protection", shape: "circle" },
                ]}
              />
            }
          />
          <Scatter data={points} fill="#fff">
            {points.map((entry, index) => (
              <Cell
                key={`scatter-cell-${index}`}
                fill={
                  entry.type === "restoration" ? "var(--color-green-700)" : "var(--color-green-100)"
                }
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
