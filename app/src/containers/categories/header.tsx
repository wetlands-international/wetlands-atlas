"use client";

import { useCallback } from "react";

import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { LuChevronLeft } from "react-icons/lu";

import {
  tmpBboxAtom,
  useSyncIndicators,
  useSyncInsight,
  useSyncLayers,
  useSyncLayersSettings,
  useSyncLocation,
  useSyncRegion,
} from "@/app/(frontend)/[locale]/(app)/store";

import { useGlobalLocations } from "@/hooks/use-global-locations";
import { useRegions } from "@/hooks/use-regions";

export const CategoriesHeader = () => {
  const t = useTranslations("common");
  const [region, setRegion] = useSyncRegion();
  const [, setLocation] = useSyncLocation();
  const [, setInsight] = useSyncInsight();
  const [, setIndicators] = useSyncIndicators();
  const [, setLayers] = useSyncLayers();
  const [, setLayersSettings] = useSyncLayersSettings();
  const setTmpBbox = useSetAtom(tmpBboxAtom);

  const { data: regionsData } = useRegions();
  const { unionBbox } = useGlobalLocations();

  const currentRegion = regionsData.docs.find((r) => r.id === region);

  const handleBack = useCallback(() => {
    setRegion(null);
    setLocation(null);
    setInsight(null);
    setIndicators(null);
    setLayers(null);
    setLayersSettings(null);
    setTmpBbox(unionBbox);
  }, [
    setRegion,
    setLocation,
    setInsight,
    setIndicators,
    setLayers,
    setLayersSettings,
    setTmpBbox,
    unionBbox,
  ]);

  return (
    <div className="bg-background space-y-2 rounded-4xl px-6 pt-4 pb-6">
      <button
        type="button"
        className="text-2xs flex h-8 cursor-pointer items-center gap-1 font-medium text-[#5AC4C6] uppercase hover:underline"
        onClick={handleBack}
      >
        <LuChevronLeft className="size-4" />
        {t("back")}
      </button>

      <div className="space-y-4">
        <h1 className="font-display text-4xl text-blue-300">{currentRegion?.introTitle}</h1>
        <p className="text-foreground text-sm">{currentRegion?.introDescription}</p>
      </div>
    </div>
  );
};
