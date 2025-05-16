import { getPayload } from "payload";

import { getLocale } from "next-intl/server";

import payloadConfig from "@/payload.config";

export const Categories = async () => {
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

  return (
    <div className="grid gap-4">
      {categories.docs.map((category) => (
        <div key={category.id} className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold uppercase">{category.name}</h2>
          {!!category.description && (
            <div className="prose prose-invert prose-sm">{category.description}</div>
          )}
        </div>
      ))}
    </div>
  );
};
