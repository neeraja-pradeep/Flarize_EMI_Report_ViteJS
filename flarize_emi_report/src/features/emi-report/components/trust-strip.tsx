import type { ReportContent } from "../schemas/emi-report.schema";

interface TrustStripProps {
  highlights: ReportContent["trustHighlights"];
}

export function TrustStrip({ highlights }: TrustStripProps) {
  return (
    <ul className="grid grid-cols-3 divide-x divide-line rounded-xl border border-line">
      {highlights.map((item) => (
        <li key={item.title} className="px-[18px] py-[13px]">
          <b className="block text-[15px] leading-[1.35] font-bold text-orange">{item.title}</b>
          <span className="text-[11px] text-body">{item.caption}</span>
        </li>
      ))}
    </ul>
  );
}
