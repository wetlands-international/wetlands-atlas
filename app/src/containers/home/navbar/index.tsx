"use client";
import { FC, Suspense, useRef } from "react";

import Link from "next/link";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Language } from "@/containers/language";
import { LogoText } from "@/containers/logo";

import { Button } from "@/components/ui/button";

import { usePathname } from "@/i18n/navigation";

import { useNavbarTheme } from "./use-navbar-theme";

const Navbar: FC = () => {
  const pathname = usePathname();
  const t = useTranslations();
  const navRef = useRef<HTMLDivElement>(null);
  const theme = useNavbarTheme(navRef);
  const isLight = theme === "light";

  const links = [
    { label: t("home.navigation.about"), href: "/about" },
    { label: t("home.navigation.faq"), href: "/faqs" },
    { label: t("home.navigation.contact"), href: "/contact" },
  ];
  return (
    <div ref={navRef} className="sticky top-0 left-0 z-20 w-full px-20 pt-2">
      <div
        className={cn(
          "flex w-full items-center justify-between rounded-4xl p-2 backdrop-blur-2xl transition-colors duration-300",
          isLight ? "bg-black/[0.05]" : "bg-white/[0.05]",
        )}
      >
        <Link
          href="/"
          className="relative z-10 block items-center space-x-2"
          aria-label={t("header.title")}
        >
          <LogoText className="shrink-0" fill={isLight ? "#0b2a3b" : "white"} />
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            {links.map(({ href, label }) => (
              <li key={`nav-link-${href}`}>
                <Button
                  size="lg"
                  variant="ghost"
                  className={cn({
                    "hover:bg-secondary hover:text-foreground rounded-full": true,
                    "bg-secondary text-foreground pointer-events-none select-none":
                      pathname.startsWith(href),
                    "text-background hover:text-foreground": isLight && !pathname.startsWith(href),
                  })}
                  asChild
                >
                  <Link href={href}>{label}</Link>
                </Button>
              </li>
            ))}
            <li>
              <Suspense>
                <Language />
              </Suspense>
            </li>
            <li>
              <Button className="rounded-full leading-5 font-normal" asChild>
                <Link href="/map">{t("home.navigation.explore-data")}</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
