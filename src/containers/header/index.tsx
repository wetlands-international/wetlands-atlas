"use client";

import Link from "next/link";

import { useTranslations } from "next-intl";

import { Logo } from "@/containers/logo";

import { Link as LocaleLink, usePathname } from "@/i18n/navigation";

export const Header = () => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <header className="flex h-16 w-full items-center px-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="flex size-14 items-center justify-center rounded-full bg-white/10">
          <LocaleLink
            href="/"
            className="block items-center space-x-2"
            aria-label={t("header.title")}
          >
            <Logo />
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
        </div>
      </div>
    </header>
  );
};
