import { LuChevronRight } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { Header } from "@/containers/header";

import { Link } from "@/i18n/navigation";
import { Story } from "@/payload-types";

export const StoriesIdHeader = async (props: Story) => {
  return (
    <Header
      className={cn(
        "sticky top-0 z-20 p-4",
        "after:from-background after:to-background/0 aftewr:w-full z-0 after:absolute after:inset-0 after:top-0 after:h-[150%] after:bg-gradient-to-b",
      )}
      blur={false}
    >
      <div className="relative z-10 flex items-center gap-2">
        <Link href="/stories">Stories</Link>
        <LuChevronRight />
        <span className="text-blue-300">{props.name}</span>
      </div>
    </Header>
  );
};
