"use client";

import { Link as LocaleLink } from "@/i18n/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const Header = () => {
  const t = useTranslations();

  return (
    <header className="w-full p-4">
      <div className="container flex items-center justify-between">
        <h1>
          <LocaleLink href="/">{t("header-title")}</LocaleLink>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <LocaleLink href="/">{t("header-home")}</LocaleLink>
            </li>
            <li>
              <Link href="/admin">{t("header-admin")}</Link>
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
