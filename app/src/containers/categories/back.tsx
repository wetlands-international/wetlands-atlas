"use client";

import { useCallback } from "react";

import { PaginatedDocs } from "payload";

import { LuX } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { useSyncIndicators, useSyncInsight } from "@/app/(frontend)/[locale]/(app)/store";

import { Category } from "@/payload-types";

export type CategoriesBackProps = {
  categories?: PaginatedDocs<Category>;
};

export const CategoriesBack = ({ categories }: CategoriesBackProps) => {
  const [insight, setInsight] = useSyncInsight();
  const [, setIndicators] = useSyncIndicators();

  const category = categories?.docs.find((c) => c.id === insight);

  const handleClick = useCallback(() => {
    setInsight(null);
    setIndicators(null);
  }, [setInsight, setIndicators]);

  return (
    <button
      key={category?.id}
      className={cn(
        "group bg-background relative cursor-pointer rounded-4xl bg-cover bg-position-[50%_50%] text-left transition-all duration-500 hover:bg-position-[50%_45%]",
        {
          "pointer-events-none grayscale": !category?.indicators?.docs?.length,
        },
      )}
      style={{
        backgroundImage: `url(https://picsum.photos/seed/g-${category?.id}/500/300)`,
      }}
      onClick={handleClick}
    >
      {!category?.indicators?.docs?.length && (
        <span className="text-foreground bg-foreground/20 text-2xs pointer-events-none absolute top-3 left-4 z-10 rounded-4xl px-2.5 py-1.5 font-medium uppercase backdrop-blur-xs">
          Coming soon
        </span>
      )}
      <div
        className={cn(
          "from-background/90 to-background/10 relative flex items-center justify-between gap-2 rounded-4xl bg-gradient-to-r p-6 transition-all",
          "group-hover:outline-foreground/25 group-hover:outline-2 group-hover:-outline-offset-2",
        )}
      >
        <header className="relative flex min-h-28 w-full flex-col justify-center">
          <div className="relative w-full">
            <h2 className="font-display text-2xl">{category?.name}</h2>
            {!!category?.description && (
              <div
                className={cn(
                  "prose prose-invert prose-sm w-full duration-300",
                  // "-translate-y-2 opacity-0 duration-500 group-hover:translate-y-0 group-hover:opacity-100",
                )}
              >
                {category?.description}
              </div>
            )}
          </div>
        </header>

        {!!category?.indicators?.docs?.length && (
          <div className="bg-background/50 group-hover:bg-primary relative flex size-12 shrink-0 items-center justify-center rounded-full backdrop-blur-xs transition-colors duration-500">
            <span className="bg-primary absolute top-1/2 left-1/2 hidden h-9/12 w-9/12 -translate-1/2 rounded-full group-hover:block group-hover:animate-ping" />
            <LuX className="text-foreground relative z-10 size-5" />
          </div>
        )}
      </div>
    </button>
  );
};
