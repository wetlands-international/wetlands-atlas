import { getPayload } from "payload";

import { getLocale } from "next-intl/server";

import { IndicatorsItem } from "@/containers/indicators/item";

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
    <div className="flex flex-col gap-2">
      {indicators.docs.map((indicator) => (
        <IndicatorsItem key={indicator.id} {...indicator} />
      ))}
    </div>
  );
};
