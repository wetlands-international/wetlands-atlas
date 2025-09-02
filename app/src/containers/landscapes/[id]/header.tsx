import { LuChevronRight } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { Header } from "@/containers/header";

import { Link } from "@/i18n/navigation";
import { Landscape } from "@/payload-types";

export const LandscapesIdHeader = async (props: Landscape) => {
  return (
    <Header
      className={cn(
        "sticky top-0 z-20 p-4",
        "after:from-background after:to-background/0 aftewr:w-full after:animate-in after:fade-in z-10 after:absolute after:inset-0 after:top-0 after:h-[150%] after:bg-gradient-to-b after:duration-500",
      )}
      blur={false}
    >
      <div className="relative z-20 flex items-center gap-2">
        <Link href="/landscapes">Landscapes</Link>
        <LuChevronRight />
        <span className="text-blue-300">{props.name}</span>
      </div>
    </Header>
  );
};
