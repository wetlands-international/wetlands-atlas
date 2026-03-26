# Lexical Media Gradient Border with Reveal Transition

**Issue:** [#126](https://github.com/wetlands-international/wetlands-atlas/issues/126)
**Date:** 2026-03-26
**Status:** Approved

## Problem

Images and videos embedded in landscape step content (via Lexical rich text) render as plain rectangles with no decoration. The team agreed on a CSS treatment that looks polished without being distracting.

## Solution

Apply a gradient border, soft glow, and hover scale to all media rendered by the shared Lexical upload converter and embedded video component. Since only landscape steps use media in Lexical content (FAQs do not), no scoping is needed.

## Visual Specification

### Static Styling (always applied)

- **Border radius:** 16px with `overflow: hidden`
- **Gradient border:** 2px, `linear-gradient(0deg, #D5EB4E 0%, #5AC4C6 100%)` — matches the homepage circle gradient (bottom-to-top, lime to teal)
- **Glow:** `box-shadow: 0 0 20px rgba(90, 196, 198, 0.2)`
- **Transition:** `all 500ms ease` for smooth state changes

### Activation Behavior

The gradient border and glow inherit the parent step's opacity transition (0.3 inactive, 1 active) — no extra JS or state management needed. They naturally dim when the step is inactive and brighten when active.

### Hover Effect

- `transform: scale(1.02)` on hover with 300ms transition for a subtle "breathing" feel

### Gradient Border Technique

Use a wrapper element approach:
1. Outer wrapper: gradient background, 2px padding, matching border-radius (16px)
2. Inner element (the image/iframe): fills the wrapper with `border-radius: 14px` (16px minus 2px border)

This avoids `border-image` (which doesn't support `border-radius`) and is more reliable than `mask`-based approaches.

## Target Files

| File | Change |
|------|--------|
| `app/src/components/ui/lexical/converters/upload.tsx` | Wrap `<Image>` in gradient border wrapper |
| `app/src/components/embedded-video/index.tsx` | Wrap `<iframe>` in gradient border wrapper |

## Brand Colors Referenced

- Teal: `#5AC4C6` / `rgba(90, 196, 198, 0.2)` (glow)
- Lime: `#D5EB4E`
- Source: homepage circle gradient in `app/src/containers/home/hero/circle.tsx`

## Out of Scope

- Three.js / WebGL shader effects (overkill given existing map animations)
- Interactive mouse-tracking effects (homepage droplet style)
- Step-activation-aware JS logic in media components (opacity inheritance is sufficient)
