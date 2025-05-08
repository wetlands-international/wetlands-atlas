import { describe, it, expect } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("merges class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("handles conditional class names", () => {
    expect(cn("class1", false && "class2", "class3")).toBe("class1 class3");
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
  });

  it("merges Tailwind classes correctly", () => {
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });
});
