import { FC } from "react";

import Link from "next/link";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer: FC = () => {
  const t = useTranslations("home.footer");

  return (
    <footer className="snap-start px-28 pt-20 pb-10 text-[14px]">
      <div className="flex justify-between">
        <div className="space-y-6">
          <h2 className="text-3xl font-normal whitespace-pre-line">
            {t("title.prefix")} <span className="block">{t("title.highlight")}</span>
          </h2>
          <Button variant="outline" className="rounded-full">
            {t("button")}
          </Button>
        </div>
        <p className="max-w-md">{t("description")}</p>
      </div>
      <Separator className="my-10" />
      <div className="flex justify-between">
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
