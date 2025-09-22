import { FC } from "react";

import { useQuery } from "@tanstack/react-query";

import { getParams } from "@/lib/json-converter";

import { useSyncLayersSettings } from "@/app/(frontend)/[locale]/(app)/store";

import LegendItem from "@/components/map/legend/item";
import {
  LegendTypeBasic,
  LegendTypeChoropleth,
  LegendTypeGradient,
} from "@/components/map/legend/item-types";
import { LegendItemProps } from "@/components/map/legend/types";

import API from "@/services/api";

const MapLegendItem: FC<LegendItemProps> = ({ id, ...props }) => {
  const { data: layer } = useQuery(
    API.queryOptions("get", `/api/layers/{id}`, {
      params: {
        path: {
          id,
        },
      },
    }),
  );
  const [layersSettings, setLayersSettings] = useSyncLayersSettings();

  if (!layer) return null;

  const settings = getParams({
    params_config: layer.params_config,
    settings: layersSettings?.[id] || {},
  });

  return (
    <>
      <LegendItem
        id={layer.id}
        name={layer.name}
        settings={settings}
        settingsManager={{
          opacity: true,
          visibility: false,
        }}
        onChangeOpacity={(v) =>
          setLayersSettings({ ...layersSettings, [id]: { ...settings, opacity: v } })
        }
        onChangeVisibility={(v) =>
          setLayersSettings({
            ...layersSettings,
            [id]: { ...settings, visibility: v },
          })
        }
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

export default MapLegendItem;
