"use client";

import { useCallback } from "react";

import { LuChevronRight } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { useSyncInsight } from "@/app/(frontend)/[locale]/(app)/store";

import { Category } from "@/payload-types";

export const CategoriesItem = (category: Category) => {
  const [, setInsight] = useSyncInsight();

  const handleChange = useCallback(() => {
    setInsight(category.id);
  }, [category.id, setInsight]);

  return (
    <button
      key={category.id}
      className="group cursor-pointer rounded-4xl bg-cover bg-position-[50%_50%] text-left transition-all duration-500 hover:bg-position-[50%_45%]"
      style={{
        backgroundImage: "url(/test.jpg)",
      }}
      onClick={handleChange}
    >
      <div
        className={cn(
          "from-background/75 to-background/10 relative flex items-center justify-between gap-2 rounded-4xl bg-gradient-to-r p-6 transition-all",
          "group-hover:outline-foreground/25 group-hover:outline-2 group-hover:-outline-offset-2",
        )}
      >
        <header className="flex min-h-24 flex-col justify-center">
          <h2 className="font-display text-2xl">{category.name}</h2>
          {!!category.description && (
            <div className="prose prose-invert prose-sm">{category.description}</div>
          )}
        </header>

        <div className="bg-background/50 group-hover:bg-primary relative flex size-12 items-center justify-center rounded-full backdrop-blur-xs transition-colors duration-500">
          <span className="bg-primary absolute top-1/2 left-1/2 hidden h-9/12 w-9/12 -translate-1/2 rounded-full group-hover:block group-hover:animate-ping" />
          <LuChevronRight className="text-foreground relative z-10 size-5" />
        </div>
      </div>
    </button>
  );
};
