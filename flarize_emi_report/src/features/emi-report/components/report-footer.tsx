import type { ReportContent } from "../schemas/emi-report.schema";

interface ReportFooterProps {
  company: ReportContent["company"];
}

export function ReportFooter({ company }: ReportFooterProps) {
  return (
    <footer className="flex items-center justify-between gap-3.5 bg-navy px-[52px] py-3.5 text-[10.5px] text-cream">
      <b className="font-display text-sm font-semibold whitespace-nowrap text-amber">
        {company.tagline}
      </b>
      <div className="flex items-center gap-[7px] whitespace-nowrap">
        <span>{company.address}</span>
        <span aria-hidden className="text-line">|</span>
        <span>{company.website}</span>
        <span aria-hidden className="text-line">|</span>
        <span>{company.phone}</span>
      </div>
    </footer>
  );
}
