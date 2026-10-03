"use client";

import { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { congestionLabel, getCongestion, isSonEomneunNal, type Congestion } from "@/data/calendar";
import { cn } from "@/lib/cn";
import { todayString } from "./model";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
const barColor: Record<Congestion, string> = { low: "bg-success", mid: "bg-[#eab308]", high: "bg-danger" };

function toKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// 한 달씩 보이는 달력. 좌우 화살표(모바일은 스와이프)로 월을 넘긴다.
// 날짜 아래 짧은 막대 색으로 예상 혼잡도를, 오른쪽 위 배지로 손 없는 날을 표시한다.
export function Calendar({ value, onChange }: { value: string; onChange: (date: string) => void }) {
  const today = todayString();
  const initial = value ? new Date(`${value}T00:00:00`) : new Date();
  const [month, setMonth] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));
  const touchX = useRef<number | null>(null);

  const thisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const canGoPrev = month > thisMonth;
  const first = month.getDay();
  const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: first }, () => null),
    ...Array.from({ length: total }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)),
  ];

  function shift(delta: number) {
    if (delta < 0 && !canGoPrev) return;
    setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1));
  }

  return (
    <div
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) shift(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={!canGoPrev}
          className="flex size-9 items-center justify-center rounded-full text-ink hover:bg-muted disabled:opacity-30"
        >
          <ChevronLeftIcon className="size-5" />
          <span className="sr-only">이전 달</span>
        </button>
        <p className="font-bold text-ink" aria-live="polite">
          {month.getFullYear()}년 {month.getMonth() + 1}월
        </p>
        <button type="button" onClick={() => shift(1)} className="flex size-9 items-center justify-center rounded-full text-ink hover:bg-muted">
          <ChevronRightIcon className="size-5" />
          <span className="sr-only">다음 달</span>
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 text-center text-xs font-medium text-ink-soft">
        {weekdays.map((day, i) => (
          <span key={day} className={cn("py-1", i === 0 && "text-danger", i === 6 && "text-primary")}>
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((date, i) => {
          if (!date) return <span key={`blank-${i}`} />;
          const key = toKey(date);
          const past = key < today;
          const selected = key === value;
          const congestion = getCongestion(date);
          const son = isSonEomneunNal(date);
          return (
            <div key={key} className="flex justify-center">
              <button
                type="button"
                disabled={past}
                onClick={() => onChange(key)}
                aria-pressed={selected}
                aria-label={`${date.getMonth() + 1}월 ${date.getDate()}일 ${weekdays[date.getDay()]}요일, 예상 혼잡도 ${congestionLabel[congestion]}${son ? ", 손 없는 날" : ""}`}
                className={cn(
                  "relative flex size-11 flex-col items-center justify-center rounded-full text-[15px] tabular-nums transition-colors sm:size-12",
                  selected ? "bg-primary font-bold text-white" : "text-ink hover:bg-muted",
                  past && "cursor-not-allowed text-ink-soft/35 hover:bg-transparent",
                )}
              >
                {date.getDate()}
                {!past && (
                  <span className={cn("mt-0.5 h-[3px] w-3.5 rounded-full", selected ? "bg-white/80" : barColor[congestion])} aria-hidden="true" />
                )}
                {son && !past && (
                  <span
                    className={cn(
                      "absolute -right-1 -top-0.5 rounded-full px-1 text-[9px] font-bold leading-[14px]",
                      selected ? "bg-white text-primary" : "bg-ink text-white",
                    )}
                    aria-hidden="true"
                  >
                    손X
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-soft">
        {(["low", "mid", "high"] as const).map((level) => (
          <span key={level} className="flex items-center gap-1.5">
            <span className={cn("h-[3px] w-3.5 rounded-full", barColor[level])} aria-hidden="true" />
            {congestionLabel[level]}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="rounded-full bg-ink px-1 text-[9px] font-bold leading-[14px] text-white">손X</span>
          손 없는 날
        </span>
      </div>
      <p className="mt-2 text-xs text-ink-soft">손 없는 날·금~토는 비용이 높을 수 있어요. 혼잡도는 예상치예요.</p>
    </div>
  );
}
