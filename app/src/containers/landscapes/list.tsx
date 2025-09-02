import { getPayload } from "payload";

import { getLocale } from "next-intl/server";

import { LandscapesListItem } from "@/containers/landscapes/item";

import { ScrollArea } from "@/components/ui/scroll-area";

import payloadConfig from "@/payload.config";

export const LandscapesList = async () => {
  const locale = await getLocale();
  const payload = await getPayload({ config: payloadConfig });

  const landscapes = await payload.find({
    collection: "landscapes",
    depth: 1,
    limit: 100,
    page: 1,
    sort: "-createdAt",
    locale,
    where: {
      published: {
        equals: true,
      },
    },
  });

  return (
    <ScrollArea
      className="animate-in fade-in-0 slide-in-from-bottom-25 w-full duration-300"
      orientation="horizontal"
    >
      <ul className="flex w-full items-stretch gap-2">
        <li className="bg-background w-96 shrink-0 space-y-4 rounded-4xl p-6">
          <h1 className="font-display text-4xl text-blue-500">Highlighted landscapes</h1>
          <p className="text-foreground text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, similique magnam tenetur
            eligendi beatae aut architecto deleniti iste autem adipisci ipsam hic nisi, quia, dicta
            quam animi vel. Et, nihil!
          </p>
        </li>

        {landscapes.docs.map((landscape) => (
          <li key={landscape.id}>
            <LandscapesListItem {...landscape} />
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};
