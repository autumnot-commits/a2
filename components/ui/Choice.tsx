import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  error?: string;
};

export function Checkbox({ id, label, description, error, className, ...props }: CheckboxProps) {
  const descId = description ? `${id}-desc` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          className="mt-1 size-5 shrink-0 accent-primary"
          aria-invalid={error ? true : undefined}
          aria-describedby={[descId, errorId].filter(Boolean).join(" ") || undefined}
          {...props}
        />
        <label htmlFor={id} className="text-base text-ink">
          {label}
        </label>
      </div>
      {description && (
        <div id={descId} className="pl-8 text-sm text-ink-soft">
          {description}
        </div>
      )}
      {error && (
        <p id={errorId} className="pl-8 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

type Option = { value: string; label: string; description?: string };

type RadioGroupProps = {
  name: string;
  legend: string;
  options: readonly Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  error?: string;
  columns?: 1 | 2 | 3;
};

const columnClass = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" };

// 이사 유형처럼 선택지가 몇 개 안 되는 항목을 큰 터치 영역의 타일로 보여준다.
export function RadioGroup({
  name,
  legend,
  options,
  value,
  defaultValue,
  onChange,
  required,
  error,
  columns = 2,
}: RadioGroupProps) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <fieldset aria-describedby={errorId} className="flex flex-col gap-2">
      <legend className="mb-1.5 text-sm font-medium text-ink">
        {legend}
        {required ? (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 font-normal text-ink-soft">(선택)</span>
        )}
      </legend>
      <div className={cn("grid gap-2", columnClass[columns])}>
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-[var(--radius-control)] border bg-surface p-3 hover:border-ink/40",
              "has-checked:border-primary has-checked:bg-primary-tint has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary",
              error ? "border-danger" : "border-line",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              required={required}
              checked={value === undefined ? undefined : value === option.value}
              defaultChecked={defaultValue === undefined ? undefined : defaultValue === option.value}
              onChange={onChange ? () => onChange(option.value) : undefined}
              className="mt-1 size-4 shrink-0 accent-primary focus-visible:outline-none"
            />
            <span className="flex flex-col">
              <span className="font-medium text-ink">{option.label}</span>
              {option.description && (
                <span className="text-sm text-ink-soft">{option.description}</span>
              )}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}
