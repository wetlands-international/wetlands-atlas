import { RichText } from "@payloadcms/richtext-lexical/react";

import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { Header } from "@/containers/header";

import { Link } from "@/i18n/navigation";
import { Landscape } from "@/payload-types";

export const LandscapesIdHeader = (props: Landscape) => {
  return (
    <Header
      className={cn(
        // In portrait, over the visual pinned at the top of the screen, and the article scrolling below it
        "sticky top-0 z-20 p-4 portrait:fixed portrait:inset-x-0 portrait:z-30",
        "after:from-background after:to-background/0 aftewr:w-full after:animate-in after:fade-in z-10 after:absolute after:inset-0 after:top-0 after:h-[150%] after:bg-gradient-to-b after:duration-500",
      )}
      blur={false}
    >
      {/* On the small screens, a back button instead of the breadcrumbs, which have no space for the landscape's
          name. As high as the home button, and tinted like its halo, on the dark background. */}
      <Link
        href="/landscapes"
        className="relative z-20 inline-flex h-10 items-center gap-1.5 rounded-full bg-white/10 pr-4 pl-3 text-sm backdrop-blur-lg hover:underline lg:hidden"
      >
        <LuChevronLeft className="size-4 shrink-0" aria-hidden />
        Landscapes
      </Link>

      <div className="relative z-20 hidden items-center gap-2 lg:flex">
        <Link href="/landscapes">Landscapes</Link>
        <LuChevronRight />
        <RichText className="text-blue-300" data={props.name} />
      </div>
    </Header>
  );
};
