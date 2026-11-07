import { cn } from "@/shared/lib/cn";
import { formatInr, formatPercent } from "@/shared/lib/format";
import { SectionTitle } from "@/ui/section-title";

import type { DownPaymentScenario } from "../lib/calculate-emi-report";

interface DownPaymentTableProps {
  scenarios: readonly DownPaymentScenario[];
}

const COLUMN_WIDTHS = ["28.2%", "21.4%", "13.6%", "19.4%", "17.4%"] as const;
const HEADINGS = ["Down payment", "Loan amount", "Rate", "Monthly EMI", "EMI saved"] as const;

export function DownPaymentTable({ scenarios }: DownPaymentTableProps) {
  return (
    <section>
      <SectionTitle className="mb-1">What a bigger down payment does</SectionTitle>
      <table className="w-full table-fixed border-collapse text-left">
        <colgroup>
          {COLUMN_WIDTHS.map((width) => (
            <col key={width} style={{ width }} />
          ))}
        </colgroup>
        <thead>
          <tr className="border-b border-line text-[10.5px] font-semibold text-muted">
            {HEADINGS.map((heading, index) => (
              <th
                key={heading}
                scope="col"
                className={cn(
                  "py-[7px] font-semibold",
                  index === 0 && "pl-2.5",
                  index === HEADINGS.length - 1 ? "pr-2.5" : "pr-2",
                )}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            <tr key={scenario.downPayment} className="border-b border-hairline">
              <td className="py-2 pr-2 pl-2.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span>{formatInr(scenario.downPayment)}</span>
                  {scenario.isCurrentPlan && (
                    <span className="rounded-[10px] bg-mint px-[7px] py-[3px] text-[9.5px] leading-none font-semibold text-brand-dark">
                      Your plan
                    </span>
                  )}
                </div>
              </td>
              <td className="py-2 pr-2">{formatInr(scenario.loan)}</td>
              <td className="py-2 pr-2">{formatPercent(scenario.ratePct)}</td>
              <td className="py-2 pr-2 font-bold">{formatInr(scenario.emi)}</td>
              <td className="py-2 pr-2.5">
                {scenario.emiSaved > 0 ? (
                  <span className="font-semibold text-brand">− {formatInr(scenario.emiSaved)}</span>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
