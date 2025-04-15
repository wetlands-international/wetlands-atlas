"use client";

import { Link as LocaleLink } from "@/i18n/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LuWheat } from "react-icons/lu";

export const Header = () => {
  const t = useTranslations();

  return (
    <header className="w-full p-4">
      <div className="container flex items-center justify-between">
        <h1>
          <LocaleLink href="/" className="inline-flex items-center space-x-2">
            <LuWheat className="h-6 w-6" />
            <span className="text-2xl uppercase">{t("header.title")}</span>
          </LocaleLink>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <LocaleLink href="/">{t("header.home")}</LocaleLink>
            </li>
            <li>
              <Link href="/admin">{t("header.admin")}</Link>
            </li>
            <li>
              <LocaleLink href="/" locale="en">
                English
              </LocaleLink>
            </li>
            <li>
              <LocaleLink href="/" locale="es">
                Español
              </LocaleLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
