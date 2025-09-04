import { FC } from "react";

import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { homeSections } from "@/containers/home/constants";
import { currentSectionIdAtom } from "@/containers/home/store";

import { Button } from "@/components/ui/button";

const SectionStepper: FC = () => {
  const currentSectionId = useAtomValue(currentSectionIdAtom);
  const t = useTranslations("home");
  const labels = [
    t("climate-resilience.kicker"),
    t("biodiversity-strongholds.kicker"),
    t("engines-for-economic-development.kicker"),
    t("wetlands-under-threat.kicker"),
  ];

  return (
    <nav>
      <ul className="flex justify-center gap-2 p-4">
        {homeSections.map((s, i) => (
          <li key={s.id} className="group relative w-20">
            <Button variant="link" className="w-full cursor-pointer p-0">
              <div
                className={cn({
                  "bg-secondary-foreground/25 h-1 w-full rounded-xl transition-colors hover:bg-white":
                    true,
                  "bg-white": s.id === currentSectionId,
                })}
              />
              <span className="text-secondary-foreground pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 translate-y-3 rounded px-2 text-[10px] whitespace-nowrap uppercase opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                {labels[i]}
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SectionStepper;
