import { Lexical } from "@/components/ui/lexical";
import { Switch } from "@/components/ui/switch";

import { Indicator } from "@/payload-types";

export const IndicatorsItem = (indicator: Indicator) => {
  return (
    <div key={indicator.id} className="bg-background rounded-4xl px-6 py-4">
      <header className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold uppercase">{indicator.name}</h2>
        <Switch />
      </header>
      {!!indicator.description && (
        <div className="prose prose-invert prose-sm">
          <Lexical
            data={indicator.description}
            variables={{
              value: "11M km²",
              percentage: "7%",
              location: "World",
              total: 1000000,
              totalPercentage: 0.3897,
            }}
          />
        </div>
      )}
      <ul>
        <li className="font-display text-2xl">60%</li>
      </ul>
    </div>
  );
};
