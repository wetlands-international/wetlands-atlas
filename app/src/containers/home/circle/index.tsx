import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface CircleProps {
  section?: {
    id: string;
    imageUrl: string;
  };
  story?: {
    id: string;
    name: string;
    imageUrl: string;
  };
  enableAnimation?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
}
const Circle: FC<CircleProps> = ({
  section,
  story,
  enableAnimation = true,
  size = "medium",
  className,
}) => {
  // const [isHovered, setIsHovered] = useState(false);
  // const controls = useAnimation();

  return (
    <motion.div
      initial={{ x: 0, y: 0 }}
      {...(enableAnimation && {
        animate: {
          x: [0, 5, 0],
          y: [0, -5, 0],
        },
        transition: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        },
      })}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      className={cn(
        {
          "rounded-full bg-[linear-gradient(0deg,#D5EB4E_0%,#5AC4C6_100%)]": true,
          "h-30 w-30": size === "small",
          "h-40 w-40": size === "medium",
          "h-60 w-60": size === "large",
        },
        className,
      )}
      style={{
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
      {story && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all hover:opacity-1">
          <span className="font-bp;d px-2 text-center text-2xl text-white select-none">
            {story.name}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default Circle;
