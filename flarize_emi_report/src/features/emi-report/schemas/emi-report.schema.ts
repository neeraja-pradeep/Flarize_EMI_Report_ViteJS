import { z } from "zod";

/**
 * The contract for the EMI report. Everything the report renders comes from
 * one of two shapes: the customer's quote (`EmiInput`) and the static page
 * copy (`ReportContent`). Both are validated at the boundary, so swapping the
 * mock data for a real API only has to satisfy these schemas.
 */

export const SubsidyModeSchema = z.enum(["none", "upfront", "credited"]);
export type SubsidyMode = z.infer<typeof SubsidyModeSchema>;

export const EmiInputSchema = z.object({
  reportDate: z.string().min(1),
  systemKw: z.coerce.number().min(1).max(10),
  quotation: z.coerce.number().int().min(50_000).max(1_000_000),
  downPayment: z.coerce.number().int().min(0).max(1_000_000),
  tenureYears: z.coerce.number().int().min(1).max(10),
  subsidyMode: SubsidyModeSchema,
  subsidyAmount: z.coerce.number().int().min(0).max(78_000),
  /** Month in which a "credited later" subsidy reaches the loan account. */
  subsidyCreditMonth: z.coerce.number().int().min(1).max(12),
  unitsPerKwPerMonth: z.coerce.number().int().min(60).max(160),
  tariffPerUnit: z.coerce.number().min(3).max(12),
});
export type EmiInput = z.infer<typeof EmiInputSchema>;

const HighlightSchema = z.object({ title: z.string(), caption: z.string() });
const StepSchema = z.object({ title: z.string(), description: z.string() });
const ImageSchema = z.object({ src: z.string(), alt: z.string() });
const BadgeSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: ImageSchema,
});

export const ReportContentSchema = z.object({
  company: z.object({
    logo: ImageSchema,
    tagline: z.string(),
    address: z.string(),
    website: z.string(),
    phone: z.string(),
  }),
  contact: z.object({
    heading: z.string(),
    subheading: z.string(),
    qr: ImageSchema,
    qrHint: z.string(),
    bookingHeading: z.string(),
    bookingHint: z.string(),
    bookingLabel: z.string(),
    bookingUrl: z.url(),
  }),
  disclaimer: z.string(),
  trustHighlights: z.array(HighlightSchema),
  steps: z.object({ heading: z.string(), items: z.array(StepSchema) }),
  testimonial: z.object({
    heading: z.string(),
    description: z.string(),
    link: z.string(),
    qr: ImageSchema,
  }),
  checklist: z.object({ heading: z.string(), items: z.array(z.string()) }),
  quality: z.object({
    heading: z.string(),
    emphasis: z.string(),
    lead: z.string(),
    badges: z.array(BadgeSchema),
  }),
  projects: z.object({
    heading: z.string(),
    countLabel: z.string(),
    photos: z.array(ImageSchema),
  }),
});
export type ReportContent = z.infer<typeof ReportContentSchema>;
