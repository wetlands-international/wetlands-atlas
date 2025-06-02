"use client";

import { useSetAtom } from "jotai";

import { stepAtom } from "@/app/(frontend)/[locale]/(stories)/stories/[id]/store";

import { Step } from "@/components/scroll/step";
import { Lexical } from "@/components/ui/lexical";

import { Story } from "@/payload-types";

export const StorySteps = (props: Story) => {
  const setStep = useSetAtom(stepAtom);

  return props.steps?.map((step, index) => (
    <Step key={step.id} id={`${step.id}`} offset={0.5} onEnter={() => setStep(index)}>
      <div className="flex min-h-svh flex-col justify-center py-20">
        <div className="prose prose-invert prose-headings:font-display prose-headings:text-blue-300">
          <Lexical data={step.sidebar} />
        </div>
      </div>
    </Step>
  ));
};
