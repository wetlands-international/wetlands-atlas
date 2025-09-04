"use client";

import React, { FC, useMemo } from "react";

import { useTranslations } from "next-intl";

import { formatNumber } from "@/lib/formats";
import { cn } from "@/lib/utils";

import { IndicatorChartData } from "@/containers/indicators/types";

interface Props {
  data: IndicatorChartData[];
}

const HorizontalBars: FC<Props & { title: string; unit: string }> = ({ data, title, unit }) => {
  const scale = useMemo(() => {
    const maxValue = Math.max(...data.map((item) => item.value));
    return (value: number) => (value / maxValue) * 100; // Scale to percentage
  }, [data]);

  if (data.length === 0) return null;

  return (
    <section>
      <header className="text-2xs mb-1 flex items-center justify-between leading-[22px] uppercase">
        <h3 className="font-medium">{title}</h3>
        <p className="font-normal">{unit}</p>
      </header>
      <ul className="space-y-3">
        {data
          .sort((a, b) => b.value - a.value)
          .map((item, index) => (
            <li key={index} className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2 text-base font-normal">
                <span className="flex-1">{item.label}</span>
                <span>{formatNumber(item.value)}</span>
              </div>
              <div className="h-2.5 w-full rounded-lg bg-[rgba(250,250,250,0.05)]">
                <div
                  className={cn({
                    "h-full rounded-l-lg": true,
                    "rounded-r-lg": scale(item.value) === 100,
                    "bg-green-700": item.type === "restoration",
                    "bg-green-100": item.type === "protection",
                  })}
                  style={{ width: `${scale(item.value)}%` }}
                ></div>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

function RankingChartComponent({ data }: Props) {
  const unit = data[0].unit;
  const wetlands = data.filter((d) => d.group === "wetlands");
  const nonWetlands = data.filter((d) => d.group === "non-wetlands");
  const t = useTranslations("insights.widgets");

  return (
    <div className="px-6">
      <div className="mt-7 w-full border-t border-dashed" />
      <HorizontalBars data={wetlands} title={t("wetlands")} unit={unit} />
      <div className="mt-3.5 w-full border-t border-dashed" />
      <HorizontalBars data={nonWetlands} title={t("non-wetlands")} unit={unit} />
      <div className="mt-5 flex justify-center gap-1.5 text-xs">
        <div className="flex items-center justify-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-700"></span>
          <span>{t("restoration")}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-green-100"></span>
          <span>{t("protection")}</span>
        </div>
      </div>
    </div>
  );
}

export default RankingChartComponent;
