"use client";

import Controls from "@/components/map/controls";
import SettingsControl from "@/components/map/controls/settings";
import ZoomControl from "@/components/map/controls/zoom";
import { env } from "@/env";
import Map from "react-map-gl/mapbox";

export const MapContainer = () => {
  return (
    <div className="relative flex grow flex-col overflow-hidden">
      <Map
        id="map"
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          latitude: 37.7577,
          longitude: -122.4376,
          zoom: 8,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        attributionControl={false}
      >
        <Controls>
          <SettingsControl>
            <div className="flex flex-col space-y-0.5">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
                type="button"
              >
                <span>Basemap</span>
              </button>
            </div>
          </SettingsControl>
          <ZoomControl />
        </Controls>
      </Map>
    </div>
  );
};
