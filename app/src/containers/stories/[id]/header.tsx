import { LuChevronRight } from "react-icons/lu";

import { Header } from "@/containers/header";

import { Link } from "@/i18n/navigation";
import { Story } from "@/payload-types";

export const StoriesIdHeader = async (props: Story) => {
  return (
    <Header className="sticky top-0 z-20 p-4" blur={false}>
      <div className="flex items-center gap-2">
        <Link href="/stories">Stories</Link>
        <LuChevronRight />
        <span className="text-blue-300">{props.name}</span>
      </div>
    </Header>
  );
};
