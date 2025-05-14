import { describe, expect, it } from "vitest";

import { formatHA, formatNumber, formatPercentage } from "./formats";

describe("formatNumber", () => {
  it("formats numbers with default options", () => {
    expect(formatNumber(1234.567)).toBe("1,234.57");
    expect(formatNumber(0)).toBe("0");
  });

  it("formats numbers with custom options", () => {
    expect(formatNumber(1234.567, { minimumFractionDigits: 1, maximumFractionDigits: 1 })).toBe(
      "1,234.6",
    );
    expect(formatNumber(1234.567, { maximumFractionDigits: 0 })).toBe("1,235");
  });
});

describe("formatPercentage", () => {
  it("formats percentages with default options", () => {
    expect(formatPercentage(0.1234)).toBe("12.34%");
    expect(formatPercentage(1)).toBe("100%");
  });

  it("formats very small percentages", () => {
    expect(formatPercentage(0.00005)).toBe("<0.01%");
    expect(formatPercentage(0.00005, undefined, false)).toBe("<0.01");
  });

  it("formats percentages without display unit", () => {
    expect(formatPercentage(0.1234, undefined, false)).toBe("12.34");
  });
});

describe("formatHA", () => {
  it("formats numbers into hectares with default options", () => {
    expect(formatHA(1234567)).toBe("1.23 M ha");
    expect(formatHA(1000)).toBe("1 K ha");
  });

  it("formats numbers into hectares with custom options", () => {
    expect(formatHA(1234567, { maximumFractionDigits: 1 })).toBe("1.2 M ha");
    expect(formatHA(1000, { minimumFractionDigits: 2 })).toBe("1.00 K ha");
  });
});
