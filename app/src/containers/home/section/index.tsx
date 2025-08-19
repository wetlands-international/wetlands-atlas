"use client";
import React, { FC } from "react";

import Image from "next/image";

import { useSetAtom } from "jotai";
import { useIntersectionObserver } from "usehooks-ts";

import DropletImage from "@/containers/home/section/droplet-image";
import StatsBar from "@/containers/home/section/stats-bar";
import SectionStepper from "@/containers/home/section/stepper";
import { currentSectionIdAtom } from "@/containers/home/store";
import { getIdFromString } from "@/containers/home/utils";

interface HomeSectionProps {
  kicker: string;
  title: React.ReactNode;
  description: React.ReactNode;
  sup: string;
  imageUrl: string;
  stats?: {
    caption: string;
    value: number;
  };
}

const HomeSection: FC<HomeSectionProps> = ({
  kicker,
  title,
  description,
  sup,
  imageUrl,
  stats,
}) => {
  const id = getIdFromString(kicker);
  const setCurrentSectionId = useSetAtom(currentSectionIdAtom);
  const { ref } = useIntersectionObserver({
    threshold: 0.4,
    rootMargin: "-30% 0% 0% 0%",
    onChange: (isIntersecting) => {
      if (isIntersecting) {
        setCurrentSectionId(id);
      }
    },
  });

  return (
    <section ref={ref} id={id} className="relative min-h-screen overflow-hidden px-20 pt-28">
      <Image
        src={imageUrl}
        width={2048}
        height={1152}
        alt=""
        className="absolute inset-0 h-full w-full bg-gray-300 object-cover blur-2xl"
      />
      <div className="grid-row-2 relative mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-7xl grid-cols-2 gap-4">
        <div>
          <div className="flex h-full flex-col justify-center gap-9">
            <div>
              <h3 className="text-muted-foreground mb-2 text-sm font-bold uppercase">{kicker}</h3>
              {title}

              {description}
            </div>
            {stats && <StatsBar {...stats} />}
          </div>
        </div>
        <div className="items-between flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <DropletImage imageUrl={imageUrl} />
          </div>
        </div>
        <p className="text-xs font-medium">1. {sup}</p>
        <SectionStepper />
      </div>
    </section>
  );
};

export default HomeSection;
