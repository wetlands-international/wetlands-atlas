import { FC } from "react";

import Link from "next/link";

import { Marker } from "react-map-gl/mapbox";

interface StoryMarkerProps {
  name: string;
  location: [number, number];
  imgUrl: string;
  href: string;
}

const StoryMarker: FC<StoryMarkerProps> = ({ name, location, imgUrl, href }) => {
  return (
    <Marker longitude={location[0]} latitude={location[1]}>
      <Link
        href={href}
        className="group relative flex h-12 translate-x-1/2 cursor-pointer items-center"
      >
        <div className="bg-background/50 absolute top-0 left-0 z-10 h-12 w-12 flex-shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-white group-hover:border-transparent">
          <img src={imgUrl} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="invisible pr-5 pl-14 text-base font-semibold whitespace-nowrap">{name}</div>
        <div className="bg-background/50 absolute right-full bottom-0 left-6 flex h-full w-0 items-center overflow-hidden rounded-full transition-all duration-500 group-hover:right-0 group-hover:left-0 group-hover:w-full group-hover:pr-5 group-hover:pl-14">
          <span className="text-base font-semibold whitespace-nowrap">{name}</span>
        </div>
      </Link>
    </Marker>
  );
};

export default StoryMarker;
