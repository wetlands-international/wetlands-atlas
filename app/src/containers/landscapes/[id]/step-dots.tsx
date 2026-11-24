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
    // The dots are in buttons that touch each other: a tap anywhere along the column goes to the closest dot, and the
    // touch targets are much bigger than the dots. The dots are 32px apart on the small screens, 20px on the large
    // ones, and their centers 24px from the visual's edge.
    <div className="absolute top-1/2 left-0.5 z-30 flex -translate-y-1/2 flex-col items-center">
      {/* Progress rail behind dots, from the first dot's center to the last one's */}
      <div className="absolute top-4 bottom-4 w-0.5 bg-white/15 lg:top-2.5 lg:bottom-2.5">
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
          <button
            key={step.id}
            type="button"
            // 44px wide, as high as the space between two dots, and 12px more above the first dot and below the last one
            className="relative z-10 flex h-8 w-11 cursor-pointer items-center justify-center first-of-type:before:absolute first-of-type:before:inset-x-0 first-of-type:before:-top-3 first-of-type:before:h-3 last-of-type:after:absolute last-of-type:after:inset-x-0 last-of-type:after:-bottom-3 last-of-type:after:h-3 lg:h-5"
            onClick={() => handleClick(index)}
            aria-label={t("go-to-step", { step: index + 1 })}
          >
            <motion.span
              className="block rounded-full"
              style={{ width: DOT_SIZE, height: DOT_SIZE }}
              animate={{
                scale: isActive ? 1.4 : 1,
                backgroundColor: isActive ? "rgb(255, 255, 255)" : "rgb(180, 180, 180)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </button>
        );
      })}
    </div>
  );
};
