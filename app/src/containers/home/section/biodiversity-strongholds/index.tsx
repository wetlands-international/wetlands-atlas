import { FC } from "react";

import { useTranslations } from "next-intl";

import Kicker from "@/containers/home/section/kicker";
import Stats from "@/containers/home/section/stats";
import Title from "@/containers/home/section/title";

const BiodiversityStrongholds: FC = () => {
  const t = useTranslations("home.biodiversity-strongholds");

  return (
    <>
      <div>
        <Kicker>{t("kicker")}</Kicker>
        <Title>{t("title")}</Title>
        <div className="space-y-4 text-xl">
          {t.rich("description", {
            p: (chunk) => <p>{chunk}</p>,
          })}
        </div>
      </div>
      <Stats
        size="l"
        items={[{ caption: t.rich("stats.1", { sup: (chunk) => <sup>{chunk}</sup> }), value: 19 }]}
      />
    </>
  );
};

export const BiodiversityStrongholdsSubContent: FC = () => {
  const t = useTranslations("home.biodiversity-strongholds");

  return <p className="text-xs font-medium">{t("sup")}</p>;
};

export default BiodiversityStrongholds;
