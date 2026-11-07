import { formatInr, formatPercent } from "@/shared/lib/format";

import type { EmiReport } from "../lib/calculate-emi-report";

interface EmiHeroCardProps {
  report: Pick<EmiReport, "emi" | "emiPerDay" | "tenureYears" | "ratePct" | "subsidyMode">;
}

export function EmiHeroCard({ report }: EmiHeroCardProps) {
  const hasSubsidy = report.subsidyMode !== "none";
  return (
    <div className="flex flex-col rounded-[14px] bg-brand px-6 py-[22px] text-cream">
      <div className="text-[13px] font-medium text-mint">Your monthly EMI</div>
      {hasSubsidy && (
        <div className="mt-2 flex">
          <div className="rounded-full bg-white/16 px-[11px] py-1 text-[10.5px] font-medium text-white">
            ✓ PM Surya Ghar subsidy applied
          </div>
        </div>
      )}
      <div className="mt-2.5 font-display text-[58px] leading-[1.05] font-semibold tracking-[-0.5px] text-white">
        {formatInr(report.emi)}
      </div>
      <div className="mt-1 text-xs text-mint">
        {report.tenureYears} years · {formatPercent(report.ratePct)} interest
      </div>
      <div aria-hidden className="min-h-4 flex-1" />
      <div className="rounded-[10px] bg-white px-4 py-3">
        <div className="text-[19px] leading-[1.3] font-bold text-brand">
          Just {formatInr(report.emiPerDay)} /day
        </div>
        <div className="text-[11.5px] text-body">You need to save per day for your EMI</div>
      </div>
    </div>
  );
}
