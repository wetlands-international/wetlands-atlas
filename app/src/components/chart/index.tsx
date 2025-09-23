import { FC } from "react";

import { useTranslations } from "next-intl";

import { IndicatorChartData } from "@/containers/indicators/types";

import { RankingChart, RankingChartSection } from "@/components/chart/ranking";

type ValidIndicatorData = IndicatorChartData & { value: number };
const getValidData = (data: IndicatorChartData[]): ValidIndicatorData[] => {
  return data.filter((d) => typeof d.value === "number") as ValidIndicatorData[];
};

interface WidgetChartProps {
  indicator: string;
  data: IndicatorChartData[];
}

const WidgetChart: FC<WidgetChartProps> = ({ indicator, data }) => {
  const t = useTranslations("insights.widgets");

  switch (indicator) {
    case "wetlands-mitigation-potential": {
      const validData = getValidData(data);
      const unit = data.reduce((acc, d) => d.unit || acc, "") || "";

      const wetlands = validData.filter((d) => d.group === "wetlands");
      const nonWetlands = validData.filter((d) => d.group === "non-wetlands");

      const sections: RankingChartSection[] = [
        { data: wetlands, title: t("wetlands"), type: "bars", unit },
        { data: nonWetlands, title: t("non-wetlands"), type: "bars", unit },
      ];

      return <RankingChart sections={sections} withLegend />;
    }

    case "cost-of-intervention": {
      return <RankingChart data={getValidData(data)} />;
    }

    case "return-on-investment": {
      return <RankingChart data={getValidData(data)} />;
    }

    default: {
      console.warn(`Unknown indicator type: ${indicator}`);
      return (
        <div className="px-6">
          <p className="py-8 text-center text-gray-500">Unsupported chart type: {indicator}</p>
        </div>
      );
    }
  }
};

export default WidgetChart;
