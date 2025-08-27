import { FC } from "react";

import { DefaultLegendContentProps } from "recharts";

import { cn } from "@/lib/utils";

interface Props extends DefaultLegendContentProps {
  items: { label: string; shape: "circle" | "square"; filled?: boolean; pattern?: boolean }[];
}

const ChartLegendContent: FC<Props> = ({ items }) => {
  return (
    <div className="flex justify-center">
      <ul className="flex gap-4 text-xs font-normal">
        {items.map((i) => (
          <li key={`chart-legend-item-${i.label}`} className="flex items-center gap-1.5">
            <span
              className={cn({
                "h-2 w-2 border border-white": true,
                "rounded-full": i.shape === "circle",
                "bg-white": i.filled,
              })}
            >
              {i.pattern && (
                <svg width="100%" height="100%">
                  <defs>
                    <pattern
                      id="restorationDotPattern"
                      x="0"
                      y="0"
                      width="2"
                      height="2"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x="0.3" y="0.3" width="0.6" height="0.6" fill="var(--foreground)" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#restorationDotPattern)" />
                </svg>
              )}
            </span>
            <span>{i.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChartLegendContent;
