import { FC } from "react";

import { useQuery } from "@tanstack/react-query";

import { getParams } from "@/lib/json-converter";

import LegendItem from "@/components/map/legend/item";
import {
  LegendTypeBasic,
  LegendTypeChoropleth,
  LegendTypeGradient,
} from "@/components/map/legend/item-types";
import { LegendItemProps } from "@/components/map/legend/types";

import { collectionByIdQueryOptions } from "@/services/sdk-query";

const LandscapesLegendItem: FC<LegendItemProps> = ({ id, ...props }) => {
  const { data: layer } = useQuery(collectionByIdQueryOptions("layers", id));

  if (!layer) return null;

  const settings = getParams({
    params_config: layer.params_config,
    settings: {},
  });

  return (
    <>
      <LegendItem
        id={layer.id}
        name={layer.name}
        settings={settings}
        settingsManager={{
          opacity: false,
          visibility: false,
        }}
        {...props}
      >
        {layer.legend_config.type === "gradient" && (
          <LegendTypeGradient items={layer.legend_config.items || []} />
        )}
        {layer.legend_config.type === "basic" && (
          <LegendTypeBasic items={layer.legend_config.items || []} />
        )}
        {layer.legend_config.type === "choropleth" && (
          <LegendTypeChoropleth items={layer.legend_config.items || []} />
        )}
      </LegendItem>
    </>
  );
};

export default LandscapesLegendItem;
