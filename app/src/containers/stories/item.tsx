import { Link } from "@/i18n/navigation";
import { Story } from "@/payload-types";

export const StoriesListItem = ({ id, name }: Story) => {
  return (
    <Link
      href={`/stories/${id}`}
      className="bg-background flex h-full w-72 shrink-0 cursor-pointer justify-between rounded-4xl p-4"
    >
      <div className="flex flex-col">
        <h2 className="text-foreground text-xl font-bold">{name}</h2>
      </div>
    </Link>
  );
};
