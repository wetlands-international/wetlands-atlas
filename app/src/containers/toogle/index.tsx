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
    <ul className="bg-background inline-flex items-center gap-1 rounded-4xl p-0.5">
      <li>
        <Link
          href={`/map${searchParams ? `${searchParams}` : ""}`}
          className={cn(
            "pointer-events-auto flex items-center gap-2 rounded-4xl px-4 py-2 text-sm",
            pathname !== "/map" && "hover:underline",
            pathname === "/map" && "from-accent to-border text-accent-foreground bg-linear-to-r",
          )}
        >
          <span>{t("insights")}</span> <LuLightbulb className="size-4" />
        </Link>
      </li>
      <li>
        <Link
          href={`/landscapes${searchParams ? `${searchParams}` : ""}`}
          className={cn(
            "pointer-events-auto flex items-center gap-2 rounded-4xl px-4 py-2 text-sm",
            pathname !== "/landscapes" && "hover:underline",
            pathname === "/landscapes" &&
              "from-accent to-border text-accent-foreground bg-linear-to-r",
          )}
        >
          <span>{t("landscapes")}</span> <LuBookOpen className="size-4" />
        </Link>
      </li>
    </ul>
  );
};
