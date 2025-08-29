import { useMemo } from "react";

import { cn } from "@/lib/utils";

import { Link } from "@/i18n/navigation";
import { Story } from "@/payload-types";

export const StoriesListItem = ({ id, name, cover }: Story) => {
  const thumbnailStyle = useMemo(() => {
    if (typeof cover === "object" && cover?.url) {
      return {
        background: `url(${cover.url}) lightgray 50% / cover no-repeat`,
      };
    }
  }, [cover]);

  return (
    <Link
      href={`/stories/${id}`}
      className={cn(
        "group bg-background relative flex h-full w-72 shrink-0 cursor-pointer justify-between rounded-4xl p-4",
        {
          "backdrop-blur-sm": !!thumbnailStyle,
        },
      )}
      style={thumbnailStyle}
    >
      {thumbnailStyle && (
        <div className="pointer-events-none absolute inset-0 rounded-4xl bg-[rgba(5,21,29,0.5)] opacity-0 backdrop-blur-[1px] transition-opacity group-hover:opacity-100" />
      )}
      <div className="relative flex flex-col justify-end">
        <h2 className="text-foreground text-base font-medium">{name}</h2>
      </div>
    </Link>
  );
};
