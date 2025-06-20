import { getPayload } from "payload";

import { getLocale } from "next-intl/server";

import { CategoriesHeader } from "@/containers/categories/header";
import { CategoriesItem } from "@/containers/categories/item";

import payloadConfig from "@/payload.config";

export const CategoriesList = async () => {
  const locale = await getLocale();

  const payload = await getPayload({ config: payloadConfig });

  const categories = await payload.find({
    collection: "categories",
    depth: 1,
    limit: 100,
    page: 1,
    sort: "name",
    locale,
  });

  return (
    <div className="flex flex-col gap-1">
      <CategoriesHeader />

      {categories.docs.map((category) => (
        <CategoriesItem key={category.id} {...category} />
      ))}
    </div>
  );
};
