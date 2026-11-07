import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

interface LedgerRowProps {
  label: ReactNode;
  value: ReactNode;
  /** Colour utility for the value, e.g. `text-danger`. */
  valueClassName?: string;
  /** Bolder label and larger value, for the row the others add up to. */
  isEmphasised?: boolean;
}

/** One "label … value" line of the payment breakdown. */
export function LedgerRow({ label, value, valueClassName, isEmphasised = false }: LedgerRowProps) {
  return (
    <div
      className={cn(
        "flex justify-between gap-3 border-b border-hairline last:border-b-0",
        isEmphasised ? "items-baseline py-2" : "py-[7px]",
      )}
    >
      <span className={isEmphasised ? "font-semibold" : "text-body"}>{label}</span>
      <b
        className={cn(
          isEmphasised ? "text-[15px] font-bold" : "font-semibold",
          valueClassName,
        )}
      >
        {value}
      </b>
    </div>
  );
}
