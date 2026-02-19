"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { LuBookOpen } from "react-icons/lu";

import { useSyncInsight, useSyncLandscapeLayer } from "@/app/(frontend)/[locale]/(app)/store";

import { Switch } from "@/components/ui/switch";

import { collectionByIdQueryOptions } from "@/services/sdk-query";

export const LandscapesIndicator = () => {
  const locale = useLocale();
  const [insight] = useSyncInsight();
  const t = useTranslations();

  const [landscapeLayer, setLandscapeLayer] = useSyncLandscapeLayer();

  const { data: categoryData } = useQuery({
    ...collectionByIdQueryOptions("categories", insight || "invalid", {
      depth: 1,
      locale,
    }),
    enabled: !!insight,
  });

  return (
    <div
      key="landscapes-indicator"
      className="bg-background animate-in fade-in slide-in-from-left-0 rounded-4xl p-6 duration-500"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-400">
          <LuBookOpen className="text-foreground h-4 w-4" />
        </div>
        <header className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase">{t("landscapes.title")}</h2>
            <div className="flex items-center gap-2">
              <Switch checked={landscapeLayer} onCheckedChange={setLandscapeLayer} />
            </div>
          </div>

          <div className="prose prose-invert prose-sm prose-p:leading-5 pr-4">
            <p>{t("landscapes.indicator", { category: categoryData?.name ?? "" })}</p>
          </div>
        </header>
      </div>
    </div>
  );
};
