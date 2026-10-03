import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ControlProps = {
  id: string;
  required?: boolean;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
};

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  // 라벨·도움말·오류 메시지와 연결된 접근성 속성을 컨트롤에 넘겨준다.
  children: (control: ControlProps) => ReactNode;
};

export function Field({ id, label, hint, error, required, className, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 font-normal text-ink-soft">(선택)</span>
        )}
      </label>
      {children({
        id,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {hint && (
        <p id={hintId} className="text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export const controlClass =
  "w-full min-h-11 rounded-[var(--radius-control)] border border-line bg-surface px-3 text-base text-ink placeholder:text-ink-soft/70 hover:border-ink/40 aria-invalid:border-danger aria-invalid:bg-danger-tint/40 disabled:bg-paper disabled:text-ink-soft";
