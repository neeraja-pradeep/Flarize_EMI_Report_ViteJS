import { cn } from "@/shared/lib/cn";

interface ProgressBarProps {
  /** 0–100. */
  percent: number;
  /** Fill colour utility, e.g. `bg-navy`. */
  fillClassName: string;
  className?: string;
}

/** Decorative horizontal bar; the value it shows is always printed in text beside it. */
export function ProgressBar({ percent, fillClassName, className }: ProgressBarProps) {
  const width = `${Math.min(100, Math.max(0, percent)).toFixed(1)}%`;
  return (
    <div aria-hidden className={cn("h-3 overflow-hidden rounded-md bg-mist", className)}>
      <div className={cn("h-full rounded-md", fillClassName)} style={{ width }} />
    </div>
  );
}
