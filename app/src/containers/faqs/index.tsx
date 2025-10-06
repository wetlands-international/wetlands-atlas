"use client";

import { FC, useState } from "react";

import { useTranslations } from "next-intl";

import Footer from "@/containers/home/footer";
import Navbar from "@/containers/home/navbar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Lexical } from "@/components/ui/lexical";

import { Faq } from "@/payload-types";

const Faqs: FC<{ items: Faq[] }> = ({ items }) => {
  const [faq, setFaq] = useState<string>();
  const t = useTranslations("faqs");

  return (
    <main>
      <Navbar />

      <section className="flex justify-between border-b px-28 py-32">
        <section className="flex flex-1 flex-col justify-between">
          <header>
            <h3 className="mb-4 text-base font-semibold text-blue-300 uppercase">
              {t("header.kicker")}
            </h3>
            <h1 className="font-display mb-6 text-[40px] leading-10 font-normal">
              {t("header.title")}
            </h1>
            <p className="w-1/2 max-w-2xl text-lg font-normal">{t("header.description")}</p>
          </header>
          <div className="flex items-center gap-6">
            <p>{t("aside.title")}</p>
            <Button className="rounded-full" size="lg">
              {t("aside.button")}
            </Button>
          </div>
        </section>
        <section className="flex-1 pl-10">
          <Accordion
            type="single"
            collapsible
            className="space-y-2"
            value={faq}
            onValueChange={setFaq}
          >
            {items.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="rounded-4xl border-b-0 bg-white/5 p-6"
              >
                <AccordionTrigger
                  className="cursor-pointer text-base font-semibold select-none"
                  isOpen={item.id === faq}
                >
                  <span className="flex gap-0.5">
                    <span>{index + 1}.</span>
                    <span>{item.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-base font-normal text-balance">
                  <Lexical data={item.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </section>

      <Footer />
    </main>
  );
};

export default Faqs;
