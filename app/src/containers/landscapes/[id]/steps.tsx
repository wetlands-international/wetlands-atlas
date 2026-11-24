"use client";

import { useAtom } from "jotai";
import { useMediaQuery } from "usehooks-ts";

import { stepAtom } from "@/app/(frontend)/[locale]/(landscapes)/landscapes/[id]/store";

import { Step } from "@/components/scroll/step";
import { Lexical } from "@/components/ui/lexical";

import { Landscape } from "@/payload-types";

export const LandscapeSteps = (props: Landscape) => {
  const [currentStep, setStep] = useAtom(stepAtom);
  // In portrait, the visual takes the top of the screen: a step is the current one in the middle of the text below it
  const isPortrait = useMediaQuery("(orientation: portrait)", { initializeWithValue: false });

  return props.steps?.map((step, index) => (
    <Step
      key={step.id}
      id={`${step.id}`}
      offset={isPortrait ? 0.75 : 0.5}
      // Scrolled to below the header by the step dots. In portrait, the article's container is below the visual.
      className="scroll-mt-20 lg:scroll-mt-24 portrait:scroll-mt-0"
      onEnter={() => setStep(index)}
    >
      {index > 0 && (
        <div className="mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
      <div
        className={`py-12 transition-opacity duration-500 lg:py-20 ${index === (props.steps?.length ?? 0) - 1 ? "min-h-[51svh]" : ""}`}
        style={{ opacity: currentStep === index ? 1 : 0.3 }}
      >
        <div className="prose prose-invert prose-headings:font-display prose-headings:text-blue-300">
          <Lexical data={step.sidebar} />
        </div>
      </div>
    </Step>
  ));
};
