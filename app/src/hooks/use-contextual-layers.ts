import { PaginatedDocs } from "payload";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { Config, Layer } from "@/payload-types";

import { collectionQueryOptions } from "@/services/sdk-query";

export interface ContextualLayer {
  id: Layer["id"];
  name: Layer["name"];
  region: string | null;
}

// Shared by the server prefetch in `(app)/layout.tsx` and the client, so that both use the same query key.
// Every region's layers are fetched, so that the layers of other regions can be identified in the URL.
export const contextualLayersQueryOptions = (locale: Config["locale"]) =>
  collectionQueryOptions("layers", {
    depth: 0,
    limit: 0,
    locale,
    select: {
      id: true,
      name: true,
      region: true,
    },
    where: {
      type: {
        equals: "contextual",
      },
    },
  });

// Outside of the hook, so that the result is only recomputed when the data changes
const selectContextualLayers = ({ docs }: PaginatedDocs<Layer>): ContextualLayer[] =>
  docs.map(({ id, name, region }) => ({
    id,
    name,
    region: typeof region === "string" ? region : (region?.id ?? null),
  }));

export const useContextualLayers = () => {
  const locale = useLocale();

  return useSuspenseQuery({
    ...contextualLayersQueryOptions(locale),
    select: selectContextualLayers,
  });
};
