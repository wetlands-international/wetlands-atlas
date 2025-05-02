"use client";

import { formatNumber, formatPercentage } from "@/lib/formats";
import { SerializedInlineBlockNode } from "@payloadcms/richtext-lexical";

export type NumberBlockProps = SerializedInlineBlockNode<{
  variable: string;
  format: "number" | "percentage";
}> & {
  variables?: Record<string, string | number | boolean>;
};

export const NumberBlock = ({ fields, variables = {} }: NumberBlockProps) => {
  const { variable, format } = fields;

  const v = variables[variable];

  if (
    v === undefined ||
    v === null ||
    v === "" ||
    typeof v === "boolean" ||
    typeof v === "string"
  ) {
    return NaN;
  }

  if (typeof v === "number" && format === "number") {
    return formatNumber(v, {});
  }

  if (typeof v === "number" && format === "percentage") {
    return formatPercentage(v, {});
  }

  return variables[variable] ?? variable;
};
