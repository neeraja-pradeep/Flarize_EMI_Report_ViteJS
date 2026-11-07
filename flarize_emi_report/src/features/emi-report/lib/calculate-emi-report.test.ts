import { describe, expect, it } from "vitest";

import type { EmiInput } from "../schemas/emi-report.schema";
import { calculateEmiReport } from "./calculate-emi-report";

const BASE: EmiInput = {
  reportDate: "22 October 2026",
  systemKw: 3,
  quotation: 230_000,
  downPayment: 80_000,
  tenureYears: 5,
  subsidyMode: "credited",
  subsidyAmount: 78_000,
  subsidyCreditMonth: 2,
  unitsPerKwPerMonth: 120,
  tariffPerUnit: 7,
};

describe("calculateEmiReport", () => {
  it("matches the design's sample quote (credited subsidy)", () => {
    const r = calculateEmiReport(BASE);
    expect(Math.round(r.emi)).toBe(2883);
    expect(r.loan).toBe(150_000);
    expect(r.ratePct).toBe(5.75);
    expect(r.endsEarly).toBe(true);
    expect(r.emiCount).toBe(27);
    expect(Math.round(r.monthlyBill)).toBe(2520);
    expect(r.scenarios.map((s) => s.downPayment)).toEqual([23_000, 57_500, 92_000]);
    expect(r.scenarios.filter((s) => s.isCurrentPlan)).toHaveLength(0);
  });

  it("deducts an upfront subsidy from the loan and keeps the full tenure", () => {
    const r = calculateEmiReport({ ...BASE, subsidyMode: "upfront" });
    expect(r.loan).toBe(72_000);
    expect(r.subsidyApplied).toBe(78_000);
    expect(r.endsEarly).toBe(false);
    expect(r.emiCount).toBe(60);
  });

  it("ignores the subsidy when mode is none", () => {
    const r = calculateEmiReport({ ...BASE, subsidyMode: "none" });
    expect(r.loan).toBe(150_000);
    expect(r.endsEarly).toBe(false);
  });

  it("enforces the 10% minimum down payment", () => {
    const r = calculateEmiReport({ ...BASE, downPayment: 0 });
    expect(r.downPayment).toBe(23_000);
  });

  it("uses the higher rate for loans above ₹2 lakh", () => {
    expect(calculateEmiReport({ ...BASE, downPayment: 23_000 }).ratePct).toBe(8);
  });
});
