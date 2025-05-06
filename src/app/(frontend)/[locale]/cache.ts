import { getQueryClient } from "@/lib/get-query-client";
import { DEFAULT_CATEGORIES_OPTIONS } from "@/services/prefetches";
import { QueryClient } from "@tanstack/react-query";
import { Locale } from "next-intl";
import { getLocale } from "next-intl/server";
import { unstable_cache } from "next/cache";

export const cache = unstable_cache(
  async (locale: Locale, queryClient: QueryClient) => {
    queryClient.prefetchQuery(DEFAULT_CATEGORIES_OPTIONS(locale));
  },
  ["home"],
  { tags: ["home", "categories"] },
);

export const prefetch = async () => {
  const locale = await getLocale();
  const queryClient = getQueryClient();

  await cache(locale, queryClient);

  return { queryClient };
};
