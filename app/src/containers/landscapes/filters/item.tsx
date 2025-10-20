"use client";

import Link from "next/link";

import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";

import { CommandItem } from "cmdk";

import { Landscape } from "@/payload-types";

export const LandscapesItem = (props: Landscape) => {
  return (
    <CommandItem
      className="text-background data-[selected=true]:bg-accent data-[selected=true]:text-background cursor-pointer px-3 py-1 text-left transition-colors duration-150 data-[selected=true]:indent-1"
      asChild
    >
      <Link className="block" href={`/landscapes/${props.id}`}>
        {convertLexicalToPlaintext({ data: props.name })}
      </Link>
    </CommandItem>
  );
};
