import { FC } from "react";

import { useTranslations } from "next-intl";

import Description from "@/containers/home/section/description";
import Kicker from "@/containers/home/section/kicker";
import Stats from "@/containers/home/section/stats";
import Title from "@/containers/home/section/title";

const EnginesForEconomicDevelopment: FC = () => {
  const t = useTranslations("home.engines-for-economic-development");

  return (
    <>
      <div>
        <Kicker>{t("kicker")}</Kicker>
        <Title>{t("title")}</Title>
        <Description>
          {t.rich("description", {
            p: (chunk) => <p>{chunk}</p>,
            strong: (chunk) => <strong>{chunk}</strong>,
          })}
        </Description>
      </div>
      <Stats
        size="l"
        items={[{ caption: t.rich("stats.1", { sup: (chunk) => <sup>{chunk}</sup> }), value: 7.5 }]}
      />
    </>
  );
};

export const EnginesForEconomicDevelopmentSubContent: FC = () => {
  const t = useTranslations("home.engines-for-economic-development");

  return <p className="text-xs font-medium">{t("sup")}</p>;
};

export default EnginesForEconomicDevelopment;
