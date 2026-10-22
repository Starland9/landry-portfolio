import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-control border px-6 text-base leading-none font-semibold no-underline transition-colors hover:no-underline disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "border-transparent bg-accent text-on-accent hover:bg-accent-hover hover:text-on-accent",
  secondary:
    "border-border-strong bg-transparent text-fg hover:bg-frame hover:text-fg",
};

export function buttonClasses(
  variant: Variant = "primary",
  className?: string,
) {
  return cn(base, variants[variant], className);
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

/** Internal navigation styled as a button. */
export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, className)}
      {...props}
    />
  );
}
