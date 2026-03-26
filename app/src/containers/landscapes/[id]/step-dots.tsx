"use client";

import { useAtom } from "jotai";
import { motion } from "motion/react";

import { stepAtom } from "@/app/(frontend)/[locale]/(landscapes)/landscapes/[id]/store";

import { Landscape } from "@/payload-types";

interface StepDotsProps {
  steps: Landscape["steps"];
}

export const StepDots = ({ steps }: StepDotsProps) => {
  const [currentStep, setStep] = useAtom(stepAtom);

  if (!steps || steps.length <= 1) return null;

  const totalSteps = steps.length;
  const fillPercent = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  const handleClick = (index: number) => {
    setStep(index);
    const stepId = steps[index]?.id;
    if (stepId) {
      document.getElementById(stepId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="absolute left-5 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-3">
      {/* Progress rail behind dots */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white/15">
        <motion.div
          className="w-full bg-white/50"
          animate={{ height: `${fillPercent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Dots */}
      {steps.map((step, index) => (
        <motion.button
          key={step.id}
          type="button"
          className="relative z-10 rounded-full"
          animate={{
            width: currentStep === index ? 10 : 8,
            height: currentStep === index ? 10 : 8,
            backgroundColor:
              currentStep === index ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.4)",
            scale: currentStep === index ? 1.25 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={() => handleClick(index)}
          aria-label={`Go to step ${index + 1}`}
        />
      ))}
    </div>
  );
};
