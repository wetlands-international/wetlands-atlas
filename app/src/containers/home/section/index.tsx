"use client";
import React, { FC, PropsWithChildren } from "react";

import Image from "next/image";

import { useSetAtom } from "jotai";
import { useIntersectionObserver } from "usehooks-ts";

import DropletImage from "@/containers/home/section/droplet-image";
import SectionStepper from "@/containers/home/section/stepper";
import { currentSectionIdAtom } from "@/containers/home/store";

export interface HomeSectionProps extends PropsWithChildren {
  id: string;
  imageUrl: string;
  supContent?: React.ReactNode;
}

const HomeSectionContainer: FC<HomeSectionProps> = ({ id, imageUrl, children, supContent }) => {
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
    <section id={id} className="relative min-h-screen overflow-hidden px-20 pt-28">
      <Image
        src={imageUrl}
        width={2048}
        height={1152}
        alt=""
        className="absolute inset-0 h-full w-full bg-gray-300 object-cover blur-2xl"
      />
      <div className="grid-row-2 relative mx-auto grid min-h-[calc(100vh-7rem)] w-full grid-cols-[40%_60%] gap-4">
        <div>
          <div className="flex h-full flex-col justify-center gap-9">{children}</div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="flex flex-col items-center">
            <DropletImage imageUrl={imageUrl} />

            <div ref={ref}>
              <SectionStepper />
            </div>
          </div>
        </div>
        {supContent}
      </div>
    </section>
  );
};

export default HomeSectionContainer;
