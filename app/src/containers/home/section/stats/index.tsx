"use client";
import { FC } from "react";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface StatsProps {
  items: { caption: string | React.ReactNode; value: number }[];
  size?: "s" | "m" | "l";
  title?: string | React.ReactNode;
}

const Stats: FC<StatsProps> = ({ items, size = "m", title }) => {
  return (
    <section className="space-y-2">
      <h4 className="text-xs font-semibold">{title}</h4>
      <div className="space-y-0.5">
        {items.map(({ caption, value }) => (
          <div
            key={`stats-${caption}-${value}`}
            className={cn({ "flex w-full": true, "bg-[rgba(255,255,255,0.04)]": size !== "s" })}
          >
            <div style={{ width: `${value}%` }}>
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>

            <figure
              className={cn({
                "ml-2": true,
                "flex items-center gap-2": size !== "l",
                "py-1 pr-1": size === "s",
                "py-2 pr-2": size === "m",
                "py-4 pr-4": size === "l",
              })}
            >
              <p
                className="text-xl font-normal"
                aria-label={typeof caption === "string" ? caption : "undefined"}
              >
                {value}%
              </p>
              <figcaption className="text-base text-wrap text-gray-300">{caption}</figcaption>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
