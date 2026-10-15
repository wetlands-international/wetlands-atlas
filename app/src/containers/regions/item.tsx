"use client";

import { useCallback } from "react";

import Image from "next/image";

import { useSetAtom } from "jotai";
import { LuChevronRight } from "react-icons/lu";

import { isValidMedia } from "@/lib/utils";

import { tmpBboxAtom, useSyncRegion } from "@/app/(frontend)/[locale]/(app)/store";

import { useGlobalLocation } from "@/hooks/use-global-locations";

import { Region } from "@/payload-types";

export const RegionsItem = (region: Region) => {
  const [, setRegion] = useSyncRegion();
  const setTmpBbox = useSetAtom(tmpBboxAtom);
  const globalLocation = useGlobalLocation(region.id);

  const handleClick = useCallback(() => {
    setRegion(region.id);

    if (globalLocation) {
      setTmpBbox(globalLocation.bbox);
    }
  }, [region.id, globalLocation, setRegion, setTmpBbox]);

  return (
    <button
      type="button"
      className="group flex w-full cursor-pointer items-center gap-3 rounded-[20px] py-1 pr-2 pl-0.5 text-left transition-colors hover:bg-white/5"
      onClick={handleClick}
    >
      <div
        className="relative size-26 shrink-0 overflow-hidden rounded-2xl border-2"
        style={{ borderColor: region.color, backgroundColor: region.color }}
      >
        {isValidMedia(region.cover) && (
          <Image
            src={region.cover.url}
            alt={region.cover.alt}
            width={region.cover.width}
            height={region.cover.height}
            className="absolute h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex min-w-0 grow flex-col gap-1 px-1">
        <h3 className="font-display text-lg leading-5">{region.name}</h3>
        {!!region.description && (
          <p className="text-muted-foreground line-clamp-3 text-xs leading-[1.4]">
            {region.description}
          </p>
        )}
      </div>

      <div className="group-hover:bg-primary relative flex size-8 shrink-0 items-center justify-center rounded-full bg-[rgba(125,125,125,0.3)] backdrop-blur-[2px] transition-colors">
        <LuChevronRight className="text-foreground size-3" />
      </div>
    </button>
  );
};
