"use client";
import React, { FC, PropsWithChildren, useRef } from "react";

import Image from "next/image";

import { useSetAtom } from "jotai";
import { AnimatePresence, motion, useAnimation } from "motion/react";
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
  const controls = useAnimation();
  const lastScrollY = useRef(window.scrollY);

  const { ref } = useIntersectionObserver({
    threshold: 0.4,
    rootMargin: "-30% 0% 0% 0%",
    onChange: (isIntersecting) => {
      if (isIntersecting) {
        setCurrentSectionId(id);
      }
    },
  });

  const handleViewportEnter = () => {
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > lastScrollY.current ? "down" : "up";

    // slide-in effect, depending on scroll movement (up/down):
    controls.set({ y: scrollDirection === "down" ? "100%" : "-100%" });
    controls.start({ y: 0 });

    lastScrollY.current = currentScrollY;
  };

  return (
    <section id={id} className="relative min-h-screen overflow-hidden px-20 pt-28">
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${imageUrl}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Image
            src={imageUrl}
            width={2048}
            height={1152}
            alt=""
            className="absolute inset-0 h-full w-full bg-gray-300 object-cover blur-2xl"
          />
        </motion.div>
      </AnimatePresence>

      <div className="grid-row-2 relative mx-auto grid min-h-[calc(100vh-7rem)] w-full grid-cols-[40%_60%] gap-4">
        <div>
          <div className="flex h-full flex-col justify-center gap-9">
            <motion.div
              className="transform-gpu will-change-transform"
              animate={controls}
              onViewportEnter={handleViewportEnter}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`droplet-${imageUrl}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  width: "100%",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                  perspective: 1000,
                }}
                className="transform-gpu will-change-transform"
              >
                <DropletImage imageUrl={imageUrl} />
              </motion.div>
            </AnimatePresence>
            <div ref={ref}>
              <motion.div
                className="transform-gpu will-change-transform"
                initial={{ x: "100%" }}
                whileInView={{ x: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionStepper />
              </motion.div>
            </div>
          </div>
        </div>
        {supContent}
      </div>
    </section>
  );
};

export default HomeSectionContainer;
