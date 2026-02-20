import type { CollectionSlug, PaginatedDocs, SelectType, Sort, Where } from "payload";

import type { Config } from "@/payload-types";

import { sdk } from "@/services/sdk";

type Locale = Config["locale"];

interface FindParams {
  depth?: number;
  draft?: boolean;
  fallbackLocale?: false | Locale;
  limit?: number;
  locale?: "all" | Locale;
  page?: number;
  pagination?: boolean;
  select?: SelectType;
  sort?: Sort;
  where?: Where;
}

interface FindByIDParams {
  depth?: number;
  draft?: boolean;
  fallbackLocale?: false | Locale;
  locale?: "all" | Locale;
  select?: SelectType;
}

/**
 * Creates React Query options for a Payload CMS collection `find` operation.
 * Use with `useQuery`, `useSuspenseQuery`, or `prefetchQuery`.
 */
export function collectionQueryOptions<TSlug extends CollectionSlug<Config>>(
  collection: TSlug,
  params?: FindParams,
) {
  return {
    queryKey: ["find", collection, params ?? {}] as const,
    queryFn: () =>
      sdk.find({
        collection,
        ...params,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any) as Promise<PaginatedDocs<Config["collections"][TSlug]>>,
  };
}

/**
 * Creates React Query options for a Payload CMS collection `findByID` operation.
 * Use with `useQuery`, `useSuspenseQuery`, or `prefetchQuery`.
 */
export function collectionByIdQueryOptions<TSlug extends CollectionSlug<Config>>(
  collection: TSlug,
  id: number | string,
  params?: FindByIDParams,
) {
  return {
    queryKey: ["findByID", collection, id, params ?? {}] as const,
    queryFn: () =>
      sdk.findByID({
        collection,
        id,
        ...params,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any) as Promise<Config["collections"][TSlug]>,
  };
}
