import { SectionTitle } from "@/ui/section-title";

interface ChecklistProps {
  heading: string;
  items: readonly string[];
}

export function Checklist({ heading, items }: ChecklistProps) {
  return (
    <section>
      <SectionTitle className="mb-2.5">{heading}</SectionTitle>
      <ul className="grid grid-cols-2 gap-x-[18px] gap-y-[9px] text-[12.5px] font-semibold">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden className="text-brand">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
