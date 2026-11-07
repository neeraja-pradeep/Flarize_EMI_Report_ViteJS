import { formatInr } from "@/shared/lib/format";
import { ProgressBar } from "@/ui/progress-bar";
import { SectionTitle } from "@/ui/section-title";

import type { EmiReport } from "../lib/calculate-emi-report";

interface SavingsComparisonProps {
  report: Pick<EmiReport, "emi" | "monthlyBill" | "netMonthly" | "emiBarPct" | "billBarPct">;
}

export function SavingsComparison({ report }: SavingsComparisonProps) {
  const paysForItself = report.netMonthly <= 0;
  return (
    <section>
      <SectionTitle className="mb-2">EMI vs your solar savings</SectionTitle>
      <div className="flex justify-between gap-3">
        <span className="text-body">Solar EMI</span>
        <b className="font-bold">{formatInr(report.emi)}</b>
      </div>
      <ProgressBar percent={report.emiBarPct} fillClassName="bg-navy" className="mt-1" />
      <div className="mt-2.5 flex justify-between gap-3">
        <span className="text-body">Estimated electricity savings</span>
        <b className="font-bold">{formatInr(report.monthlyBill)}</b>
      </div>
      <ProgressBar percent={report.billBarPct} fillClassName="bg-amber" className="mt-1" />
      <div className="mt-3 flex">
        <p className="rounded-full bg-mint px-3.5 py-1.5 font-medium text-brand-dark">
          {paysForItself
            ? "You start saving immediately: about "
            : "Your bill savings cover most of your EMI. Real outgo: about "}
          <b className="font-bold">{formatInr(Math.abs(report.netMonthly))} a month</b>
          {paysForItself ? " after your EMI." : "."}
        </p>
      </div>
    </section>
  );
}
