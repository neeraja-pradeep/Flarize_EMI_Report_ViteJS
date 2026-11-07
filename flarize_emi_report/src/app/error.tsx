"use client";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-2xl font-semibold text-navy">
        We couldn’t load your EMI report
      </h1>
      <p className="text-body">Please try again. If it keeps happening, call us on +91 99950 83579.</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-amber px-5 py-2 font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        Try again
      </button>
    </main>
  );
}
