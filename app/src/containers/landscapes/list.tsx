"use client";

import { useLandscapes } from "@/hooks/use-landscapes";

import { LandscapesListItem } from "@/containers/landscapes/item";

import { ScrollArea } from "@/components/ui/scroll-area";

export const LandscapesList = () => {
  const { data: landscapes } = useLandscapes();

  return (
    <ScrollArea
      className="animate-in fade-in-0 slide-in-from-bottom-25 w-full duration-300"
      orientation="horizontal"
    >
      <ul className="flex w-full items-stretch gap-2 pb-4">
        <li className="bg-background short:w-auto w-72 shrink-0 space-y-2 rounded-4xl p-4 sm:w-80 lg:w-96 lg:space-y-4 lg:p-6">
          <h1 className="font-display text-2xl text-blue-500 lg:text-4xl">
            Highlighted landscapes
          </h1>
          {/* Not on the short screens, where the cards would reach the top of the map */}
          <p className="text-foreground short:hidden text-xs lg:text-sm">
            Discover iconic wetland landscapes, see the different values they bring for nature and
            the communities around them and explore why additional efforts are needed for better
            management and protection.
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
