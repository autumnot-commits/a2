"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "md" | "lg";
};

const sizes = { md: "max-w-md", lg: "max-w-xl" };

// 네이티브 <dialog>를 써서 포커스 가두기·Esc 닫기·배경 비활성화를 브라우저에 맡긴다.
export function Dialog({ open, onClose, title, children, footer, size = "md" }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn(
        "m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto rounded-[10px] bg-surface p-0 text-ink backdrop:bg-black/50",
        sizes[size],
      )}
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-bold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="-m-2 flex size-10 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-ink/5 hover:text-ink"
          >
            <span className="sr-only">닫기</span>
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="text-ink-soft">{children}</div>
        {footer && <div className="mt-2 flex justify-end gap-2">{footer}</div>}
      </div>
    </dialog>
  );
}
