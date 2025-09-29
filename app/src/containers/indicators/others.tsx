"use client";

import { FC } from "react";

import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";

import { useToggleLayers } from "@/hooks/use-toggle-layers";

import InfoButton from "@/components/ui/info-button";
import { Lexical } from "@/components/ui/lexical";
import { Switch } from "@/components/ui/switch";

import { Indicator } from "@/payload-types";

const OtherIndicatorItem: FC<{ indicator: Indicator }> = ({ indicator }) => {
  const { indicators, toggleLayer } = useToggleLayers(indicator);

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
          <Switch checked={!!indicators?.includes(indicator.id)} onCheckedChange={toggleLayer} />
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
