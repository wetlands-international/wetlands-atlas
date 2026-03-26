"use client";

import { useAtomValue } from "jotai";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { stepAtom } from "@/app/(frontend)/[locale]/(landscapes)/landscapes/[id]/store";

import { Landscape } from "@/payload-types";

const DOT_SIZE = 8;

interface StepDotsProps {
  steps: Landscape["steps"];
}

export const StepDots = ({ steps }: StepDotsProps) => {
  const currentStep = useAtomValue(stepAtom);
  const t = useTranslations("landscapesId.step-dots");

  if (!steps || steps.length <= 1) return null;

  const fillPercent = (currentStep / (steps.length - 1)) * 100;

  const handleClick = (index: number) => {
    const stepId = steps[index]?.id;
    if (stepId) {
      document.getElementById(stepId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="absolute top-1/2 left-5 z-30 flex -translate-y-1/2 flex-col items-center gap-3">
      {/* Progress rail behind dots */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white/15">
        <motion.div
          className="w-full bg-white/50"
          animate={{ height: `${fillPercent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Dots */}
      {steps.map((step, index) => {
        const isActive = currentStep === index;

        return (
          <motion.button
            key={step.id}
            type="button"
            className="relative z-10 cursor-pointer rounded-full"
            style={{ width: DOT_SIZE, height: DOT_SIZE }}
            animate={{
              scale: isActive ? 1.4 : 1,
              backgroundColor: isActive ? "rgb(255, 255, 255)" : "rgb(180, 180, 180)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => handleClick(index)}
            aria-label={t("go-to-step", { step: index + 1 })}
          />
        );
      })}
    </div>
  );
};
