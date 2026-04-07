"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { HomeIcon } from "@/containers/logo";

import { Link } from "@/i18n/navigation";

export const Header = ({
  className,
  children,
  blur = true,
}: {
  className?: string;
  children: React.ReactNode;
  blur?: boolean;
}) => {
  const t = useTranslations();

  return (
    <header
      className={cn("relative top-0 left-0 z-10 flex w-full items-center gap-2.5", className)}
    >
      <h1
        className={cn(
          "relative flex size-16 shrink-0 items-center justify-center rounded-full",
          "after:absolute after:top-0 after:left-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-white/10 after:backdrop-blur-lg",
        )}
      >
        <Link
          href="/"
          className="relative z-10 block items-center space-x-2"
          aria-label={t("header.title")}
        >
          <HomeIcon />
        </Link>
      </h1>

      <div
        className={cn("animate-in fade-in slide-in-from-top-10 relative z-20 w-full duration-500", {
          "bg-background/75 rounded-4xl backdrop-blur-lg": blur,
        })}
      >
        {children}
      </div>
    </header>
  );
};
