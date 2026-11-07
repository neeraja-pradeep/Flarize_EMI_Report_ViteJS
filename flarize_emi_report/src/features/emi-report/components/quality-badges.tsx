import Image from "next/image";

import { SectionTitle } from "@/ui/section-title";

import type { ReportContent } from "../schemas/emi-report.schema";

interface QualityBadgesProps {
  quality: ReportContent["quality"];
}

export function QualityBadges({ quality }: QualityBadgesProps) {
  return (
    <section>
      <SectionTitle>{quality.heading}</SectionTitle>
      <p className="mt-0.5 mb-3 text-[11.5px] text-body">
        <b className="font-semibold text-ink">{quality.emphasis}</b> {quality.lead}
      </p>
      <ul className="grid grid-cols-5 gap-2.5">
        {quality.badges.map((badge) => (
          <li key={badge.title} className="text-center">
            <Image
              src={badge.icon.src}
              alt={badge.icon.alt}
              width={140}
              height={140}
              className="mx-auto mb-1.5 block size-16"
            />
            <b className="block text-[11.5px] leading-[1.35] text-navy">{badge.title}</b>
            <span className="mt-0.5 block text-[10px] leading-[1.4] text-muted">
              {badge.description}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
