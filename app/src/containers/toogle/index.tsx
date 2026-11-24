"use client";

import { useTranslations } from "next-intl";
import { LuBookOpen, LuLightbulb } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { useGetSearchParams } from "@/app/(frontend)/[locale]/(app)/store";

import { Link, usePathname } from "@/i18n/navigation";

export const Toggle = () => {
  const pathname = usePathname();
  const searchParams = useGetSearchParams();

  const t = useTranslations("header");

  return (
    // As wide as its row in portrait, with the pages taking half of it each
    <ul className="bg-background flex shrink-0 items-center gap-1 rounded-4xl p-0.5">
      <li className="flex-1 sm:flex-none">
        <Link
          href={`/map${searchParams ? `${searchParams}` : ""}`}
          className={cn(
            "pointer-events-auto flex items-center justify-center gap-2 rounded-4xl px-3 py-2 text-sm sm:px-4",
            pathname !== "/map" && "hover:underline",
            pathname === "/map" && "from-accent to-border text-accent-foreground bg-linear-to-r",
          )}
        >
          {/* Without the icons in portrait, where the row is too narrow */}
          <span>{t("insights")}</span> <LuLightbulb className="hidden size-4 sm:block" />
        </Link>
      </li>
      <li className="flex-1 sm:flex-none">
        <Link
          href={`/landscapes${searchParams ? `${searchParams}` : ""}`}
          className={cn(
            "pointer-events-auto flex items-center justify-center gap-2 rounded-4xl px-3 py-2 text-sm sm:px-4",
            pathname !== "/landscapes" && "hover:underline",
            pathname === "/landscapes" &&
              "from-accent to-border text-accent-foreground bg-linear-to-r",
          )}
        >
          <span>{t("landscapes")}</span> <LuBookOpen className="hidden size-4 sm:block" />
        </Link>
      </li>
    </ul>
  );
};
