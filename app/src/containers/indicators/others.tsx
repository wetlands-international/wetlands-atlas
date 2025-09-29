"use client";

import { FC, useCallback } from "react";

import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";

import {
  useSyncIndicators,
  useSyncLayers,
  useSyncLayersSettings,
} from "@/app/(frontend)/[locale]/(app)/store";

import InfoButton from "@/components/ui/info-button";
import { Lexical } from "@/components/ui/lexical";
import { Switch } from "@/components/ui/switch";

import { Indicator } from "@/payload-types";

const OtherIndicatorItem: FC<{ indicator: Indicator }> = ({ indicator }) => {
  const [indicators, setIndicators] = useSyncIndicators();
  const [, setLayers] = useSyncLayers();

  const [layersSettings, setLayersSettings] = useSyncLayersSettings();

  const handleSwitchChange = useCallback(
    (checked: boolean) => {
      if (!checked && layersSettings) {
        setLayersSettings(null);
      }

      setIndicators((prev) => {
        if (prev?.includes(indicator.id)) {
          const updatedIndicators = prev.filter((id) => id !== indicator.id);
          // If no indicators are left, reset layers
          if (updatedIndicators.length === 0) {
            return null;
          }

          return updatedIndicators;
        } else {
          return [...(prev || []), indicator.id];
        }
      });

      setLayers((prev) => {
        const newLayers = indicator?.layers?.docs?.map((l) => {
          if (typeof l !== "string" && "id" in l) {
            return l.id;
          }
          return l; // If l is already a string, return it as is
        });

        if (!newLayers?.length) return prev;

        // If the layers are already present, remove them
        if (prev?.length) {
          const filteredLayers = prev.filter((layer) => !newLayers.includes(layer));
          if (filteredLayers.length === prev.length) {
            // If no layers were removed, add the new layers
            return [...new Set([...prev, ...newLayers])]; // Ensure unique layers
          }
          return filteredLayers;
        }

        // If no layers are present, add the new layers
        return newLayers;
      });
    },
    [indicator.id, indicator.layers, layersSettings, setIndicators, setLayers, setLayersSettings],
  );

  return (
    <li className="flex items-center justify-between gap-2 border-b py-4 last:border-none">
      <div className="text-sm font-semibold uppercase">{indicator.name}</div>
      <div className="flex">
        {indicator.description && !!convertLexicalToPlaintext({ data: indicator.description }) && (
          <InfoButton>
            <div className="prose prose-invert prose-sm">
              <Lexical data={indicator.description} />
            </div>
          </InfoButton>
        )}
        {!!indicator.layers && !!indicator.layers.docs?.length && (
          <Switch
            checked={!!indicators?.includes(indicator.id)}
            onCheckedChange={handleSwitchChange}
          />
        )}
      </div>
    </li>
  );
};

const OtherIndicators: FC<{ indicators: Indicator[] }> = ({ indicators }) => {
  return (
    <div className="bg-background animate-in fade-in slide-in-from-left-0 rounded-4xl p-6 duration-500">
      <header className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-muted-foreground text-sm font-semibold uppercase">
            Other data layers
          </h2>
        </div>
      </header>
      <ul>
        {indicators.map((indicator) => (
          <OtherIndicatorItem key={indicator.id} indicator={indicator} />
        ))}
      </ul>
    </div>
  );
};

export default OtherIndicators;
