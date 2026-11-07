import Image from "next/image";

import type { ReportContent } from "../schemas/emi-report.schema";

interface ReportHeaderProps {
  logo: ReportContent["company"]["logo"];
  pageNumber: number;
  pageCount: number;
  reportDate: string;
}

export function ReportHeader({ logo, pageNumber, pageCount, reportDate }: ReportHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-line pb-3.5">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={200}
        height={58}
        className="block h-[38px] w-auto"
      />
      <div className="text-right text-[11px] leading-normal text-body">
        <div>
          Solar EMI report · Page {pageNumber} of {pageCount}
        </div>
        <div>{reportDate}</div>
      </div>
    </header>
  );
}
