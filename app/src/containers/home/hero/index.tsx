"use client";

import Link from "next/link";

import { useSetAtom } from "jotai";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useIntersectionObserver } from "usehooks-ts";

import Circle from "@/containers/home/circle";
import { homeSections } from "@/containers/home/constants";
import { currentSectionIdAtom } from "@/containers/home/store";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  const t = useTranslations("home.hero");
  const setCurrentSectionId = useSetAtom(currentSectionIdAtom);
  const { ref } = useIntersectionObserver({
    threshold: 0.4,
    rootMargin: "-30% 0% 0% 0%",
    onChange: (isIntersecting) => {
      if (isIntersecting) {
        setCurrentSectionId(null);
      }
    },
  });

  return (
    <section
      ref={ref}
      className="relative mt-[theme(spacing.16)] grid min-h-screen snap-start items-center justify-items-center overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 container h-full w-full -translate-x-1/2 -translate-y-1/2 transform 2xl:max-w-full">
        <Circle size="l" className="absolute top-0 left-[5%] 2xl:top-[5%] 2xl:left-[15%]" />
        <Circle size="s" className="absolute top-[15%] left-[90%]" />
        <Circle
          className="absolute top-[10%] left-0 2xl:top-[22%] 2xl:left-[12%]"
          section={{ id: homeSections[0].id, imageUrl: homeSections[0].imageUrl }}
          enableAnimation={false}
        />
        <Circle
          size="l"
          className="absolute top-0 left-[70%] 2xl:left-[80%]"
          section={{ id: homeSections[1].id, imageUrl: homeSections[1].imageUrl }}
          enableAnimation={false}
        />
        <Circle
          size="s"
          className="absolute top-[70%] left-[85%] 2xl:left-[85%]"
          section={{ id: homeSections[2].id, imageUrl: homeSections[2].imageUrl }}
          enableAnimation={false}
        />
        <Circle
          size="s"
          className="absolute top-[80%] left-[5%] 2xl:left-[10%]"
          section={{ id: homeSections[3].id, imageUrl: homeSections[3].imageUrl }}
          enableAnimation={false}
        />
        <Circle
          size="l"
          className="absolute top-[80%] left-[58%] md:left-[70%] xl:left-[75%]"
          landscape={{
            id: "the-ziway-shalla-landscape",
            name: "The Ziway-Shalla Landscape",
            imageUrl: homeSections[3].imageUrl,
          }}
        />

        <Circle size="xl" className="absolute top-[90%] left-[10%]" enableAnimation={false} />
      </div>
      <div className="z-10 container max-w-3xl space-y-8 text-center">
        <header className="space-y-2">
          <h3 className="mb-2 text-base font-semibold text-blue-300 uppercase">{t("kicker")}</h3>
          <h1 className="font-display text-6xl font-bold">{t("title")}</h1>
          <p className="text-lg font-normal">
            {t.rich("description", {
              strong: (chunk) => <strong>{chunk}</strong>,
            })}
          </p>
        </header>
        <div className="flex justify-center gap-2">
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <Link href={`#${homeSections[0].id}`}>{t("discover-button")}</Link>
          </Button>
          <Button size="lg" className="rounded-full" asChild>
            <Link href="/map">{t("explore-button")}</Link>
          </Button>
        </div>
      </div>
      <motion.div
        className="absolute bottom-2 left-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.7,
          ease: "easeInOut",
          repeat: Infinity,
          times: [0, 0.15, 0.85, 0.86], // instant disappearance
        }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="33"
          viewBox="0 0 24 33"
          fill="none"
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
    </section>
  );
};
