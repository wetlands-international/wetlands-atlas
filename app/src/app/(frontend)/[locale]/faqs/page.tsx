import { getPayload } from "payload";

import { getLocale } from "next-intl/server";

import Faqs from "@/containers/faqs";

import payloadConfig from "@/payload.config";

export default async function FaqsPage() {
  const locale = await getLocale();
  const payload = await getPayload({ config: payloadConfig });

  const faqs = await payload.find({
    collection: "faqs",
    depth: 1,
    pagination: false,
    sort: "order",
    locale,
  });

  return <Faqs items={faqs.docs} />;
}
