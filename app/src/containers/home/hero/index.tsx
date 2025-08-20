"use client";

import Link from "next/link";

import Circle from "@/containers/home/circle";
import { homeSections, homeSectionsSteps } from "@/containers/home/constants";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative grid min-h-[calc(100svh_-_theme(spacing.16))] items-center justify-items-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 container h-full w-full -translate-x-1/2 -translate-y-1/2 transform 2xl:max-w-full">
        <Circle size="l" className="absolute top-[3%] left-[10%]" />
        <Circle
          className="absolute top-[22%] left-[5%]"
          section={{ id: homeSectionsSteps[0].id, imageUrl: homeSections[0].imageUrl }}
          enableAnimation={false}
        />
        <Circle
          size="l"
          className="absolute top-[2%] left-[70%]"
          section={{ id: homeSectionsSteps[1].id, imageUrl: homeSections[1].imageUrl }}
          enableAnimation={false}
        />
        <Circle
          size="s"
          className="absolute top-[70%] left-[85%]"
          section={{ id: homeSectionsSteps[2].id, imageUrl: homeSections[2].imageUrl }}
          enableAnimation={false}
        />
        <Circle
          size="s"
          className="absolute top-[80%] left-[5%]"
          section={{ id: homeSectionsSteps[3].id, imageUrl: homeSections[3].imageUrl }}
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
        <Circle size="s" className="absolute top-[15%] left-[82%]" />
        <Circle size="xl" className="absolute top-[90%] left-[10%]" enableAnimation={false} />
      </div>
      <div className="container space-y-8 text-center">
        <header className="space-y-2">
          <h3 className="mb-2 text-base font-semibold text-blue-300 uppercase">
            discover wetlands
          </h3>
          <h1 className="text-6xl font-bold">The dynamic ecosystems where water meets land.</h1>
          <p className="text-xl font-normal">
            Ranging from mangroves and peatlands to rivers, lakes, floodplains, and coasts. Though
            they <strong>cover only about 6% of Earth&rsquo;s surface</strong>, but their impact is
            immense. Wetlands are indispensable for climate stability, biodiversity, and human
            livelihoods.
          </p>
        </header>
        <div className="flex justify-center gap-2">
          <Button size="lg" variant="outline" className="rounded-full">
            <Link href={`#${homeSectionsSteps[0].id}`}>Discover wetlands</Link>
          </Button>
          <Button size="lg" className="rounded-full">
            <Link href="/map">Explore data</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
