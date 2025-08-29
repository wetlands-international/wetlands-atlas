"use client";

import { useQuery } from "@tanstack/react-query";
import { LayerProps, Layer as RMLayer, Source as RMSource, SourceProps } from "react-map-gl/mapbox";

import { parseConfig } from "@/lib/json-converter";

import { Layer } from "@/payload-types";

import API from "@/services/api";

interface LayerManagerItemProps {
  settings: Record<string, unknown>;
  id: string;
  beforeId?: string;
}

const LayerManagerItem = ({ id, settings, beforeId }: LayerManagerItemProps) => {
  const { data: LAYER } = useQuery(
    API.queryOptions("get", `/api/layers/{id}`, {
      params: {
        path: {
          id,
        },
      },
    }),
  );

  const { config, params_config } = LAYER ?? {};

  if (!config || !params_config) return null;

  const c = parseConfig<Layer["config"]>({
    config,
    params_config,
    settings,
  });

  const SOURCE = c?.source as SourceProps;
  const STYLES = c?.styles as LayerProps[];

  console.log({ c });

  return (
    <RMSource {...SOURCE} key={`${id}-source`} id={`${id}-source`}>
      {STYLES?.map((style, index) => {
        return (
          <RMLayer
            {...style}
            key={`${id}-layer-${index}`}
            id={`${id}-layer-${index}`}
            beforeId={beforeId}
          />
        );
      })}
    </RMSource>
  );
};

export default LayerManagerItem;
