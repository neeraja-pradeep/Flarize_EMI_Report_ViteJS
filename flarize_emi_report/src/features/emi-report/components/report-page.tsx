import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

import type { ReportContent } from "../schemas/emi-report.schema";
import { ReportFooter } from "./report-footer";
import { ReportHeader } from "./report-header";
import { SectionGap } from "./section-gap";

interface ReportPageProps {
  /** Accessible name of the sheet, e.g. "EMI summary". */
  label: string;
  pageNumber: number;
  pageCount: number;
  reportDate: string;
  company: ReportContent["company"];
  /** Bottom padding of the content area, to match the sheet's rhythm. */
  contentClassName?: string;
  children: ReactNode;
}

/**
 * One A4 sheet: amber top rule, header, flexible body, navy footer. The sheet
 * clips overflow, so each page's content must fit — see the page components.
 */
export function ReportPage({
  label,
  pageNumber,
  pageCount,
  reportDate,
  company,
  contentClassName,
  children,
}: ReportPageProps) {
  return (
    <section
      aria-label={label}
      className="h-[297mm] w-[210mm] shrink-0 overflow-hidden bg-white shadow-lg print:break-after-page print:shadow-none"
    >
      <div className="box-border flex h-full flex-col border-t-[10px] border-amber font-sans text-xs leading-normal text-ink">
        <div className={cn("flex min-h-0 flex-1 flex-col px-[52px] pt-8 pb-5", contentClassName)}>
          <ReportHeader
            logo={company.logo}
            pageNumber={pageNumber}
            pageCount={pageCount}
            reportDate={reportDate}
          />
          <SectionGap className="max-h-6" />
          {children}
        </div>
        <ReportFooter company={company} />
      </div>
    </section>
  );
}
