// Public client-facing API of the emi-report feature (handbook §1.5).
// Server data functions are imported by `app/` from `./server/emi-report.queries`.
export { EmiReport } from "./components/emi-report";
export { ReportSkeleton } from "./components/report-skeleton";
export type { EmiInput, ReportContent } from "./schemas/emi-report.schema";
