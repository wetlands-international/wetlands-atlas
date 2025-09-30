import Image from "next/image";

import { useTranslations } from "next-intl";

import Footer from "@/containers/home/footer";
import Navbar from "@/containers/home/navbar";

export default function AboutPage() {
  const t = useTranslations("about");
  return (
    <main>
      <Navbar />

      <header className="px-28 py-44">
        <div>
          <h3 className="mb-4 text-base leading-[19px] font-semibold text-blue-300 uppercase">
            {t("header.kicker")}
          </h3>
          <h1 className="font-display mb-14 text-7xl leading-[72px] font-normal">
            {t("header.title")}
          </h1>
        </div>
        <div className="flex justify-end">
          <p className="w-1/2 max-w-2xl text-lg font-normal">{t("header.description")}</p>
        </div>
      </header>

      <section className="text-background flex items-center justify-evenly gap-32 bg-white px-28 py-36">
        <div>
          <h2 className="font-display mb-8 text-[56px] leading-16 font-normal">
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
          className="h-[500px] w-[500px] rounded-full object-cover"
        />
      </section>

      <section className="text-background bg-white px-28 py-36">
        <div className="flex items-center justify-evenly gap-32">
          <Image
            src="/about/explore.avif"
            width={901}
            height={600}
            alt={t("explore.title")}
            className="h-[500px] w-[500px] rounded-full object-cover"
          />
          <div>
            <h2 className="font-display mb-8 text-[56px] leading-16 font-normal whitespace-pre-line">
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

        <div className="mt-32 mb-20 flex justify-center gap-16">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-sm font-semibold text-[#5AC4C6] uppercase">Convened by</h2>
            <Image
              src="/about/wetlands.svg"
              width={156}
              height={50}
              alt="Wetlands International"
              className="p-2"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-sm font-semibold text-[#5AC4C6] uppercase">Supported by</h2>
            <Image
              src="/about/aberystwyth-university.avif"
              width={624}
              height={200}
              alt="Aberystwyth University"
              className="h-auto w-[156px]"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-sm font-semibold text-[#5AC4C6] uppercase">Donors</h2>
            <Image
              src="/about/effektiv-spenden.avif"
              width={780}
              height={260}
              alt="Effektiv Spenden"
              className="h-auto w-[156px]"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-sm font-semibold text-[#5AC4C6] uppercase">Designed by</h2>
            <Image
              src="/about/vizzuality.svg"
              width={145}
              height={32}
              alt="Vizzuality"
              className="p-2"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
