import { calculateEmiReport } from "../lib/calculate-emi-report";
import type { EmiInput, ReportContent } from "../schemas/emi-report.schema";
import { SummaryPage } from "./summary-page";
import { WhyFlarizePage } from "./why-flarize-page";

const PAGE_COUNT = 2;

interface EmiReportProps {
  input: EmiInput;
  content: ReportContent;
}

/** The complete two-page, A4 EMI report. Pure server component. */
export function EmiReport({ input, content }: EmiReportProps) {
  const report = calculateEmiReport(input);
  return (
    <main className="flex flex-col items-center gap-4 overflow-x-auto px-4 py-6 print:gap-0 print:p-0">
      <SummaryPage report={report} input={input} content={content} pageCount={PAGE_COUNT} />
      <WhyFlarizePage report={report} content={content} pageCount={PAGE_COUNT} />
    </main>
  );
}
