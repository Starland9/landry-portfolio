import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Static pill with a status dot. Never animated. */
export function StatusBadge({
  children,
  dot = true,
  className,
}: {
  children: ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm font-medium text-fg",
        className,
      )}
    >
      {dot && <span className="size-2 shrink-0 rounded-full bg-ok" aria-hidden="true" />}
      {children}
    </span>
  );
}
