"use client";

import * as React from "react";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const MinusIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="2"
    viewBox="0 0 14 2"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M1 1H13"
      stroke="url(#paint0_linear_7210_8438)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_7210_8438"
        x1="1"
        y1="1.5"
        x2="13"
        y2="1.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D5EB4E" />
        <stop offset="1" stopColor="#5AC4C6" />
      </linearGradient>
    </defs>
  </svg>
);

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  isOpen,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & { isOpen: boolean }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        {...props}
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
      >
        {children}
        {isOpen ? (
          <div className="bg-secondary flex h-8 w-8 items-center justify-center rounded-full p-1">
            <MinusIcon className="h-3.5 w-3.5" />
          </div>
        ) : (
          <div className="flex items-center rounded-full bg-gradient-to-r from-[#D5EB4E] to-[#5AC4C6] p-1">
            <PlusIcon className="text-accent-foreground h-6 w-6" />
          </div>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
