import { getPayload } from "payload";

import { getLocale } from "next-intl/server";

import { Lexical } from "@/components/ui/lexical";

import payloadConfig from "@/payload.config";

export const Indicators = async () => {
  const locale = await getLocale();
  const payload = await getPayload({ config: payloadConfig });

  const indicators = await payload.find({
    collection: "indicators",
    depth: 0,
    limit: 100,
    page: 1,
    sort: "-createdAt",
    locale,
  });

  return (
    <div className="flex flex-col gap-4">
      {indicators.docs.map((indicator) => (
        <div key={indicator.id}>
          <h2 className="text-sm font-semibold uppercase">{indicator.name}</h2>
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
      ))}
    </div>
  );
};
