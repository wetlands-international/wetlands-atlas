import { getPayload } from "payload";

import { CommandEmpty, CommandGroup, CommandList } from "cmdk";
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
    <CommandList className="bg-foreground rounded-4xl p-6">
      <CommandEmpty>
        <span className="text-muted-foreground">No locations found</span>
      </CommandEmpty>
      <CommandGroup
        heading="All regions"
        className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-bold [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase"
      >
        <div className="py-2">
          <LocationsItem>Worldwide</LocationsItem>
          <LocationsItem>Location</LocationsItem>
          <LocationsItem>Location 2</LocationsItem>
          <LocationsItem>Location 3</LocationsItem>
          <LocationsItem>Location 4</LocationsItem>
          <LocationsItem>Location 5</LocationsItem>
          <LocationsItem>Location 6</LocationsItem>
          <LocationsItem>Location 7</LocationsItem>

          {indicators.docs.map((indicator) => (
            <LocationsItem key={indicator.id}>{indicator.name}</LocationsItem>
          ))}
        </div>
      </CommandGroup>
    </CommandList>
  );
};
