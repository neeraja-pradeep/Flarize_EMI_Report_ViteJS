import { Suspense } from "react";

import { EmiReport, ReportSkeleton } from "@/features/emi-report";
import {
  getEmiInput,
  getReportContent,
} from "@/features/emi-report/server/emi-report.queries";

export default function HomePage({ searchParams }: PageProps<"/">) {
  return (
    <Suspense fallback={<ReportSkeleton />}>
      <Report searchParams={searchParams} />
    </Suspense>
  );
}

async function Report({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  const [input, content] = await Promise.all([
    getEmiInput(await searchParams),
    getReportContent(),
  ]);
  return <EmiReport input={input} content={content} />;
}
