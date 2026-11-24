import Image from "next/image";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

const IMAGE_CLASS_NAME =
  "aspect-square w-full max-w-64 shrink-0 rounded-full object-cover sm:max-w-80 lg:size-80 lg:max-w-none xl:size-[500px]";

const PARTNERS = [
  {
    role: "Convened by",
    src: "/about/wetlands.svg",
    width: 144,
    height: 65,
    alt: "Wetlands International",
    className: "h-[65px]",
  },
  {
    role: "Supported by",
    src: "/about/aberystwyth-university.avif",
    width: 156,
    height: 50,
    alt: "Aberystwyth University",
    className: "h-[50px]",
  },
  {
    role: "Donors",
    src: "/about/effektiv-spenden.avif",
    width: 150,
    height: 50,
    alt: "Effektiv Spenden",
    className: "h-[50px]",
  },
  {
    role: "Designed by",
    src: "/about/vizzuality.svg",
    width: 226,
    height: 50,
    alt: "Vizzuality",
    className: "h-[50px] p-2",
  },
];

export default function AboutPage() {
  const t = useTranslations("about");
  return (
    <>
      <header className="px-4 py-16 sm:py-24 lg:px-28 lg:py-44">
        <div>
          <h3 className="mb-4 text-base leading-[19px] font-semibold text-blue-300 uppercase">
            {t("header.kicker")}
          </h3>
          <h1 className="font-display mb-8 text-5xl leading-tight font-normal sm:text-6xl lg:mb-14 lg:text-7xl lg:leading-[72px]">
            {t("header.title")}
          </h1>
        </div>
        <div className="flex justify-end">
          <p className="max-w-2xl text-base font-normal sm:text-lg lg:w-1/2">
            {t("header.description")}
          </p>
        </div>
      </header>

      <section
        data-navbar-theme="light"
        className="text-background flex flex-col items-center gap-12 bg-white px-4 py-16 sm:py-24 lg:flex-row lg:justify-evenly lg:gap-16 lg:px-28 lg:py-36 xl:gap-32"
      >
        <div>
          <h2 className="font-display mb-6 text-4xl leading-tight font-normal lg:mb-8 lg:text-[56px] lg:leading-16">
            {t("the-gap-map.title")}
          </h2>
          <div className="max-w-2xl space-y-8">
            {t.rich("the-gap-map.description", {
              p: (chunk) => <p>{chunk}</p>,
              strong: (chunk) => <strong>{chunk}</strong>,
            })}
          </div>
        </div>
        <Image
          src="/about/gap-map.avif"
          width={901}
          height={600}
          alt={t("the-gap-map.title")}
          // Above the text on the small screens, like the next section's image
          className={cn(IMAGE_CLASS_NAME, "order-first lg:order-none")}
        />
      </section>

      <section
        data-navbar-theme="light"
        className="text-background bg-white px-4 pb-16 sm:pb-24 lg:px-28 lg:py-36"
      >
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-evenly lg:gap-16 xl:gap-32">
          <Image
            src="/about/explore.avif"
            width={901}
            height={600}
            alt={t("explore.title")}
            className={IMAGE_CLASS_NAME}
          />
          <div>
            <h2 className="font-display mb-6 text-4xl leading-tight font-normal whitespace-pre-line lg:mb-8 lg:text-[56px] lg:leading-16">
              {t("explore.title")}
            </h2>
            <div className="max-w-2xl space-y-8">
              {t.rich("explore.description", {
                p: (chunk) => <p>{chunk}</p>,
                strong: (chunk) => <strong>{chunk}</strong>,
              })}
            </div>
          </div>
        </div>

        {/* The columns are as wide as their logos, and centered together on the page */}
        <div className="mt-16 grid justify-center gap-x-16 gap-y-10 sm:grid-cols-[repeat(2,auto)] lg:mt-32 lg:mb-20 lg:grid-cols-[repeat(4,auto)] lg:gap-x-8 xl:gap-x-16">
          {PARTNERS.map(({ role, src, width, height, alt, className }) => (
            // The labels on one line, and the logos centered in a band as high as the tallest one, whatever their
            // height
            <div
              key={alt}
              className="grid grid-rows-[auto_65px] items-center justify-items-center gap-2"
            >
              <h2 className="text-center text-sm font-semibold text-[#5AC4C6] uppercase">{role}</h2>
              <Image
                src={src}
                width={width}
                height={height}
                alt={alt}
                className={cn("w-auto", className)}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
