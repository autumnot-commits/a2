import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-deep",
  // 견적 신청처럼 페이지의 핵심 행동에만 쓴다.
  accent: "bg-ink text-white hover:bg-ink/85",
  outline: "border border-ink/25 bg-surface text-ink hover:border-ink",
  ghost: "text-ink hover:bg-ink/5",
  danger: "bg-danger text-white hover:bg-danger/90",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-4 text-base",
  lg: "min-h-13 px-6 text-lg",
};

type StyleProps = { variant?: Variant; size?: Size };

export function buttonClass({ variant = "primary", size = "md" }: StyleProps = {}) {
  return cn(base, variants[variant], sizes[size]);
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return (
    <button
      type={type}
      className={cn(buttonClass({ variant, size }), className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return (
    <Link className={cn(buttonClass({ variant, size }), className)} {...props} />
  );
}
