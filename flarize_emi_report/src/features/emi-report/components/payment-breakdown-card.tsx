import { formatInr, formatTenure } from "@/shared/lib/format";
import { SectionTitle } from "@/ui/section-title";

import type { EmiReport } from "../lib/calculate-emi-report";
import { LedgerRow } from "./ledger-row";

interface PaymentBreakdownCardProps {
  report: EmiReport;
}

export function PaymentBreakdownCard({ report }: PaymentBreakdownCardProps) {
  const isUpfront = report.subsidyMode === "upfront";
  const isCredited = report.subsidyMode === "credited";
  return (
    <div className="flex flex-col rounded-[14px] border border-line bg-white px-5 pt-[18px] pb-3">
      <SectionTitle className="mb-1 text-base">Payment breakdown</SectionTitle>
      <div>
        <LedgerRow label="System price" value={formatInr(report.quotation)} />
        <LedgerRow
          label={`Down payment (${report.downPaymentPct}%)`}
          value={`− ${formatInr(report.downPayment)}`}
          valueClassName="text-danger"
        />
        {isUpfront && (
          <LedgerRow
            label="PM Surya Ghar subsidy"
            value={`− ${formatInr(report.subsidyApplied)}`}
            valueClassName="text-brand"
          />
        )}
        <LedgerRow isEmphasised label="Loan amount" value={formatInr(report.loan)} />
        <LedgerRow label="Total interest" value={formatInr(report.totalInterest)} />
        <LedgerRow
          label={`Total you repay (${report.emiCount} EMIs)`}
          value={formatInr(report.totalRepay)}
        />
      </div>
      {isCredited && (
        <p className="mt-1.5 rounded-lg bg-mint px-3 py-[9px] text-[11px] leading-normal text-brand-dark">
          Your <b>{formatInr(report.subsidyAmount)}</b> subsidy is credited to your loan after
          about 1–2 months. Your EMI stays the same and your loan ends sooner
          {report.endsEarly && (
            <>
              : about <b>{formatTenure(report.earlyTenureMonths)}</b>, saving roughly{" "}
              <b>{formatInr(report.interestSaved)}</b> in interest
            </>
          )}
          .
        </p>
      )}
    </div>
  );
}
