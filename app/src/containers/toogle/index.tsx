"use client";

import { useTranslations } from "next-intl";
import { LuBookOpen, LuLightbulb } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { Link, usePathname } from "@/i18n/navigation";

export const Toggle = () => {
  const pathname = usePathname();

  const t = useTranslations("header");

  return (
    <ul className="bg-background inline-flex items-center gap-1 rounded-4xl p-0.5">
      <li>
        <Link
          href="/"
          className={cn(
            "pointer-events-auto flex items-center gap-2 rounded-4xl px-4 py-2 text-sm",
            pathname !== "/" && "hover:underline",
            pathname === "/" && "from-accent to-border text-accent-foreground bg-linear-to-r",
          )}
        >
          <span>{t("insights")}</span> <LuLightbulb className="size-4" />
        </Link>
      </li>
      <li>
        <Link
          href="/stories"
          className={cn(
            "pointer-events-auto flex items-center gap-2 rounded-4xl px-4 py-2 text-sm",
            pathname !== "/stories" && "hover:underline",
            pathname === "/stories" &&
              "from-accent to-border text-accent-foreground bg-linear-to-r",
          )}
        >
          <span>{t("stories")}</span> <LuBookOpen className="size-4" />
        </Link>
      </li>
    </ul>
  );
};
