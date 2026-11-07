/** Loading state: two blank A4 sheets while the quote streams in. */
export function ReportSkeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading your EMI report"
      className="flex flex-col items-center gap-4 px-4 py-6"
    >
      <div className="h-[297mm] w-[210mm] animate-pulse rounded bg-white/70" />
      <div className="h-[297mm] w-[210mm] animate-pulse rounded bg-white/70" />
    </main>
  );
}
