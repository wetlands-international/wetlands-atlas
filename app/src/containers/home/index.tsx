"use client";

import { useState } from "react";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";

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
  const { scrollYProgress } = useScroll();
  const [currentSection, setCurrentSection] = useState(0);

  const totalSteps = 3 + sections.length; // Hero + N sections + Landscapes + Footer
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.min(Math.floor(latest * totalSteps), totalSteps - 1);
    setCurrentSection(step);
  });

  const renderContent = () => {
    if (currentSection === 0) return <Hero />;
    if (currentSection > 0 && currentSection <= sections.length) {
      return <HomeSectionContainer {...sections[currentSection - 1]} />;
    }
    return <Landscapes stories={stories} />;
  };

  const totalHeight = `calc(${totalSteps} * 100vh)`;

  return (
    <main>
      <div className="fixed top-0 left-0 z-20 w-full px-20 pt-2">
        <Navbar />
      </div>
      <div className="relative" style={{ height: totalHeight }}>
        {currentSection < totalSteps - 1 && (
          <div className="fixed top-0 right-0 left-0 h-screen overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={currentSection}>{renderContent()}</motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
