# Lexical Media Gradient Border Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a gradient border, soft glow, and hover scale to all images and videos rendered in Lexical rich text content.

**Architecture:** Create a shared `GradientMediaWrapper` component that applies the visual treatment, then use it in the Lexical upload converter (images) and embedded video component (videos). Pure CSS — no JS state management needed.

**Tech Stack:** React, Tailwind CSS v4, Next.js Image component

**Spec:** `docs/superpowers/specs/2026-03-26-lexical-media-gradient-border-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `app/src/components/ui/gradient-media-wrapper.tsx` | Create | Shared wrapper: gradient border, glow, hover scale |
| `app/src/components/ui/lexical/converters/upload.tsx` | Modify | Wrap `<Image>` with `GradientMediaWrapper` |
| `app/src/components/embedded-video/index.tsx` | Modify | Wrap `<iframe>` with `GradientMediaWrapper` |

---

### Task 1: Create GradientMediaWrapper component

**Files:**
- Create: `app/src/components/ui/gradient-media-wrapper.tsx`

- [ ] **Step 1: Create the wrapper component**

```tsx
import { FC, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface GradientMediaWrapperProps {
  className?: string;
}

export const GradientMediaWrapper: FC<PropsWithChildren<GradientMediaWrapperProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-gradient-to-t from-[#D5EB4E] to-[#5AC4C6] p-0.5 shadow-[0_0_20px_rgba(90,196,198,0.2)] transition-all duration-500",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[14px] transition-transform duration-300 hover:scale-[1.02]">
        {children}
      </div>
    </div>
  );
};
```

Note: `rounded-2xl` = 16px. Inner `rounded-[14px]` = 16px - 2px (the `p-0.5` padding = 2px). `bg-gradient-to-t` = `linear-gradient(0deg, ...)` bottom-to-top.

- [ ] **Step 2: Verify the file has no TypeScript errors**

Run from `app/`: `pnpm check-types`
Expected: passes with no errors.

- [ ] **Step 3: Commit**

```bash
git add app/src/components/ui/gradient-media-wrapper.tsx
git commit -m "feat: add GradientMediaWrapper component for media styling"
```

---

### Task 2: Apply wrapper to Lexical upload images

**Files:**
- Modify: `app/src/components/ui/lexical/converters/upload.tsx`

- [ ] **Step 1: Update upload converter to use the wrapper**

Replace the full content of `upload.tsx` with:

```tsx
import Image from "next/image";

import { SerializedUploadNode } from "@payloadcms/richtext-lexical";

import { GradientMediaWrapper } from "@/components/ui/gradient-media-wrapper";

// Custom upload converter component that uses next/image
export const CustomUploadComponent: React.FC<{
  node: SerializedUploadNode;
  className?: string;
}> = ({ node, className }) => {
  if (node.relationTo === "media") {
    const uploadDoc = node.value;
    if (typeof uploadDoc !== "object") {
      return null;
    }
    const { alt, height, url, width } = uploadDoc;

    if (!url || !width || !height) {
      return null;
    }

    return (
      <GradientMediaWrapper className={className}>
        <Image alt={alt} height={height} src={url} width={width} />
      </GradientMediaWrapper>
    );
  }

  return null;
};
```

Changes: replaced the plain `<div>` wrapper with `<GradientMediaWrapper>`, passing `className` through.

- [ ] **Step 2: Verify no TypeScript errors**

Run from `app/`: `pnpm check-types`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add app/src/components/ui/lexical/converters/upload.tsx
git commit -m "feat: apply gradient border to Lexical upload images"
```

---

### Task 3: Apply wrapper to embedded videos

**Files:**
- Modify: `app/src/components/embedded-video/index.tsx`

- [ ] **Step 1: Update EmbeddedVideo to use the wrapper**

Replace the full content of `index.tsx` with:

```tsx
import { FC } from "react";

import { GradientMediaWrapper } from "@/components/ui/gradient-media-wrapper";

function toYouTubeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Already an embed URL
    if (parsed.pathname.startsWith("/embed/")) return url;
    // https://www.youtube.com/watch?v=VIDEO_ID
    if (parsed.hostname.includes("youtube.com") && parsed.searchParams.has("v")) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
    }
    // https://youtu.be/VIDEO_ID
    if (parsed.hostname === "youtu.be" && parsed.pathname.length > 1) {
      return `https://www.youtube.com/embed${parsed.pathname}`;
    }
  } catch {
    // Invalid URL, return as-is
  }
  return url;
}

interface EmbeddedVideoProps {
  src?: string | null;
  title?: string | null;
}
const EmbeddedVideo: FC<EmbeddedVideoProps> = ({ src, title }) => {
  const embedSrc = src ? toYouTubeEmbedUrl(src) : undefined;
  return (
    <GradientMediaWrapper>
      <iframe
        className="aspect-video w-full"
        src={embedSrc}
        title={title || undefined}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </GradientMediaWrapper>
  );
};

export default EmbeddedVideo;
```

Changes: wrapped the `<iframe>` with `<GradientMediaWrapper>`.

- [ ] **Step 2: Verify no TypeScript errors**

Run from `app/`: `pnpm check-types`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add app/src/components/embedded-video/index.tsx
git commit -m "feat: apply gradient border to embedded videos"
```

---

### Task 4: Visual verification and final commit

- [ ] **Step 1: Run lint and tests**

Run from `app/`:
```bash
pnpm lint --fix && pnpm test --run
```
Expected: no lint errors, all tests pass.

- [ ] **Step 2: Start dev server and verify visually**

Run from `app/`: `pnpm dev`

Open a landscape detail page that has step images or videos. Verify:
- Images and videos have a 16px rounded gradient border (lime at bottom, teal at top)
- Soft teal glow is visible around the media
- Hovering scales the media to 1.02x
- When a step is inactive (opacity 0.3), the border and glow dim naturally
- When a step activates, everything brightens smoothly over 500ms
