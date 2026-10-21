"use client";

import { useCallback, useMemo } from "react";

import { useTranslations } from "next-intl";

import { useSyncLayers, useSyncRegion } from "@/app/(frontend)/[locale]/(app)/store";

import { useContextualLayers } from "@/hooks/use-contextual-layers";
import { useRegions } from "@/hooks/use-regions";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Layers = () => {
  const t = useTranslations("layers");
  const [region] = useSyncRegion();
  const [layers, setLayers] = useSyncLayers();

  const { data: regionsData } = useRegions();
  const { data: contextualLayers } = useContextualLayers();

  // Inside a region, only its layers. On the global view, every region's layers, in the regions' order.
  const groups = useMemo(
    () =>
      regionsData.docs
        .filter(({ id }) => !region || id === region)
        .map((r) => ({
          region: r,
          layers: contextualLayers.filter((layer) => layer.region === r.id),
        }))
        .filter(({ layers }) => !!region || layers.length > 0),
    [regionsData, region, contextualLayers],
  );

  const listedLayerIds = useMemo(
    () => groups.flatMap(({ layers }) => layers.map(({ id }) => id)),
    [groups],
  );
  const activeCount = listedLayerIds.filter((id) => layers.includes(id)).length;

  // Only the listed layers, so that the indicator layers stay active
  const handleClear = useCallback(() => {
    setLayers((prev) => prev.filter((id) => !listedLayerIds.includes(id)));
  }, [listedLayerIds, setLayers]);

  return (
    <div className="flex flex-col px-6 pt-5 pb-2">
      <div className="flex flex-col gap-1.5 overflow-y-auto py-2">
        {groups.map(({ region, layers: regionLayers }) => (
          <section key={region.id} className="flex flex-col gap-1.5">
            <h2 className="text-muted-foreground text-xs leading-6 font-semibold tracking-[0.24px] uppercase">
              {t("title", { region: region.name })}
            </h2>
            {regionLayers.length > 0 && (
              <ul className="flex flex-col gap-1.5">
                {regionLayers.map((layer) => (
                  <li key={layer.id} className="flex items-center justify-between gap-2 px-3">
                    <label
                      htmlFor={layer.id}
                      className="grow cursor-pointer text-sm leading-5 select-none"
                    >
                      {layer.name}
                    </label>
                    <Switch
                      id={layer.id}
                      checked={layers.includes(layer.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setLayers((prev) => [...prev, layer.id]);
                        } else {
                          setLayers((prev) => prev.filter((l) => l !== layer.id));
                        }
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {!listedLayerIds.length && (
          <p className="text-muted-foreground px-3 text-sm leading-5">{t("empty")}</p>
        )}
      </div>

      {listedLayerIds.length > 0 && (
        <div className="flex items-center justify-between border-t border-dashed border-black/20 py-2">
          <span className="text-xs leading-4">
            {activeCount} / {listedLayerIds.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-2xs rounded-full leading-5 uppercase"
            disabled={!activeCount}
            onClick={handleClear}
          >
            {t("clear")}
          </Button>
        </div>
      )}
    </div>
  );
};
