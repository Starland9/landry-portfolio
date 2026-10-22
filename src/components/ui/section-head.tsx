import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadProps = {
  id: string;
  title: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

/** Section title preceded by a 1 px rule, with an optional action on the right. */
export function SectionHead({ id, title, action, as: Heading = "h2", className }: SectionHeadProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-fg pt-4",
        className,
      )}
    >
      <Heading id={id} className={Heading === "h1" ? "text-h1" : "text-h2"}>
        {title}
      </Heading>
      {action}
    </div>
  );
}
