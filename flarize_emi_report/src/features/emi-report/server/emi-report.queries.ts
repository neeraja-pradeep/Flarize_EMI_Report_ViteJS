import "server-only";

import {
  EmiInputSchema,
  ReportContentSchema,
  type EmiInput,
  type ReportContent,
} from "../schemas/emi-report.schema";
import { MOCK_EMI_INPUT, MOCK_REPORT_CONTENT } from "./emi-report.mock";

/** Query-string keys a visitor may override. Everything else is server-owned. */
const OVERRIDABLE_KEYS = [
  "systemKw",
  "quotation",
  "downPayment",
  "tenureYears",
  "subsidyMode",
  "subsidyAmount",
  "subsidyCreditMonth",
  "unitsPerKwPerMonth",
  "tariffPerUnit",
] as const;

type SearchParams = Record<string, string | string[] | undefined>;

/**
 * The customer's quote. Today: the design's sample quote, optionally adjusted
 * through the URL (`?quotation=300000&tenureYears=7`). Anything that fails
 * validation falls back to the sample quote rather than rendering bad maths.
 *
 * TODO(api): replace the mock with `apiFetch('/emi-quotes/:id', { schema: EmiInputSchema })`.
 */
export async function getEmiInput(searchParams: SearchParams = {}): Promise<EmiInput> {
  const overrides: Record<string, string> = {};
  for (const key of OVERRIDABLE_KEYS) {
    const value = searchParams[key];
    const first = Array.isArray(value) ? value[0] : value;
    if (first !== undefined && first !== "") overrides[key] = first;
  }
  const parsed = EmiInputSchema.safeParse({ ...MOCK_EMI_INPUT, ...overrides });
  return parsed.success ? parsed.data : EmiInputSchema.parse(MOCK_EMI_INPUT);
}

/**
 * Static page copy, contact details and image references.
 *
 * TODO(api): replace the mock with a CMS / API call parsed by `ReportContentSchema`.
 */
export async function getReportContent(): Promise<ReportContent> {
  return ReportContentSchema.parse(MOCK_REPORT_CONTENT);
}
