"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const Hero = () => {
  const t = useTranslations();

  return (
    <div className="grid min-h-svh items-center justify-items-center">
      <div className="container space-y-2 text-center">
        <h1 className="text-5xl">{t("home-hero-title")}</h1>
        <p className="text-sm">{t("home-hero-description")}</p>
        <Button size="lg" variant="link">
          <Link href="/admin">Admin &rarr;</Link>
        </Button>
      </div>
    </div>
  );
};
