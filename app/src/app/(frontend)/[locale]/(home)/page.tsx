import { getPayload } from "payload";

import { getLocale } from "next-intl/server";

import Home from "@/containers/home";
import { homeSections } from "@/containers/home/constants";

import payloadConfig from "@/payload.config";

export default async function LandingPage() {
  const locale = await getLocale();
  const payload = await getPayload({ config: payloadConfig });

  const stories = await payload.find({
    collection: "stories",
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

  return <Home stories={stories.docs} sections={homeSections} />;
}
