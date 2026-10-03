import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { controlClass } from "./Field";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function Textarea({ className, rows = 4, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea rows={rows} className={cn(controlClass, "py-2.5 leading-relaxed", className)} {...props} />
  );
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select className={cn(controlClass, "appearance-auto pr-8", className)} {...props}>
      {children}
    </select>
  );
}
