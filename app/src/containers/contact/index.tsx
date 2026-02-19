"use client";
import { FC } from "react";

import { useTranslations } from "next-intl";
import { LuExternalLink } from "react-icons/lu";

import ContactForm from "@/containers/contact/form";

import { Button } from "@/components/ui/button";

const MAILING_LIST_URL = "https://eepurl.com/jyA0qs";

const Contact: FC = () => {
  const t = useTranslations("contact");

  return (
    <section className="flex h-screen justify-between border-b px-28 py-32">
      <section className="flex flex-1 flex-col justify-between">
        <header>
          <h3 className="mb-4 text-base font-semibold text-blue-300 uppercase">
            {t("header.kicker")}
          </h3>
          <h1 className="font-display mb-6 text-[40px] leading-10 font-normal">
            {t("header.title")}
          </h1>
          <p className="w-1/2 max-w-2xl text-lg font-normal">{t("header.description")}</p>
          <div className="mt-6 flex flex-col items-start gap-4">
            <p>{t("mailing-list.title")}</p>
            <a href={MAILING_LIST_URL} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full leading-5 font-normal" size="lg" variant="outline">
                {t("mailing-list.button")}
                <LuExternalLink />
              </Button>
            </a>
          </div>
        </header>
      </section>
      <section className="flex-1 pl-10">
        <ContactForm />
      </section>
    </section>
  );
};

export default Contact;
