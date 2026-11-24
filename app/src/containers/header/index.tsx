"use client";

import { Suspense } from "react";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Language } from "@/containers/language";
import { HomeIcon } from "@/containers/logo";
import { Toggle } from "@/containers/toogle";

import { Link } from "@/i18n/navigation";

/**
 * The navigation of the map pages (insights and landscapes): the toggle between them and the language selector. In the
 * header's row on the small screens, the toggle first. At the top right of the screen on the large ones, the language
 * selector first.
 */
const MapNavigation = () => (
  <div className="contents lg:fixed lg:top-4 lg:right-4 lg:flex lg:flex-row-reverse lg:items-center lg:gap-2">
    <Suspense>
      <Toggle />
    </Suspense>
    <Suspense>
      <Language />
    </Suspense>
  </div>
);

export const Header = ({
  className,
  children,
  blur = true,
  withMapNavigation = false,
}: {
  className?: string;
  children: React.ReactNode;
  blur?: boolean;
  /**
   * Adds the map pages' navigation to the header (see `MapNavigation`). On the small screens, it's in the header's
   * row, with the children below it in portrait.
   */
  withMapNavigation?: boolean;
}) => {
  const t = useTranslations();

  return (
    <header
      className={cn(
        "relative top-0 left-0 z-10 flex w-full items-center gap-2.5",
        // In portrait, the home button and the navigation on the first row, the children on the second one
        withMapNavigation && "grid grid-cols-[auto_1fr_auto] sm:flex",
        className,
      )}
    >
      <h1
        className={cn(
          "relative flex size-16 shrink-0 items-center justify-center rounded-full",
          "after:absolute after:top-0 after:left-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-white/10 after:backdrop-blur-lg",
          // As high as the navigation, on its row
          withMapNavigation && "size-10 lg:size-16",
        )}
      >
        <Link
          href="/"
          className="relative z-10 block items-center space-x-2"
          aria-label={t("header.title")}
        >
          <HomeIcon className={cn(withMapNavigation && "size-8 lg:size-[50px]")} />
        </Link>
      </h1>

      <div
        className={cn(
          "animate-in fade-in slide-in-from-top-10 relative z-20 w-full min-w-0 duration-500",
          {
            "bg-background/75 rounded-4xl backdrop-blur-lg": blur,
            "col-span-full row-start-2": withMapNavigation,
          },
        )}
      >
        {children}
      </div>

      {withMapNavigation && <MapNavigation />}
    </header>
  );
};
