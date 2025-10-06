"use client";

import React, { useRef } from "react";

import Image from "next/image";

import { useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";

import Footer from "@/containers/home/footer";
import { Hero } from "@/containers/home/hero";
import Landscapes from "@/containers/home/landscapes";
import Navbar from "@/containers/home/navbar";
import HomeSectionContainer, { HomeSectionProps } from "@/containers/home/section";
import DropletImage from "@/containers/home/section/droplet-image";
import SectionStepper from "@/containers/home/section/stepper";
import { currentSectionIdAtom } from "@/containers/home/store";

import { Landscape } from "@/payload-types";

export default function Home({
  landscapes,
  sections,
}: {
  landscapes: Landscape[];
  sections: HomeSectionProps[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const currentSectionId = useAtomValue(currentSectionIdAtom);
  const currentSectionIndex = sections.findIndex((section) => section.id === currentSectionId);
  const currentImageUrl = sections[currentSectionIndex]?.imageUrl;

  return (
    <main
      ref={scrollContainerRef}
      className="relative h-screen snap-y snap-mandatory overflow-y-scroll"
    >
      <div className="fixed inset-0 z-0">
        <AnimatePresence>
          {currentImageUrl && (
            <motion.div
              key={`global-bg-${currentImageUrl}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: currentImageUrl ? 0.6 : 0, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full"
            >
              <Image
                src={currentImageUrl}
                width={2048}
                height={1152}
                alt=""
                className="h-full w-full object-cover blur-2xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {currentImageUrl && (
        <div className="pointer-events-none fixed inset-0 z-50">
          <div className="absolute top-0 right-20 bottom-0 flex h-full flex-col items-center justify-center gap-6">
            <div className="pointer-events-none">
              <DropletImage imageUrl={currentImageUrl} />
            </div>
            <div className="pointer-events-auto">
              <SectionStepper />
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10">
        <Navbar />
        <Hero />
        {sections.map((section) => (
          <HomeSectionContainer
            key={`home-section-${section.id}`}
            scrollContainerRef={scrollContainerRef}
            {...section}
          />
        ))}
        <Landscapes data={landscapes} />
        <Footer />
      </div>
    </main>
  );
}
