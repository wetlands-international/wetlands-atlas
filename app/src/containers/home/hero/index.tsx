"use client";

import Link from "next/link";

import { useTranslations } from "next-intl";

import Circle from "@/containers/home/circle";
import { homeSections } from "@/containers/home/constants";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  const t = useTranslations("home.hero");

  return (
    <div className="relative mt-[theme(spacing.16)] grid min-h-[calc(100svh_-_theme(spacing.16))] items-center justify-items-center overflow-hidden">
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
          story={{
            id: "the-ziway-shalla-landscape",
            name: "The Ziway-Shalla Landscape",
            imageUrl: homeSections[3].imageUrl,
          }}
        />

        <Circle size="xl" className="absolute top-[90%] left-[10%]" enableAnimation={false} />
      </div>
      <div className="z-10 container space-y-8 text-center">
        <header className="space-y-2">
          <h3 className="mb-2 text-base font-semibold text-blue-300 uppercase">{t("kicker")}</h3>
          <h1 className="text-6xl font-bold">{t("title")}</h1>
          <p className="text-xl font-normal">
            {t.rich("description", {
              strong: (chunk) => <strong>{chunk}</strong>,
            })}
          </p>
        </header>
        <div className="flex justify-center gap-2">
          <Button size="lg" variant="outline" className="rounded-full">
            <Link href={`#${homeSections[0].id}`}>{t("discover-button")}</Link>
          </Button>
          <Button size="lg" className="rounded-full" asChild>
            <Link href="/map">{t("explore-button")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
