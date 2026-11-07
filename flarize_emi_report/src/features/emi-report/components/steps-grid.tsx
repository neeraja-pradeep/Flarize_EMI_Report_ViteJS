import { SectionTitle } from "@/ui/section-title";

import type { ReportContent } from "../schemas/emi-report.schema";

interface StepsGridProps {
  steps: ReportContent["steps"];
}

export function StepsGrid({ steps }: StepsGridProps) {
  return (
    <section>
      <SectionTitle className="mb-2.5">{steps.heading}</SectionTitle>
      <ol className="grid grid-cols-3 gap-2.5">
        {steps.items.map((step, index) => (
          <li key={step.title} className="rounded-xl border border-line px-4 py-3.5">
            <div
              aria-hidden
              className="mb-2 flex size-[26px] items-center justify-center rounded-full bg-amber font-bold text-ink"
            >
              {index + 1}
            </div>
            <b className="mb-[3px] block text-[13px] leading-[1.35]">{step.title}</b>
            <span className="block text-[11.5px] leading-normal text-body">{step.description}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
