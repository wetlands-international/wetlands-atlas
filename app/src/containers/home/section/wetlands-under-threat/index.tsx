import { FC } from "react";

import { useTranslations } from "next-intl";

import Kicker from "@/containers/home/section/kicker";
import Stats from "@/containers/home/section/stats";
import Title from "@/containers/home/section/title";

const WetlandsUnderThreat: FC = () => {
  const t = useTranslations("home.wetlands-under-threat");

  return (
    <>
      <div>
        <Kicker>{t("kicker")}</Kicker>
        <Title>{t.rich("title", { sup: (chunk) => <sup>{chunk}</sup> })}</Title>
        <div className="space-y-4 text-xl">
          {t.rich("description", {
            p: (chunk) => <p>{chunk}</p>,
          })}
        </div>
      </div>
      <Stats
        size="s"
        title={t.rich("stats.title", { sup: (chunk) => <sup>{chunk}</sup> })}
        items={[
          { caption: t("stats.1"), value: 43 },
          { caption: t("stats.2"), value: 30 },
          { caption: t("stats.3"), value: 19 },
          { caption: t("stats.4"), value: 8 },
        ]}
      />
    </>
  );
};

export const WetlandsUnderThreatSubContent: FC = () => {
  const t = useTranslations("home.wetlands-under-threat");

  return <p className="text-xs font-medium">{t("sup")}</p>;
};

export default WetlandsUnderThreat;
