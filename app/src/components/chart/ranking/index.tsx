"use client";

import React, { FC, useMemo } from "react";

import { useTranslations } from "next-intl";

import { formatNumber } from "@/lib/formats";
import { cn } from "@/lib/utils";

import { IndicatorChartData } from "@/containers/indicators/types";

type ValidIndicatorData = IndicatorChartData & { value: number };
type RankingChartSection = {
  data: ValidIndicatorData[];
  title: string;
  type: "bars" | "list";
  unit: string;
};
interface Props {
  data: Array<ValidIndicatorData>;
}

const RankingChartSectionHeader: FC<{ title: string; unit: string }> = ({ title, unit }) => (
  <header className="text-2xs mb-1 flex items-center justify-between leading-[22px] uppercase">
    <h3 className="font-medium">{title}</h3>
    <p className="font-normal">{unit}</p>
  </header>
);

const RankingChartList: FC<Props & { title: string; unit: string }> = ({ data, title, unit }) => {
  if (data.length === 0) return null;

  return (
    <section>
      <RankingChartSectionHeader title={title} unit={unit} />
      <ul className="space-y-3">
        {data
          .sort((a, b) => b.value - a.value)
          .map((item, index) => (
            <li key={index} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-2 text-base font-normal">
                <span>{item.label}</span>
                <span className="flex-1 border-b border-dotted"></span>
                <span>{formatNumber(item.value)}</span>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

const RankingChartBars: FC<Props & { title: string; unit: string }> = ({ data, title, unit }) => {
  const scale = useMemo(() => {
    const maxValue = Math.max(...data.map((item) => item.value));
    return (value: number) => (value / maxValue) * 100; // Scale to percentage
  }, [data]);

  if (data.length === 0) return null;

  return (
    <section>
      <RankingChartSectionHeader title={title} unit={unit} />
      <ul className="space-y-4">
        {data
          .sort((a, b) => b.value - a.value)
          .map((item, index) => (
            <li key={index} className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2 text-base font-normal">
                <span className="flex-1">{item.label}</span>
                <span>{formatNumber(item.value)}</span>
              </div>
              <div className="h-[7px] w-full rounded-lg bg-[rgba(250,250,250,0.05)]">
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

const RankingChartLegend: FC = () => {
  const t = useTranslations("insights.widgets");

  return (
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
  );
};

const RankingSection: FC<{
  section: RankingChartSection;
  isFirst?: boolean;
}> = ({ section }) => {
  const { title, unit, data, type } = section;
  if (data.length === 0) return null;

  return (
    <>
      <div className="mt-7 w-full border-t border-dashed border-t-white" />
      {type === "bars" ? (
        <RankingChartBars data={data} title={title} unit={unit} />
      ) : type === "list" ? (
        <RankingChartList data={data} title={title} unit={unit} />
      ) : null}
    </>
  );
};

const RankingChart: FC<{
  sections: Array<RankingChartSection>;
  withLegend?: boolean;
}> = ({ sections, withLegend }) => {
  return (
    <div className="px-6">
      {sections.map((section) => (
        <RankingSection key={`ranking-chart-section-${section.title}`} section={section} />
      ))}
      {withLegend && <RankingChartLegend />}
    </div>
  );
};

export { RankingChart, RankingChartLegend, type RankingChartSection };
