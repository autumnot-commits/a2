"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/icons";
import { copyText } from "@/lib/copy";
import { cn } from "@/lib/cn";

type CopyState = "idle" | "copied" | "failed";

// 작은 "복사" 버튼. 누르면 text를 복사하고 잠깐 "복사됨"을 보여 준다.
export function CopyButton({ text, label = "복사", className }: { text: string; label?: string; className?: string }) {
  const [state, setState] = useState<CopyState>("idle");

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const ok = await copyText(text, event.currentTarget);
    setState(ok ? "copied" : "failed");
    setTimeout(() => setState("idle"), 2500);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`${text} ${label}`}
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1 rounded-full border px-2.5 text-xs font-medium transition-colors",
        state === "copied" ? "border-success/40 bg-success-tint text-success" : "border-line text-ink-soft hover:border-ink/30 hover:text-ink",
        className,
      )}
    >
      {state === "copied" && <CheckIcon className="size-3.5" />}
      {state === "copied" ? "복사됨" : state === "failed" ? "길게 눌러 복사" : label}
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "번호를 복사했어요." : state === "failed" ? "복사가 지원되지 않아요. 번호를 길게 눌러 복사해 주세요." : ""}
      </span>
    </button>
  );
}
