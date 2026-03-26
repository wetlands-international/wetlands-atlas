"use client";

import { useAtom } from "jotai";

import { stepAtom } from "@/app/(frontend)/[locale]/(landscapes)/landscapes/[id]/store";

import { Step } from "@/components/scroll/step";
import { Lexical } from "@/components/ui/lexical";

import { Landscape } from "@/payload-types";

export const LandscapeSteps = (props: Landscape) => {
  const [currentStep, setStep] = useAtom(stepAtom);

  return props.steps?.map((step, index) => (
    <Step key={step.id} id={`${step.id}`} offset={0.5} onEnter={() => setStep(index)}>
      {index > 0 && (
        <div className="mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
      <div
        className={`py-20 transition-opacity duration-500 ${index === (props.steps?.length ?? 0) - 1 ? "min-h-[51svh]" : ""}`}
        style={{ opacity: currentStep === index ? 1 : 0.3 }}
      >
        <div className="prose prose-invert prose-headings:font-display prose-headings:text-blue-300">
          <Lexical data={step.sidebar} />
        </div>
      </div>
    </Step>
  ));
};
