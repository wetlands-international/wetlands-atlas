import { getPayload } from "payload";

import { getLocale } from "next-intl/server";

import { homeSections } from "@/containers/home/constants";
import Footer from "@/containers/home/footer";
import { Hero } from "@/containers/home/hero";
import Landscapes from "@/containers/home/landscapes";
import Navbar from "@/containers/home/navbar";
import HomeSectionContainer from "@/containers/home/section";

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

  return (
    <main>
      <div className="fixed top-0 left-0 z-20 w-full px-20 pt-2">
        <Navbar />
      </div>
      <Hero />
      {homeSections.map((doc) => (
        <HomeSectionContainer key={doc.id} {...doc} />
      ))}
      <Landscapes stories={stories.docs} />
      <Footer />
    </main>
  );
}
