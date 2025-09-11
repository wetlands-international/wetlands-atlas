"use client";
import React, { FC, PropsWithChildren, useRef } from "react";

import { useSetAtom } from "jotai";
import { motion, useAnimation } from "motion/react";
import { useIntersectionObserver } from "usehooks-ts";

import { currentSectionIdAtom } from "@/containers/home/store";

export interface HomeSectionProps extends PropsWithChildren {
  id: string;
  imageUrl: string;
  supContent?: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

const HomeSectionContainer: FC<HomeSectionProps> = ({
  id,
  children,
  supContent,
  scrollContainerRef,
}) => {
  const setCurrentSectionId = useSetAtom(currentSectionIdAtom);
  const controls = useAnimation();
  const lastScrollY = useRef(0);

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
    const currentScrollY = getScrollTop();
    const scrollDirection = currentScrollY > lastScrollY.current ? "down" : "up";

    controls.set({ y: scrollDirection === "down" ? "100%" : "-100%" });
    controls.start({ y: 0 });

    lastScrollY.current = currentScrollY;
  };

  return (
    <section id={id} className="relative min-h-screen snap-start overflow-hidden px-20 pt-28">
      <motion.div
        className="grid-row-2 gap-4transform-gpu relative mx-auto grid min-h-[calc(100vh-7rem)] w-full grid-cols-[40%_60%] will-change-transform"
        animate={controls}
        onViewportEnter={handleViewportEnter}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <div className="flex h-full flex-col justify-center gap-9">{children}</div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="flex flex-col items-center" ref={ref} />
        </div>
        {supContent}
      </motion.div>
    </section>
  );
};

export default HomeSectionContainer;
