import { FC, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import { motion, useAnimation, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type CircleSize = "s" | "m" | "l" | "xl";
const sizeMap: Record<CircleSize, number> = { s: 120, m: 160, l: 240, xl: 320 };
function getRandomBouncingAnimation() {
  const randomOffsetX = (Math.random() * 5 + 3) * (Math.random() < 0.5 ? -1 : 1);
  const randomOffsetY = (Math.random() * 5 + 3) * (Math.random() < 0.5 ? -1 : 1);
  const duration = Math.random() * 1.5 + 2.5;

  return {
    x: [0, randomOffsetX, 0],
    y: [0, randomOffsetY, 0],
    transition: {
      repeat: Infinity,
      duration,
      ease: "easeInOut",
    },
  };
}

interface CircleProps {
  section?: {
    id: string;
    imageUrl: string;
  };
  landscape?: {
    id: string;
    name: string;
    imageUrl: string;
  };
  enableAnimation?: boolean;
  size?: CircleSize;
  className?: string;
}
const Circle: FC<CircleProps> = ({
  section,
  landscape,
  enableAnimation = true,
  size = "m",
  className,
}) => {
  const t = useTranslations("home.hero");
  const controls = useAnimation();
  const dimension = sizeMap[size];
  const radius = dimension / 2;
  const textRadius = radius + 12;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const enablePause = enableAnimation && landscape;

  useEffect(() => {
    if (!enableAnimation) return;
    controls.start(getRandomBouncingAnimation());
  }, [enableAnimation, controls]);

  const handleMouseEnter = () => {
    if (!enablePause) return;
    controls.stop();
  };

  const handleMouseLeave = async () => {
    if (!enablePause) return;

    const currentX = x.get();
    const currentY = y.get();

    await controls.start({
      x: [currentX, 0],
      y: [currentY, 0],
      transition: { duration: 1, ease: "easeInOut" },
    });

    controls.start(getRandomBouncingAnimation());
  };

  return (
    <motion.div
      initial={{ x: 0, y: 0 }}
      animate={controls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        {
          "rounded-full bg-[linear-gradient(0deg,#D5EB4E_0%,#5AC4C6_100%)]": true,
          "h-30 w-30": size === "s",
          "h-40 w-40": size === "m",
          "h-60 w-60": size === "l",
          "h-80 w-80": size === "xl",
        },
        className,
      )}
      style={{
        x,
        y,
        filter: "drop-shadow(0 0 13px rgba(8, 127, 170, 0.40)) drop-shadow(0 0 1px #0B2A3B)",
      }}
    >
      {section && (
        <Link href={`#${section.id}`}>
          <Image
            src={section.imageUrl}
            className="rounded-full object-cover"
            sizes="100vw"
            alt=""
            fill
          />
        </Link>
      )}
      {landscape && (
        <Link href={`/landscapes/${landscape.id}`} className="group">
          <Image
            src={landscape.imageUrl}
            className="rounded-full object-cover"
            sizes="100vw"
            alt=""
            fill
          />
          <svg
            viewBox={`0 0 ${dimension} ${dimension}`}
            className="absolute inset-0 overflow-visible text-[10px] font-medium tracking-[0.4em] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <circle cx={radius} cy={radius} r={radius} fill="none" />

            <path
              id={`text-circle-${landscape?.id}`}
              d={`
      M ${radius},${radius}
      m -${textRadius},0
      a ${textRadius},${textRadius} 0 1,1 ${textRadius * 2},0
      a ${textRadius},${textRadius} 0 1,1 -${textRadius * 2},0
    `}
              fill="none"
            />

            <text textAnchor="middle" fill="#fff">
              <textPath href={`#text-circle-${landscape?.id}`} startOffset="14%">
                {t("circle")}
              </textPath>
            </text>
          </svg>

          <div
            className={cn({
              "absolute h-full w-full rounded-full bg-[linear-gradient(0deg,#D5EB4E_0%,#5AC4C6_100%)] opacity-100 transition-opacity duration-300 group-hover:opacity-0":
                true,
            })}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="px-2 text-center text-2xl font-bold text-white select-none">
              {landscape.name}
            </span>
          </div>
        </Link>
      )}
    </motion.div>
  );
};

export default Circle;
