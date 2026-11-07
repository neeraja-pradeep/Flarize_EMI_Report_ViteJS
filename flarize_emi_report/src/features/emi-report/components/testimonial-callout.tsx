import Image from "next/image";

import { SectionTitle } from "@/ui/section-title";

import type { ReportContent } from "../schemas/emi-report.schema";

interface TestimonialCalloutProps {
  testimonial: ReportContent["testimonial"];
}

/** The page's single warm-tinted block: a scannable QR to customer videos. */
export function TestimonialCallout({ testimonial }: TestimonialCalloutProps) {
  return (
    <section className="flex items-center gap-5 rounded-[14px] border border-peach-line bg-peach px-[22px] py-[18px]">
      <Image
        src={testimonial.qr.src}
        alt={testimonial.qr.alt}
        width={104}
        height={104}
        className="box-border block size-[104px] flex-none rounded-lg bg-white p-1.5"
      />
      <div className="flex flex-col gap-1">
        <SectionTitle>{testimonial.heading}</SectionTitle>
        <p className="text-[11.5px] leading-normal text-body [text-wrap:pretty]">
          {testimonial.description}
        </p>
        <span className="mt-0.5 text-xs font-semibold text-orange">{testimonial.link}</span>
      </div>
    </section>
  );
}
