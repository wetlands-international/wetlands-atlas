import { Link } from "@/i18n/navigation";

export const StoriesListItem = ({
  id,
  title,
  description,
}: {
  id: number | string;
  title: string;
  description: string;
}) => {
  return (
    <Link
      href={`/stories/${id}`}
      className="bg-background flex h-full w-72 shrink-0 cursor-pointer justify-between rounded-4xl p-4"
    >
      <div className="flex flex-col">
        <h2 className="text-foreground text-xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
};
