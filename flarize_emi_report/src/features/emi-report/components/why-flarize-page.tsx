import { formatInr, interpolate } from "@/shared/lib/format";

import type { EmiReport } from "../lib/calculate-emi-report";
import type { ReportContent } from "../schemas/emi-report.schema";
import { Checklist } from "./checklist";
import { ProjectPhotos } from "./project-photos";
import { QualityBadges } from "./quality-badges";
import { ReportPage } from "./report-page";
import { SectionGap } from "./section-gap";
import { StepsGrid } from "./steps-grid";
import { TestimonialCallout } from "./testimonial-callout";
import { TrustStrip } from "./trust-strip";

interface WhyFlarizePageProps {
  report: Pick<EmiReport, "reportDate" | "subsidyAmount">;
  content: ReportContent;
  pageCount: number;
}

/** Page 2: why Flarize — trust, process, proof. */
export function WhyFlarizePage({ report, content, pageCount }: WhyFlarizePageProps) {
  const copy = { subsidy: formatInr(report.subsidyAmount) };
  return (
    <ReportPage
      label="Why Flarize"
      pageNumber={2}
      pageCount={pageCount}
      reportDate={report.reportDate}
      company={content.company}
      contentClassName="pb-6"
    >
      <TrustStrip
        highlights={content.trustHighlights.map((item) => ({
          ...item,
          title: interpolate(item.title, copy),
        }))}
      />
      <SectionGap />
      <StepsGrid
        steps={{
          ...content.steps,
          items: content.steps.items.map((step) => ({
            ...step,
            description: interpolate(step.description, copy),
          })),
        }}
      />
      <SectionGap />
      <TestimonialCallout testimonial={content.testimonial} />
      <SectionGap />
      <Checklist
        heading={content.checklist.heading}
        items={content.checklist.items.map((item) => interpolate(item, copy))}
      />
      <SectionGap />
      <QualityBadges quality={content.quality} />
      <SectionGap />
      <ProjectPhotos projects={content.projects} />
    </ReportPage>
  );
}
