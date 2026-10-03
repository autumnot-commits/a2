import type { ReactNode } from "react";

export function SectionHeading({ title, description, aside }: { title: string; description?: string; aside?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-[28px] font-bold tracking-[-0.02em] text-ink lg:text-[36px]">{title}</h2>
        {description && <p className="mt-2 text-base text-ink-soft">{description}</p>}
      </div>
      {aside}
    </div>
  );
}
