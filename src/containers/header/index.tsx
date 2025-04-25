"use client";

import { Link as LocaleLink, usePathname } from "@/i18n/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LuWheat } from "react-icons/lu";
import { ThemeToogle } from "@/containers/header/theme-toggle";

export const Header = () => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <header className="flex h-16 w-full items-center">
      <div className="container flex items-center justify-between">
        <h1>
          <LocaleLink href="/" className="inline-flex items-center space-x-2">
            <LuWheat className="h-6 w-6" />
            <span className="text-2xl uppercase">{t("header.title")}</span>
          </LocaleLink>
        </h1>
        <div className="flex items-center gap-4">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <LocaleLink href="/">{t("header.home")}</LocaleLink>
              </li>
              <li>
                <LocaleLink href="/playground">{t("header.playground")}</LocaleLink>
              </li>
              <li>
                <Link href="/admin">{t("header.admin")}</Link>
              </li>
              <li>
                <LocaleLink href={`${pathname}`} locale="en">
                  English
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href={`${pathname}`} locale="es">
                  Español
                </LocaleLink>
              </li>
            </ul>
          </nav>

          <ThemeToogle />
        </div>
      </div>
    </header>
  );
};
