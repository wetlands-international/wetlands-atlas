import Image from "next/image";

import { cn } from "@/lib/utils";

import { env } from "@/env";

export const BASEMAPS = {
  default: {
    id: "default",
    name: "Default",
    mapStyle: "mapbox://styles/wetlands-vizzuality/cmaoz7mg901l701qoaj2a6v0h",
    image: `https://api.mapbox.com/styles/v1/wetlands-vizzuality/cmaoz7mg901l701qoaj2a6v0h/static/7.1924,4.7851,3.85,0/200x200?access_token=${env.NEXT_PUBLIC_MAPBOX_TOKEN}&attribution=false&logo=false`,
  },
  satellite: {
    id: "satellite",
    name: "Satellite",
    mapStyle: "mapbox://styles/wetlands-vizzuality/cmbkp0emy00pj01sm9ggihl1q",
    image: `https://api.mapbox.com/styles/v1/wetlands-vizzuality/cmbkp0emy00pj01sm9ggihl1q/static/7.1924,4.7851,3.85,0/200x200?access_token=${env.NEXT_PUBLIC_MAPBOX_TOKEN}&attribution=false&logo=false`,
  },
} as const;

export type BasemapControlProps = {
  basemap: keyof typeof BASEMAPS;
  onBasemapChange: (basemapId: keyof typeof BASEMAPS) => void;
};

export const BasemapControl = ({ basemap, onBasemapChange }: BasemapControlProps) => {
  return (
    <div className="flex flex-col overflow-hidden">
      {Object.values(BASEMAPS).map((b) => (
        <button
          key={b.id}
          type="button"
          className={cn(`flex items-center gap-2 py-2 pr-4 pl-2`, {
            "hover:bg-gray-300": basemap !== b.id,
            "bg-blue-500/25": basemap === b.id,
          })}
          onClick={() => onBasemapChange(b.id)}
        >
          <Image
            loading="lazy"
            src={b.image}
            alt={b.name}
            width={200}
            height={200}
            className="mb-1 h-10 w-10 rounded-full object-cover"
          />

          {b.name}
        </button>
      ))}
    </div>
  );
};
