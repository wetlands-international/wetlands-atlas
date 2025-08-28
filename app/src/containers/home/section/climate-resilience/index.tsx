import { FC } from "react";

import { useTranslations } from "next-intl";

import Kicker from "@/containers/home/section/kicker";
import Stats from "@/containers/home/section/stats";
import Title from "@/containers/home/section/title";

const ClimateResilienceSection: FC = () => {
  const t = useTranslations("home.climate-resilience");

  return (
    <>
      <div>
        <Kicker>{t("kicker")}</Kicker>
        <Title>{t("title")}</Title>
        <p className="text-xl">
          {t.rich("description", { strong: (chunk) => <strong>{chunk}</strong> })}
        </p>
      </div>
      <Stats
        size="m"
        items={[
          { caption: t("stats.1"), value: 3 },
          { caption: t("stats.2"), value: 31.1 },
        ]}
      />
    </>
  );
};

export const ClimateResilienceSubContent: FC = () => {
  const t = useTranslations("home.climate-resilience");

  return <p className="text-xs font-medium">{t("sup")}</p>;
};

export default ClimateResilienceSection;
