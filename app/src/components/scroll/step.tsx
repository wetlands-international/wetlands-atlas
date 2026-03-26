"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";

import { useInView } from "motion/react";

import { cn } from "@/lib/utils";

type MarginValue = `${number}${"px" | "%"}`;
type MarginType =
  | MarginValue
  | `${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;

export interface StepProps {
  id: string;
  children: ReactNode;
  offset: number;
  className?: string;
  onEnter?: (id: string) => void;
}

export const Step = ({ id, children, offset, className, onEnter }: StepProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  const margin = useMemo(() => {
    return `-${offset * 100}% ${0}px -${100 - offset * 100}% ${0}px` as MarginType;
  }, [offset]);

  const inView = useInView(ref, {
    amount: 0,
    margin,
  });

  useEffect(() => {
    if (inView) {
      onEnterRef.current?.(id);
    }
  }, [id, inView]);

  return (
    <div id={id} ref={ref} className={cn(className)}>
      {children}
    </div>
  );
};
