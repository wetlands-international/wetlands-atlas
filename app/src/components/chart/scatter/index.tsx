"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Tick } from "@/components/chart/tick";
import { ChartTooltip } from "@/components/chart/tooltip";

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

export default function ScatterChartComponent() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{
          top: 5,
          right: 30,
          bottom: 20,
          left: 10,
        }}
      >
        <CartesianGrid strokeDasharray={"3 3"} syncWithTicks={false} />
        <XAxis dataKey="pv" name="stature" unit="cm" tick={Tick} />
        <YAxis type="number" dataKey="uv" name="weight" unit="kg" tick={Tick} />
        <Tooltip
          content={ChartTooltip}
          isAnimationActive={false}
          cursor={{
            fill: "var(--foreground)",
            fillOpacity: 0.1,
          }}
        />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
