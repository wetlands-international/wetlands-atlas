import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { Marker } from "react-map-gl/mapbox";

import { cn } from "@/lib/utils";

import { Media } from "@/payload-types";

interface ValidMedia extends Media {
  url: string;
  width: number;
  height: number;
}

function isValidMedia(media?: Media): media is ValidMedia {
  return (
    typeof media?.url === "string" &&
    media.url.trim() !== "" &&
    typeof media.width === "number" &&
    !isNaN(media.width) &&
    typeof media.height === "number" &&
    !isNaN(media.height)
  );
}
interface LandscapeMarkerProps {
  name: string;
  location: [number, number];
  media?: Media;
  href: string;
}

const LandscapeMarker: FC<LandscapeMarkerProps> = ({ name, location, media, href }) => {
  return (
    <Marker longitude={location[0]} latitude={location[1]}>
      <Link
        href={href}
        className="group relative flex h-12 translate-x-1/2 cursor-pointer items-center"
      >
        <div
          className={cn({
            "bg-background/50 absolute top-0 left-0 z-10 h-12 w-12 flex-shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-white group-hover:border-transparent":
              true,
            "bg-primary": !media,
          })}
        >
          {isValidMedia(media) && (
            <Image
              src={media.url}
              alt={media.alt}
              width={media.width}
              height={media.height}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="invisible pr-5 pl-14 text-base font-semibold whitespace-nowrap">{name}</div>
        <div className="bg-background/50 absolute right-full bottom-0 left-6 flex h-full w-0 items-center overflow-hidden rounded-full transition-all duration-500 group-hover:right-0 group-hover:left-0 group-hover:w-full group-hover:pr-5 group-hover:pl-14">
          <span className="text-base font-semibold whitespace-nowrap">{name}</span>
        </div>
      </Link>
    </Marker>
  );
};

export default LandscapeMarker;
