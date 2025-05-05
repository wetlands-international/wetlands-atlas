"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const Hero = () => {
  const t = useTranslations("home");

  return (
    <div className="grid min-h-[calc(100svh_-_theme(spacing.16))] items-center justify-items-center">
      <div className="container space-y-8 text-center">
        <header className="space-y-2">
          <h1 className="text-5xl font-semibold">{t("hero.title")}</h1>
          <p className="text-sm font-light">{t("hero.description")}</p>
        </header>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="lg" variant="secondary">
              <Link href="/admin">Admin &rarr;</Link>
            </Button>
          </TooltipTrigger>

          <TooltipPortal>
            <TooltipContent side="bottom" align="center">
              <p>{t("hero.tooltip")}</p>
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </div>
    </div>
  );
};
