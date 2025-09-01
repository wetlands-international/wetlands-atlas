import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Media } from "@/payload-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ValidMedia extends Media {
  url: string;
  width: number;
  height: number;
}

export function isValidMedia(media?: number | Media | null | undefined): media is ValidMedia {
  if (typeof media !== "object") return false;

  return (
    typeof media?.url === "string" &&
    media.url.trim() !== "" &&
    typeof media.width === "number" &&
    !isNaN(media.width) &&
    typeof media.height === "number" &&
    !isNaN(media.height)
  );
}
