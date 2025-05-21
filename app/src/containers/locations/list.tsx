import { getPayload } from "payload";

import { CommandGroup, CommandList } from "cmdk";
import { getLocale } from "next-intl/server";

import { LocationsItem } from "@/containers/locations/item";

import payloadConfig from "@/payload.config";

export const LocationsList = async () => {
  const locale = await getLocale();
  const payload = await getPayload({ config: payloadConfig });

  const indicators = await payload.find({
    collection: "indicators",
    depth: 0,
    limit: 100,
    page: 1,
    sort: "-createdAt",
    locale,
  });

  return (
    <CommandList>
      <CommandGroup heading="Hydrobasins" className="text-background text-bold">
        <LocationsItem>Worldwide</LocationsItem>
        <LocationsItem>Tirori</LocationsItem>
        <LocationsItem>Tirori 2</LocationsItem>
        <LocationsItem>Tirori 3</LocationsItem>

        {indicators.docs.map((indicator) => (
          <LocationsItem key={indicator.id}>{indicator.name}</LocationsItem>
        ))}
      </CommandGroup>
    </CommandList>
  );
};
