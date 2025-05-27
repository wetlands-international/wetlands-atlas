import { notFound } from "next/navigation";

import { getPayload } from "payload";

import { getLocale } from "next-intl/server";

import payloadConfig from "@/payload.config";

export const getStoryId = async (id: string) => {
  try {
    const locale = await getLocale();
    const payload = await getPayload({ config: payloadConfig });

    const story = await payload.findByID({
      id,
      collection: "stories",
      depth: 1,
      locale,
    });

    return story;
  } catch (error) {
    console.error("Error fetching story:", error);
    notFound();
  }
};
