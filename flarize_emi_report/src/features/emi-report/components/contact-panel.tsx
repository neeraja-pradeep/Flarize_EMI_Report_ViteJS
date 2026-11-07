import Image from "next/image";

import type { ReportContent } from "../schemas/emi-report.schema";

interface ContactPanelProps {
  contact: ReportContent["contact"];
  phone: string;
}

/** Call / WhatsApp block with the booking call-to-action underneath. */
export function ContactPanel({ contact, phone }: ContactPanelProps) {
  return (
    <section className="overflow-hidden rounded-[14px] bg-mist">
      <div className="flex items-center gap-5 px-[22px] py-[18px]">
        <Image
          src={contact.qr.src}
          alt={contact.qr.alt}
          width={108}
          height={108}
          className="box-border block size-[108px] flex-none rounded-lg bg-white p-1.5"
        />
        <div className="flex flex-col gap-[3px]">
          <h3 className="font-display text-xl leading-tight font-semibold text-navy">
            {contact.heading}
          </h3>
          <span className="text-body">{contact.subheading}</span>
          <span className="text-[17px] font-bold tracking-[0.2px] text-ink">{phone}</span>
          <span className="text-[11px] text-body">{contact.qrHint}</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-divider px-[22px] py-3.5">
        <div>
          <b className="block text-[13px] text-navy">{contact.bookingHeading}</b>
          <span className="text-[11px] text-body">{contact.bookingHint}</span>
        </div>
        <a
          href={contact.bookingUrl}
          className="inline-block flex-none rounded-full bg-amber px-5 py-2 text-[12.5px] font-bold text-ink no-underline hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          {contact.bookingLabel}
        </a>
      </div>
    </section>
  );
}
