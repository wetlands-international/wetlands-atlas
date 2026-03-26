"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface ScrollArrowProps {
  className?: string;
  label?: string;
}

export const ScrollArrow = ({ className, label }: ScrollArrowProps) => {
  return (
    <div
      className={cn(
        "absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2",
        className,
      )}
    >
      {label && (
        <span className="text-[10px] font-medium tracking-[0.2em] text-white/70 uppercase">
          {label}
        </span>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.7,
          ease: "easeInOut",
          repeat: Infinity,
          times: [0, 0.15, 0.85, 0.86],
        }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="33"
          viewBox="0 0 24 33"
          fill="none"
          aria-hidden="true"
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)" }}
          animate={{
            clipPath: [
              "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
              "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
            ],
          }}
          transition={{
            duration: 1.7,
            ease: "easeInOut",
            repeat: Infinity,
            times: [0, 0.2, 0.85, 1],
          }}
        >
          <path
            d="M11.6464 32.3536C11.8417 32.5488 12.1583 32.5488 12.3536 32.3536L15.5355 29.1716C15.7308 28.9763 15.7308 28.6597 15.5355 28.4645C15.3403 28.2692 15.0237 28.2692 14.8284 28.4645L12 31.2929L9.17157 28.4645C8.97631 28.2692 8.65973 28.2692 8.46446 28.4645C8.2692 28.6597 8.2692 28.9763 8.46446 29.1716L11.6464 32.3536ZM12 0L11.5 -2.18557e-08L11.5 32L12 32L12.5 32L12.5 2.18557e-08L12 0Z"
            fill="white"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};
