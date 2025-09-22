"use client";

import { useMemo } from "react";

import { useAtomValue } from "jotai";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";

import { stepAtom } from "@/app/(frontend)/[locale]/(landscapes)/landscapes/[id]/store";

import { LandscapeChart } from "@/containers/landscapes/[id]/chart/chart";

import { Landscape } from "@/payload-types";

export const LandscapeChartContainer = (props: Landscape) => {
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
    if (s && "chart" in s && s.type === "chart") {
      return s.chart;
    }
    return null;
  }, [step, steps]);

  return (
    <div
      className={cn(
        "bg-background absolute top-0 left-0 z-20 flex h-full w-full grow flex-col overflow-hidden transition-opacity duration-500",
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
              <LandscapeChart {...CHART} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
