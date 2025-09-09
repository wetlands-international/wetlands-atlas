import { FC } from "react";

import Link from "next/link";

import { useTranslations } from "next-intl";

import { Language } from "@/containers/language";
import { LogoLarge } from "@/containers/logo";

import { Button } from "@/components/ui/button";

const Navbar: FC = () => {
  const t = useTranslations("home.navigation");
  return (
    <div className="flex w-full items-center justify-between rounded-4xl bg-white/[0.05] p-2 backdrop-blur-2xl">
      <LogoLarge className="shrink-0" />
      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="#">{t("about")}</Link>
          </li>
          <li>
            <Link href="#">{t("faq")}</Link>
          </li>
          <li>
            <Link href="#">{t("contact")}</Link>
          </li>
          <li>
            <Language />
          </li>
          <li>
            <Button className="rounded-full" asChild>
              <Link href="/map">{t("explore-data")}</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
