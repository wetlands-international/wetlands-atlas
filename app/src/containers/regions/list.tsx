"use client";

import { useTranslations } from "next-intl";

import { useRegions } from "@/hooks/use-regions";

import { RegionsItem } from "@/containers/regions/item";

export const RegionsList = () => {
  const t = useTranslations("insights");
  const { data: regionsData } = useRegions();

  return (
    <div className="bg-background space-y-4 rounded-4xl p-6">
      <h1 className="font-display text-4xl text-blue-300">{t("title")}</h1>
      <p className="text-foreground text-sm">{t("description")}</p>

      <div className="space-y-2">
        <h2 className="text-muted-foreground text-xs leading-6 font-semibold tracking-[0.24px] uppercase">
          {t("focus-area")}
        </h2>

        <div className="flex flex-col gap-1 px-0.5">
          {regionsData.docs.map((region) => (
            <RegionsItem key={region.id} {...region} />
          ))}
        </div>
      </div>
    </div>
  );
};
