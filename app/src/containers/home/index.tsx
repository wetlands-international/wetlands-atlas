"use client";

import { ReactLenis } from "lenis/react";

import Footer from "@/containers/home/footer";
import { Hero } from "@/containers/home/hero";
import Landscapes from "@/containers/home/landscapes";
import Navbar from "@/containers/home/navbar";
import HomeSectionContainer, { HomeSectionProps } from "@/containers/home/section";

import { Story } from "@/payload-types";

export default function Home({
  stories,
  sections,
}: {
  stories: Story[];
  sections: HomeSectionProps[];
}) {
  return (
    <main>
      <div className="fixed top-0 left-0 z-20 w-full px-20 pt-2">
        <Navbar />
      </div>
      <ReactLenis root>
        <Hero />
        {sections.map((section) => (
          <HomeSectionContainer key={`home-section-${section.id}`} {...section} />
        ))}
        <Landscapes stories={stories} />
        <Footer />
      </ReactLenis>
    </main>
  );
}
