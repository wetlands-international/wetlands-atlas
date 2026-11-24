"use client";
import React, { FC, PropsWithChildren, useRef } from "react";

import { useSetAtom } from "jotai";
import { motion, useAnimation } from "motion/react";
import { useIntersectionObserver, useMediaQuery } from "usehooks-ts";

import DropletImage from "@/containers/home/section/droplet-image";
import { currentSectionIdAtom } from "@/containers/home/store";

export interface HomeSectionProps extends PropsWithChildren {
  id: string;
  imageUrl: string;
  supContent?: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

const HomeSectionContainer: FC<HomeSectionProps> = ({
  id,
  imageUrl,
  children,
  supContent,
  scrollContainerRef,
}) => {
  const setCurrentSectionId = useSetAtom(currentSectionIdAtom);
  const controls = useAnimation();
  const lastScrollY = useRef(0);
  // Tailwind's `lg` breakpoint. False on the server and the first render, to match the server's HTML.
  const isDesktop = useMediaQuery("(min-width: 64rem)", { initializeWithValue: false });

  const { ref } = useIntersectionObserver({
    threshold: 0.4,
    rootMargin: "-30% 0% 0% 0%",
    onChange: (isIntersecting) => {
      if (isIntersecting) {
        setCurrentSectionId(id);
      }
    },
  });

  const getScrollTop = () => {
    const node = scrollContainerRef?.current;
    if (node && typeof node.scrollTop === "number") return node.scrollTop;
    if (typeof window !== "undefined") return window.scrollY;
    return 0;
  };

  const handleViewportEnter = () => {
    // On a phone, the page scrolls freely: the sections don't slide in
    if (!isDesktop) {
      return;
    }

    const currentScrollY = getScrollTop();
    const scrollDirection = currentScrollY > lastScrollY.current ? "down" : "up";

    controls.set({ y: scrollDirection === "down" ? "100%" : "-100%" });
    controls.start({ y: 0 });

    lastScrollY.current = currentScrollY;
  };

  return (
    <section
      id={id}
      className="relative snap-start overflow-clip px-4 pt-24 pb-8 lg:min-h-screen lg:px-20 lg:pt-28 lg:pb-0"
    >
      <motion.div
        className="relative mx-auto grid w-full transform-gpu grid-cols-1 gap-4 will-change-transform lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[40%_60%]"
        animate={controls}
        onViewportEnter={handleViewportEnter}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <div className="flex h-full flex-col justify-center gap-9">
            {/* On a phone held upright, the section shows its droplet: the one pinned on the side is too big */}
            <DropletImage
              imageUrl={imageUrl}
              className="mx-auto hidden h-auto w-full max-w-64 portrait:block lg:portrait:hidden"
            />
            {children}
          </div>
        </div>
        {/* Watched to know the current section: on top of the section when it's a single column */}
        <div className="order-first flex flex-col items-end justify-center lg:order-none">
          <div className="flex flex-col items-center" ref={ref} />
        </div>
        {supContent}
      </motion.div>
    </section>
  );
};

export default HomeSectionContainer;
