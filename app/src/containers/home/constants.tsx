import { HomeSectionProps } from "@/containers/home/section";
import BiodiversityStrongholds, {
  BiodiversityStrongholdsSubContent,
} from "@/containers/home/section/biodiversity-strongholds";
import ClimateResilienceSection, {
  ClimateResilienceSubContent,
} from "@/containers/home/section/climate-resilience";
import EnginesForEconomicDevelopment, {
  EnginesForEconomicDevelopmentSubContent,
} from "@/containers/home/section/engines-for-economic-development";
import WetlandsUnderThreat, {
  WetlandsUnderThreatSubContent,
} from "@/containers/home/section/wetlands-under-threat";

export const homeSections: HomeSectionProps[] = [
  {
    id: "climate-resilience",
    imageUrl: "/home/climate-resilience.avif",
    children: <ClimateResilienceSection />,
    supContent: <ClimateResilienceSubContent />,
  },
  {
    id: "biodiversity-strongholds",
    imageUrl: "/home/biodiversity-strongholds.avif",
    children: <BiodiversityStrongholds />,
    supContent: <BiodiversityStrongholdsSubContent />,
  },
  {
    id: "engines-for-economic-development",
    imageUrl: "/home/engines-for-economic-development.avif",
    children: <EnginesForEconomicDevelopment />,
    supContent: <EnginesForEconomicDevelopmentSubContent />,
  },
  {
    id: "wetlands-under-threat",
    imageUrl: "/home/wetlands-under-threat.avif",
    children: <WetlandsUnderThreat />,
    supContent: <WetlandsUnderThreatSubContent />,
  },
];
