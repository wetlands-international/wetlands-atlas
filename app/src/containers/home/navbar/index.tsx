"use client";
import { FC, Suspense, useRef } from "react";

import Link from "next/link";

import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { LuMenu } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { Language } from "@/containers/language";
import { LogoText } from "@/containers/logo";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const exploreLink = { label: t("home.navigation.explore-data"), href: "/map" };

  return (
    <div ref={navRef} className="sticky top-0 left-0 z-20 w-full px-4 pt-2 lg:px-20">
      <div
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-4xl p-2 backdrop-blur-2xl transition-colors duration-300",
          isLight ? "bg-black/[0.05]" : "bg-white/[0.05]",
        )}
      >
        <Link
          href="/"
          className="relative z-10 block shrink-0 items-center space-x-2"
          aria-label={t("header.title")}
        >
          <LogoText />
        </Link>
        <nav>
          <ul className="flex items-center gap-2 lg:gap-4">
            {/* In the menu below, on the small screens */}
            {links.map(({ href, label }) => (
              <li key={`nav-link-${href}`} className="hidden lg:block">
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
            <li className="hidden sm:block">
              <Button className="rounded-full leading-5 font-normal" asChild>
                <Link href={exploreLink.href}>{exploreLink.label}</Link>
              </Button>
            </li>
            <li className="lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className={cn("size-11 rounded-full", {
                      "text-background hover:text-foreground": isLight,
                    })}
                  >
                    <span className="sr-only">{t("home.navigation.menu")}</span>
                    <LuMenu className="size-6" aria-hidden />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-48">
                  {/* First, but only when it's not in the bar, on the smallest screens */}
                  <DropdownMenuItem className="sm:hidden" asChild>
                    <Link href={exploreLink.href}>{exploreLink.label}</Link>
                  </DropdownMenuItem>
                  {/* The current page is marked like the selected language */}
                  {links.map(({ href, label }) => (
                    <DropdownMenuItem
                      key={`nav-menu-link-${href}`}
                      className="aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground"
                      asChild
                    >
                      <Link
                        href={href}
                        aria-current={pathname.startsWith(href) ? "page" : undefined}
                      >
                        {label}
                        {pathname.startsWith(href) && (
                          <CheckIcon className="ml-auto size-4" aria-hidden />
                        )}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
