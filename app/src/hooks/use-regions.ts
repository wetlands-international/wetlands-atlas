import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { Config } from "@/payload-types";

import { collectionQueryOptions } from "@/services/sdk-query";

// Shared by the server prefetch in `(app)/layout.tsx` and the client, so that both use the same query key.
// The unpublished regions are left out, so that they are never referenced and their ID is removed from the URL.
export const regionsQueryOptions = (locale: Config["locale"]) =>
  collectionQueryOptions("regions", {
    depth: 1,
    limit: 0,
    sort: "order",
    locale,
    where: {
      published: {
        equals: true,
      },
    },
  });

export const useRegions = () => {
  const locale = useLocale();

  return useSuspenseQuery(regionsQueryOptions(locale));
};
