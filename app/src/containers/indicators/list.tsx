import { getPayload } from "payload";

import { getLocale } from "next-intl/server";

import { CategoriesBack } from "@/containers/categories/back";
import { IndicatorsItem } from "@/containers/indicators/item";

import payloadConfig from "@/payload.config";

export const IndicatorsList = async () => {
  const locale = await getLocale();
  const payload = await getPayload({ config: payloadConfig });

  const categories = await payload.find({
    collection: "categories",
    depth: 0,
    limit: 100,
    page: 1,
    sort: "name",
    locale,
  });

  const indicators = await payload.find({
    collection: "indicators",
    depth: 0,
    limit: 100,
    page: 1,
    sort: "-createdAt",
    locale,
  });

  return (
    <div className="flex flex-col gap-1">
      <CategoriesBack categories={categories} />

      {indicators.docs.map((indicator) => (
        <IndicatorsItem key={indicator.id} {...indicator} />
      ))}
    </div>
  );
};
