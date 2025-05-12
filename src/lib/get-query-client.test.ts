import { QueryClient } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";

import { getQueryClient } from "./get-query-client";

describe("getQueryClient", () => {
  it("should return a new QueryClient instance on the server", () => {
    const queryClient = getQueryClient();
    expect(queryClient).toBeInstanceOf(QueryClient);
  });

  it("should return the same QueryClient instance on the browser", () => {
    const firstClient = getQueryClient();
    const secondClient = getQueryClient();
    expect(firstClient).toBe(secondClient);
  });
});
