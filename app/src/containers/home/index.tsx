"use client";

import React, { useRef } from "react";

import Footer from "@/containers/home/footer";
import { Hero } from "@/containers/home/hero";
import Landscapes from "@/containers/home/landscapes";
import Navbar from "@/containers/home/navbar";
import HomeSectionContainer, { HomeSectionProps } from "@/containers/home/section";

import { Landscape } from "@/payload-types";

export default function Home({
  landscapes,
  sections,
}: {
  landscapes: Landscape[];
  sections: HomeSectionProps[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  return (
    <main ref={scrollContainerRef} className="h-screen snap-y snap-mandatory overflow-y-scroll">
      <div className="sticky top-0 left-0 z-20 w-full px-20 pt-2">
        <Navbar />
      </div>
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
    </main>
  );
}
