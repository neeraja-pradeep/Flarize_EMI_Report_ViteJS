import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

type SectionTitleProps = ComponentProps<"h3">;

/** Serif section heading used across the report. */
export function SectionTitle({ className, ...props }: SectionTitleProps) {
  return (
    <h3
      className={cn(
        "font-display text-[17px] leading-[1.3] font-semibold text-navy",
        className,
      )}
      {...props}
    />
  );
}
