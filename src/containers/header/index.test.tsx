import { render, screen } from "@testing-library/react";
import { Header } from "./index";
import { beforeEach, describe, expect, it, vi } from "vitest";

import en from "@/i18n/messages/en.json";
import { createTranslator } from "next-intl";

vi.mock("next-intl", async (importActual) => ({
  ...(await importActual()),
  useTranslations: vi
    .fn()
    .mockImplementation(() => createTranslator({ locale: "en", messages: en })),
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the header title", () => {
    render(<Header />);
    expect(screen.getByText("Wetlands!")).toBeDefined();
  });

  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Admin")).toBeDefined();
    expect(screen.getByText("English")).toBeDefined();
    expect(screen.getByText("Español")).toBeDefined();
  });
});
