import { FC } from "react";

import Link from "next/link";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer: FC = () => {
  const t = useTranslations("home.footer");

  return (
    <footer className="snap-start px-4 pt-20 pb-10 text-[14px] lg:px-28">
      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
        <div className="space-y-6">
          <h2 className="text-3xl font-normal whitespace-pre-line">
            {t("title.prefix")} <span className="block">{t("title.highlight")}</span>
          </h2>
          <Button variant="outline" className="rounded-full" size="lg" asChild>
            <Link href="/contact">{t("button")}</Link>
          </Button>
        </div>
        <p className="max-w-md">{t("description")}</p>
      </div>
      <Separator className="my-10 bg-gradient-to-r from-[rgba(133,148,157,0)] via-[#85949D] to-[rgba(133,148,157,0)]" />
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <p>Copyright 2025</p>
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link href="#">{t("navigation.terms")}</Link>
            </li>
            <li>
              <Link href="#">{t("navigation.privacy-policy")}</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
