"use client";

import { FC, useState } from "react";

import { Label, Pie, PieChart as RePieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import { ValidIndicatorData } from "@/components/chart/types";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const PieChart: FC<{ data: ValidIndicatorData[] }> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sorted = [...(data || [])].sort((a, b) => b.value - a.value);
  const center = sorted?.[activeIndex];
  const showPercentageValue = sorted.length === 1 && sorted[0]?.unit === "%";
  const chartData = showPercentageValue
    ? [
        {
          name: sorted[0].label,
          value: sorted[0].value,
          fill: sorted[0].color,
        },
        {
          name: "",
          value: Math.max(0, 100 - sorted[0].value),
          fill: "rgba(10, 67, 92, 0.30)",
        },
      ]
    : sorted.map((d) => ({
        name: d.label,
        value: d.value,
        fill: d.color,
      }));

  const chartConfig = sorted.reduce<ChartConfig>((acc, d) => {
    acc[d.label] = { label: d.label, color: d.color };
    return acc;
  }, {});

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
      <RePieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          startAngle={90}
          endAngle={-270}
          innerRadius={85}
          activeIndex={activeIndex}
          activeShape={
            !showPercentageValue
              ? (props: PieSectorDataItem) => <Sector {...props} stroke="#ffffff" strokeWidth={2} />
              : undefined
          }
          onMouseEnter={(_, index) => {
            if (showPercentageValue) return;
            setActiveIndex(index);
          }}
          onMouseLeave={() => {
            if (showPercentageValue) return;
            setActiveIndex(0);
          }}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <foreignObject
                    x={(viewBox.cx || 0) - 70}
                    y={(viewBox.cy || 0) - 50}
                    width={140}
                    height={100}
                  >
                    <div className="flex h-full flex-col items-center justify-center px-4 py-2 text-center">
                      <div className="fill-foreground mb-3 text-4xl leading-none font-bold">
                        {center ? `${center.value.toFixed(1)}%` : ""}
                      </div>
                      <div className="fill-foreground text-sm leading-tight font-normal break-words">
                        {center ? center.label : ""}
                      </div>
                    </div>
                  </foreignObject>
                );
              }
            }}
          />
        </Pie>
      </RePieChart>
    </ChartContainer>
  );
};

export default PieChart;
