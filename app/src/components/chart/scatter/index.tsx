"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Tick } from "@/components/chart/tick";

const data = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
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
        <CartesianGrid strokeDasharray={"3 3"} />
        <XAxis dataKey="x" name="stature" unit="cm" tick={Tick} interval={0} scale="linear" />
        <YAxis type="number" dataKey="y" name="weight" unit="kg" tick={Tick} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
