import { formatInr, interpolate } from "@/shared/lib/format";

import type { EmiReport } from "../lib/calculate-emi-report";
import type { EmiInput, ReportContent } from "../schemas/emi-report.schema";
import { ContactPanel } from "./contact-panel";
import { DownPaymentTable } from "./down-payment-table";
import { EmiHeroCard } from "./emi-hero-card";
import { PaymentBreakdownCard } from "./payment-breakdown-card";
import { ReportPage } from "./report-page";
import { SavingsComparison } from "./savings-comparison";
import { SectionGap } from "./section-gap";

interface SummaryPageProps {
  report: EmiReport;
  input: Pick<EmiInput, "unitsPerKwPerMonth" | "tariffPerUnit">;
  content: ReportContent;
  pageCount: number;
}

/** Page 1: the customer's numbers. */
export function SummaryPage({ report, input, content, pageCount }: SummaryPageProps) {
  return (
    <ReportPage
      label="EMI summary"
      pageNumber={1}
      pageCount={pageCount}
      reportDate={report.reportDate}
      company={content.company}
    >
      <div className="grid grid-cols-2 gap-4">
        <EmiHeroCard report={report} />
        <PaymentBreakdownCard report={report} />
      </div>
      <SectionGap className="min-h-3.5" />
      <SavingsComparison report={report} />
      <SectionGap className="min-h-3.5" />
      <DownPaymentTable scenarios={report.scenarios} />
      <SectionGap />
      <ContactPanel contact={content.contact} phone={content.company.phone} />
      <SectionGap className="max-h-[18px] min-h-3" />
      <p className="text-[10px] leading-[1.55] text-muted [text-wrap:pretty]">
        {interpolate(content.disclaimer, {
          units: String(input.unitsPerKwPerMonth),
          tariff: String(input.tariffPerUnit),
          subsidy: formatInr(report.subsidyAmount),
        })}
      </p>
    </ReportPage>
  );
}
