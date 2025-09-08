import { notFound } from "next/navigation";

import { getPayload } from "payload";

import { getLocale } from "next-intl/server";

import payloadConfig from "@/payload.config";

export const getLandscapeById = async (id: string) => {
  try {
    const locale = await getLocale();
    const payload = await getPayload({ config: payloadConfig });

    const landscape = await payload.findByID({
      id,
      collection: "landscapes",
      depth: 1,
      locale,
    });

    return landscape;
  } catch (error) {
    console.error("Error fetching landscape:", error);
    notFound();
  }
};
