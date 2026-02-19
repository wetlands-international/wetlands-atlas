"use client";

import { Where } from "payload";

import { useQuery } from "@tanstack/react-query";

import { useSyncLayers } from "@/app/(frontend)/[locale]/(app)/store";

import { Loader } from "@/components/ui/loader";
import { Switch } from "@/components/ui/switch";

import { collectionQueryOptions } from "@/services/sdk-query";

export const Layers = () => {
  const [layers, setLayers] = useSyncLayers();

  const where: Where = {
    type: {
      equals: "contextual",
    },
  };
  const {
    data: layersData,
    isFetching,
    isFetched,
  } = useQuery(
    collectionQueryOptions("layers", {
      where,
    }),
  );

  return (
    <div className="relative flex flex-col space-y-0.5 overflow-hidden rounded-sm p-4">
      <Loader isLoading={isFetching && !isFetched} />
      <ul className="flex flex-col space-y-2">
        {layersData?.docs.map((layer) => (
          <li key={layer.id} className="flex items-center">
            <Switch
              id={layer.id}
              checked={!!layers.find((l) => l === layer.id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setLayers((prev) => [...prev, layer.id]);
                } else {
                  setLayers((prev) => prev.filter((l) => l !== layer.id));
                }
              }}
              className="mr-2"
            />
            <label htmlFor={layer.id} className="cursor-pointer text-sm select-none">
              {layer.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
