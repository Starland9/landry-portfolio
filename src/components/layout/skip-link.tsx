export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only rounded-control bg-fg px-4 py-3 font-semibold text-bg no-underline focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-50 focus:text-bg"
    >
      {label}
    </a>
  );
}
