"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Logo } from "@/containers/logo";

import { Link } from "@/i18n/navigation";

export const Header = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();

  return (
    <header className="flex items-center gap-2.5">
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
          <Logo className="size-14" />
        </Link>
      </h1>

      <div className="animate-in fade-in zoom-in-90 w-full rounded-4xl bg-white/10 backdrop-blur-lg duration-300">
        {children}
      </div>
    </header>
  );
};
