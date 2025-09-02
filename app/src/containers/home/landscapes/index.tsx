import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { CircleArrowRightIcon, MapPinIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { isValidMedia } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { Story } from "@/payload-types";

const Landscapes: FC<{ stories: Story[] }> = ({ stories }) => {
  const t = useTranslations("home.landscapes");
  return (
    <section className="relative min-h-[calc(100vh-7rem)] overflow-hidden pt-28 pl-20">
      <Image
        src="/home/landscapes.avif"
        width={4096}
        height={2304}
        alt=""
        className="absolute inset-0 h-full w-full bg-gray-300 object-cover"
      />
      <div className="grid-row-2 relative grid min-h-[calc(100vh-7rem)] w-full grid-cols-[30%_70%] gap-4">
        <div className="flex flex-col items-start justify-center">
          <h1 className="font-display mb-9 text-3xl font-normal">{t("title")}</h1>
          <div className="mb-14 space-y-2">
            {t.rich("description", { p: (chunk) => <p>{chunk}</p> })}
          </div>
          <Button size="lg" className="rounded-full" asChild>
            <Link href="/stories">
              <span>{t("button-discover")}</span>
              <CircleArrowRightIcon />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col items-start justify-end pb-20">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-4">
              {stories.map((s) => (
                <CarouselItem key={`story-carousel-item-${s.id}`} className="basis-[40%] pl-4">
                  <div className="group relative flex h-full flex-col items-start justify-between gap-4 rounded-4xl border border-[rgba(169,169,169,0.34)] bg-[rgba(125,125,125,0.32)] p-6 text-white backdrop-blur-lg select-none">
                    {isValidMedia(s.cover) ? (
                      <Image
                        src={s.cover.url}
                        width={s.cover.width}
                        height={s.cover.height}
                        alt=""
                        className="absolute inset-0 -z-10 h-full w-full rounded-4xl object-cover opacity-0 transition-opacity group-hover:opacity-50"
                      />
                    ) : null}
                    <div className="absolute inset-0 -z-10 h-full w-full rounded-4xl transition group-hover:bg-black/20" />
                    <Badge
                      variant="secondary"
                      className="rounded-full bg-slate-900/50 px-2.5 py-1 backdrop-blur-xs"
                    >
                      <MapPinIcon className="text-blue-300" />
                      <span>Mali</span>
                    </Badge>
                    <h3 className="font-semibold">{s.name}</h3>
                    <p className="text-xs opacity-0 transition-opacity group-hover:opacity-100">
                      {s.description}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="hover:bg-primary/90 rounded-full text-[10px] uppercase"
                      asChild
                    >
                      <Link href={`/stories/${s.id}`}>{t("button-read")}</Link>
                    </Button>
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
