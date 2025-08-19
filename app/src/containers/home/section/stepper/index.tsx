import { FC } from "react";

import Link from "next/link";

import { useAtomValue } from "jotai";

import { cn } from "@/lib/utils";

import { homeSectionsSteps } from "@/containers/home/constants";
import { currentSectionIdAtom } from "@/containers/home/store";

const SectionStepper: FC = () => {
  const currentSectionId = useAtomValue(currentSectionIdAtom);
  return (
    <nav>
      <ul className="flex justify-center gap-2 p-4">
        {homeSectionsSteps.map((s) => (
          <li key={s.id} className="group relative w-20">
            <Link href={`#${s.id}`} className="py-2">
              <div
                className={cn({
                  "bg-secondary-foreground/25 h-1 w-full rounded-xl transition-colors hover:bg-white":
                    true,
                  "bg-white": s.id === currentSectionId,
                })}
              />
              <span className="text-secondary-foreground pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 translate-y-3 rounded px-2 text-[10px] whitespace-nowrap uppercase opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                {s.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SectionStepper;
