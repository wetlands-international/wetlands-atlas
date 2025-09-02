"use client";

import { useMemo } from "react";

import { useAtomValue } from "jotai";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";

import { stepAtom } from "@/app/(frontend)/[locale]/(landscapes)/landscapes/[id]/store";

import { Story } from "@/payload-types";

export const StoryChartContainer = (props: Story) => {
  const { steps } = props;

  const step = useAtomValue(stepAtom);

  const STEP = useMemo(() => {
    const s = steps?.[step];
    if (s && "chart" in s) {
      return s;
    }
    return null;
  }, [step, steps]);

  const CHART = useMemo(() => {
    const s = steps?.[step];
    if (s && "chart" in s) {
      return s.chart;
    }
    return null;
  }, [step, steps]);

  return (
    <div
      className={cn(
        "bg-primary absolute top-0 left-0 z-20 flex h-full w-full grow flex-col overflow-hidden transition-opacity duration-500",
        {
          "pointer-events-none opacity-0": !CHART,
          "pointer-events-auto opacity-100": CHART,
        },
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {CHART && (
          <motion.div
            className="h-full w-full"
            key={STEP?.id || "chart-placeholder"}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-2 text-white">
              <h2 className="font-display text-4xl font-bold">Chart for Step {step + 1}</h2>

              <p className="mt-4 text-lg">
                This is a placeholder for the chart content. Replace with actual chart data.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
