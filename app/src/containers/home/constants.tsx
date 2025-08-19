import { FC, PropsWithChildren } from "react";

import { getIdFromString } from "@/containers/home/utils";

const Title: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-foreground mb-9 text-4xl">{children}</h2>
);
export const homeSections = [
  {
    kicker: "Climate resilience",
    title: (
      <Title>
        Wetlands are some of the most efficient natural carbon sinks on Earth<sup>1</sup>.
      </Title>
    ),
    sup: "Data sources goes here",
    imageUrl: "/home/climate-resilience.avif",
    description: (
      <p className="text-xl">
        Weatlands, for example, cover only 3% of the global land area but{" "}
        <strong>store more carbon than all the world’s forests combined</strong>. Coastal wetlands
        such as mangroves also trap significant amounts of blue carbon and buffer coastlines from
        storm surges and sea-level rise.
      </p>
    ),
    stats: {
      caption: "the total surface area covered by peatlands worldwide.",
      value: 3,
    },
  },
  {
    kicker: "Biodiversity strongholds",
    title: (
      <Title>
        Nearly 40% of all species rely on wetlands at some point in their life cycle<sup>1</sup>.
      </Title>
    ),
    sup: "(IPBES, 2019)",
    imageUrl: "/home/biodiversity-strongholds.avif",
    description: (
      <div className="space-y-4 text-xl">
        <p>
          Wetlands rank among the most biologically diverse ecosystems on Earth. They provide vital
          habitat for an immense variety of species, birds, amphibians, fish, invertebrates, and
          plants.
        </p>
        <p>
          Freshwater wetlands, in particular,{" "}
          <strong>
            are home to about half of all fish species despite covering less than 1% of the Earth’s
            surface
          </strong>
          .
        </p>
      </div>
    ),
    stats: {
      caption: "global land area of Freshwater wetlands.",
      value: 1,
    },
  },
  {
    kicker: "Engines for economic development",
    title: (
      <Title>
        Wetlands provide ecosystem services worth over $47 trillion annually<sup>1</sup>.
      </Title>
    ),
    sup: "(Costanza et al., 2014).",
    imageUrl: "/home/engines-for-economic-development.avif",
    description: (
      <>
        <p>
          Wetlands hold immense economic value, yet they are often overlooked. Over a billion people
          rely on them for farming, fishing, and ecotourism.
        </p>
        <p>
          Healthy wetlands reduce poverty, enhance food security, and boost economies. Investing in
          them is crucial for both the environment and the economy.
        </p>
      </>
    ),
  },
  {
    kicker: "Wetlands Under Threat",
    title: (
      <Title>
        Since 1970 we’ve lost 35% of wetlands—3× faster than forests1<sup>1</sup>.
      </Title>
    ),
    sup: "(Ramsar Global Wetland Outlook, 2018)",
    imageUrl: "/home/wetlands-under-threat.avif",
    description: (
      <>
        <p>
          Despite their vital roles, wetlands are disappearing at an alarming rate. This degradation
          is driven by land conversion for agriculture, infrastructure development, pollution, and
          the impacts of climate change.
        </p>
        <p>
          Peatlands are being drained and burned, mangroves are being cleared for shrimp farms and
          tourism, and river floodplains are being cut off by dams and levees. As wetlands vanish,
          we lose not only biodiversity and ecosystem services but also the safety nets that protect
          the most vulnerable people from environmental and economic shocks.
        </p>
      </>
    ),
  },
];

export const homeSectionsSteps = homeSections.map((s) => ({
  id: getIdFromString(s.kicker),
  label: s.kicker,
}));
