import { FC } from "react";

import { useQuery } from "@tanstack/react-query";

import { getParams } from "@/lib/json-converter";

import { useSyncLayersSettings } from "@/app/(frontend)/[locale]/(app)/store";

import LegendItem from "@/components/map/legend/item";
import { LegendTypeBasic } from "@/components/map/legend/item-types";

import API from "@/services/api";

const MapLegendItem: FC<{ id: string }> = ({ id }) => {
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
        sortable={{ enabled: true, handle: true }}
        settings={settings}
        settingsManager={{
          opacity: settings?.opacity !== undefined,
          visibility: settings?.visibility !== undefined,
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
      >
        <LegendTypeBasic items={layer.legend_config.items || []} />
      </LegendItem>
    </>
  );
};

export default MapLegendItem;
