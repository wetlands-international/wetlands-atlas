import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { CircleArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const Landscapes: FC = () => {
  const t = useTranslations("home.landscapes");
  return (
    <section className="relative min-h-[calc(100vh-7rem)] overflow-hidden px-20 pt-28">
      <Image
        src="/home/landscapes.avif"
        width={4096}
        height={2304}
        alt=""
        className="absolute inset-0 h-full w-full bg-gray-300 object-cover"
      />
      <div className="grid-row-2 relative mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-7xl grid-cols-2 gap-4">
        <div className="flex flex-col items-start justify-center">
          <h1 className="mb-9 text-3xl font-normal">{t("title")}</h1>
          <div className="mb-14 space-y-2">
            {t.rich("description", { p: (chunk) => <p>{chunk}</p> })}
          </div>
          <Button size="lg" className="rounded-full" asChild>
            <Link href="/stories">
              <span>{t("button")}</span>
              <CircleArrowRightIcon />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col items-start justify-evenly">
          <Carousel opts={{ align: "start" }}>
            <CarouselContent className="-ml-4">
              {[...Array(10).keys()].map((id) => (
                <CarouselItem key={id} className="basis-[40%] pl-4">
                  <div className="rounded-4xl border border-[rgba(169,169,169,0.34)] bg-[rgba(125,125,125,0.32)] p-6 text-white backdrop-blur-lg">
                    hello
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Landscapes;
