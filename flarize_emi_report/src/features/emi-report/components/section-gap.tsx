import { cn } from "@/shared/lib/cn";

interface SectionGapProps {
  className?: string;
}

/**
 * Flexible vertical space. Gaps share whatever room is left on the A4 sheet
 * evenly, so content fills the page without a dead strip above the footer.
 */
export function SectionGap({ className }: SectionGapProps) {
  return <div aria-hidden className={cn("min-h-4 flex-[1_1_0]", className)} />;
}
