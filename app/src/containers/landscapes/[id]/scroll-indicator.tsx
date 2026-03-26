"use client";

import { useEffect, useState } from "react";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { ScrollArrow } from "@/components/ui/scroll-arrow";

const SCROLL_THRESHOLD = 50;

export const ScrollIndicator = () => {
  const t = useTranslations("landscapesId");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY <= SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="from-background/0 to-background pointer-events-none fixed bottom-0 left-0 z-30 flex w-xl flex-col items-center bg-gradient-to-b pt-16 pb-8"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <ScrollArrow
        className="relative bottom-auto left-auto translate-x-0"
        label={t("scroll-down")}
      />
    </motion.div>
  );
};
