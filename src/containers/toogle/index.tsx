"use client";

import { LuBookOpen, LuLightbulb } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { Link, usePathname } from "@/i18n/navigation";

export const Toggle = () => {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none absolute top-4 right-4 z-10">
      <ul className="bg-background inline-flex items-center rounded-4xl p-0.5">
        <Link
          href="/"
          className={cn(
            "pointer-events-auto flex items-center gap-2 rounded-4xl px-4 py-2 text-sm",
            pathname === "/" && "from-accent to-border text-accent-foreground bg-linear-to-r",
          )}
        >
          <span>Insights</span> <LuLightbulb className="size-4" />
        </Link>
        <Link
          href="/stories"
          className={cn(
            "pointer-events-auto flex items-center gap-2 rounded-4xl px-4 py-2 text-sm",
            pathname === "/stories" &&
              "from-accent to-border text-accent-foreground bg-linear-to-r",
          )}
        >
          <span>Stories</span> <LuBookOpen className="size-4" />
        </Link>
      </ul>
    </div>
  );
};
