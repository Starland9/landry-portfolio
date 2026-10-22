import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const iconProps = { size: 18, strokeWidth: 1.75, "aria-hidden": true } as const;

/** Internal link followed by an arrow ("Me contacter →"). */
export function ArrowLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { children: ReactNode }) {
  return (
    <Link className={cn("inline-flex items-center gap-1.5 font-semibold", className)} {...props}>
      {children}
      <ArrowRight {...iconProps} />
    </Link>
  );
}

/** Link to another site: ↗ icon plus a hidden "(external site)" for screen readers. */
export function ExternalLink({
  href,
  externalLabel,
  className,
  children,
}: {
  href: string;
  externalLabel: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight {...iconProps} />
      <span className="sr-only"> {externalLabel}</span>
    </a>
  );
}
