import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-[var(--radius-box)] border border-line bg-surface p-5 sm:p-6", className)}
      {...props}
    />
  );
}

type Tone = "neutral" | "info" | "success" | "warning" | "danger";

const tones: Record<Tone, string> = {
  neutral: "bg-ink/8 text-ink",
  info: "bg-primary-tint text-primary-deep",
  success: "bg-success-tint text-success",
  warning: "bg-warning-tint text-warning",
  danger: "bg-danger-tint text-danger",
};

export function Badge({ tone = "neutral", className, ...props }: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium", tones[tone], className)}
      {...props}
    />
  );
}
