import { StoriesListItem } from "@/containers/stories/item";

import { ScrollArea } from "@/components/ui/scroll-area";

const STORIES = [
  {
    id: 1,
    title: "Story 1",
    description: "Description of story 1",
  },
  {
    id: 2,
    title: "Story 2",
    description: "Description of story 2",
  },
  {
    id: 3,
    title: "Story 3",
    description: "Description of story 3",
  },
  {
    id: 4,
    title: "Story 4",
    description: "Description of story 4",
  },
  {
    id: 5,
    title: "Story 5",
    description: "Description of story 5",
  },
  {
    id: 6,
    title: "Story 6",
    description: "Description of story 6",
  },
  {
    id: 7,
    title: "Story 7",
    description: "Description of story 7",
  },
  {
    id: 8,
    title: "Story 8",
    description: "Description of story 8",
  },
  {
    id: 9,
    title: "Story 9",
    description: "Description of story 9",
  },
  {
    id: 10,
    title: "Story 10",
    description: "Description of story 10",
  },
];

export const StoriesList = () => {
  return (
    <ScrollArea
      className="animate-in fade-in-0 slide-in-from-bottom-25 w-full duration-300"
      orientation="horizontal"
    >
      <ul className="flex w-full items-stretch gap-2">
        <li className="bg-background w-96 shrink-0 space-y-4 rounded-4xl p-6">
          <h1 className="font-display text-4xl text-blue-500">Highlighted stories</h1>
          <p className="text-foreground text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, similique magnam tenetur
            eligendi beatae aut architecto deleniti iste autem adipisci ipsam hic nisi, quia, dicta
            quam animi vel. Et, nihil!
          </p>
        </li>

        {STORIES.map((story) => (
          <li key={story.id}>
            <StoriesListItem {...story} />
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};
