import type { EmiInput, ReportContent } from "../schemas/emi-report.schema";

/**
 * Static data taken from the approved design. This is the ONLY file that
 * needs to go away when the report is wired to the real API — the shapes are
 * defined by `emi-report.schema.ts`. Copy containing `{subsidy}` is filled in
 * with the customer's subsidy amount at render time.
 */

export const MOCK_EMI_INPUT: EmiInput = {
  reportDate: "22 October 2026",
  systemKw: 3,
  quotation: 230_000,
  downPayment: 80_000,
  tenureYears: 5,
  subsidyMode: "credited",
  subsidyAmount: 78_000,
  subsidyCreditMonth: 2,
  unitsPerKwPerMonth: 120,
  tariffPerUnit: 7,
};

export const MOCK_REPORT_CONTENT: ReportContent = {
  company: {
    logo: { src: "/images/report/logo.png", alt: "Flarize" },
    tagline: "Take charge of your own power",
    address: "Thannikakal, Thumpoly PO, Alappuzha – 688008",
    website: "flarize.com",
    phone: "+91 99950 83579",
  },
  contact: {
    heading: "Call now for your site visit",
    subheading: "Call or WhatsApp our sales team",
    qr: { src: "/images/report/qr.png", alt: "WhatsApp QR code" },
    qrHint: "Scan the code to chat on WhatsApp with your quote details ready.",
    bookingHeading: "Ready to go solar?",
    bookingHint: "Book your site visit online. It takes two minutes.",
    bookingLabel: "Book now",
    bookingUrl: "https://flarize.com/book-site-visit",
  },
  disclaimer:
    "Indicative estimate based on the figures entered and Flarize’s current financing rules; electricity savings assume {units} units per kW per month at ₹{tariff} per unit. Final loan offer, rate and subsidy timing are subject to approval.",
  trustHighlights: [
    { title: "{subsidy} Subsidy", caption: "PM Surya Ghar – guaranteed" },
    { title: "400+ Homes", caption: "Installed in Kerala" },
    { title: "MNRE Empanelled", caption: "Government certified" },
  ],
  steps: {
    heading: "Get started in 3 steps",
    items: [
      {
        title: "Share your KSEB bill",
        description:
          "Send it on WhatsApp or our site. We size your system from your real usage.",
      },
      {
        title: "Get 3 reviewed options",
        description:
          "Within 24 hours: three brands and budgets we’ve already checked. You choose.",
      },
      {
        title: "Site visit, then we do the rest",
        description: "Paperwork, {subsidy} subsidy, installation and 25 years of support.",
      },
    ],
  },
  testimonial: {
    heading: "Watch real Kerala homeowners share their experience",
    description:
      "Scan the QR code to watch 2-minute video interviews with customers in Alappuzha, Kochi and Thrissur. See their rooftop installations and hear their savings stories.",
    link: "flarize.in/testimonials",
    qr: { src: "/images/report/qr2.png", alt: "QR code to customer testimonials" },
  },
  checklist: {
    heading: "One team handles everything",
    items: [
      "A certified installer we picked and checked",
      "BIS-certified panels and inverter",
      "KSEB net metering application and approval",
      "Your {subsidy} PM Surya Ghar subsidy paperwork",
      "Pay in stages, as the work is done",
      "One number to call, for 25 years",
    ],
  },
  quality: {
    heading: "Hand-picked for your home",
    emphasis: "Quality matters.",
    lead: "We never use low-quality products to bring the price down.",
    badges: [
      {
        title: "Tier 1 Brand",
        description: "Bloomberg-listed manufacturer",
        icon: { src: "/images/icons/ic0.png", alt: "" },
      },
      {
        title: "PVEL Top Performer",
        description: "Independently lab tested",
        icon: { src: "/images/icons/ic1.png", alt: "" },
      },
      {
        title: "ALMM2 Listed",
        description: "Domestic cell manufacturing",
        icon: { src: "/images/icons/ic2.png", alt: "" },
      },
      {
        title: "Easy Warranty Claims",
        description: "Direct manufacturer support",
        icon: { src: "/images/icons/ic3.png", alt: "" },
      },
      {
        title: "Local stock available",
        description: "Fast replacement parts",
        icon: { src: "/images/icons/ic4.png", alt: "" },
      },
    ],
  },
  projects: {
    heading: "Homes we’ve powered across Kerala",
    countLabel: "400+ projects across Kerala",
    photos: [
      { src: "/images/homes/home0.jpg", alt: "Rooftop installation, Alappuzha" },
      { src: "/images/homes/home1.jpg", alt: "Rooftop installation, Kuttanad" },
      { src: "/images/homes/home5.jpg", alt: "Rooftop installation, Eara" },
      { src: "/images/homes/home6.jpg", alt: "Rooftop installation, Alappuzha" },
    ],
  },
};
