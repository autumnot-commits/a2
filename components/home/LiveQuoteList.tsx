"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export type QuoteStatus = "문의접수" | "진행중" | "완료";
// name은 서버에서 이미 가린 이름("김○영")만 받는다. 원래 이름은 브라우저로 보내지 않는다.
export type LiveQuote = { id: number; status: string; type: string; from: string; to: string; maskedName: string };

// 밝은 안내판 위에서 읽히는 상태 색
export const statusColor: Record<QuoteStatus, string> = {
  문의접수: "#1d4ed8",
  진행중: "#b45309",
  완료: "#15803d",
};

// "서울 강남구"를 모바일에서는 "강남구"만 보여 준다.
function Place({ value }: { value: string }) {
  const short = value.split(" ").at(-1);
  return (
    <span className="truncate">
      <span className="sm:hidden">{short}</span>
      <span className="hidden sm:inline">{value}</span>
    </span>
  );
}

const ROW_HEIGHT = 56;
const VISIBLE_ROWS = 6;
const INTERVAL_MS = 3000;
const columns = "grid grid-cols-[1fr_auto] items-center gap-3 sm:grid-cols-[1.6fr_1fr_5.5rem_5.5rem] sm:gap-5";

// 이사 출발 안내판. 6줄을 보여주고 3초마다 한 줄씩 위로 넘긴다. 마우스를 올리거나 포커스가 들어오면 멈춘다.
export function LiveQuoteList({ quotes }: { quotes: LiveQuote[] }) {
  const [items, setItems] = useState(quotes);
  const [shifting, setShifting] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const canRoll = items.length > VISIBLE_ROWS && !paused && !reduceMotion;

  useEffect(() => {
    if (!canRoll) return;
    const timer = setInterval(() => setShifting(true), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [canRoll]);

  function handleTransitionEnd() {
    setItems(([first, ...rest]) => [...rest, first]);
    setShifting(false);
  }

  return (
    <div>
      <div className={`${columns} border-b border-[#c9d4e6] pb-3 text-xs text-ink-soft`} aria-hidden="true">
        <span>구간</span>
        <span className="hidden sm:block">종류</span>
        <span className="hidden sm:block">고객</span>
        <span className="text-right">상태</span>
      </div>
      <div
        className="overflow-hidden"
        style={{ height: VISIBLE_ROWS * ROW_HEIGHT }}
        tabIndex={0}
        aria-label="최근 견적 신청 현황"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <ul
          style={{
            transform: shifting ? `translateY(-${ROW_HEIGHT}px)` : undefined,
            transition: shifting ? "transform 600ms ease" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {items.slice(0, VISIBLE_ROWS + 1).map((quote) => (
            <li key={quote.id} className={`${columns} border-b border-[#d6dfee] text-[15px]`} style={{ height: ROW_HEIGHT }}>
              <span className="flex min-w-0 items-center gap-2 text-ink">
                <Place value={quote.from} />
                <span className="shrink-0 text-ink-soft/60" aria-hidden="true">
                  →
                </span>
                <span className="sr-only">에서</span>
                <Place value={quote.to} />
              </span>
              <span className="hidden truncate text-ink-soft sm:block">{quote.type}</span>
              <span className="hidden text-ink-soft sm:block">{quote.maskedName} 고객</span>
              <span className="flex items-center justify-end gap-1.5 text-sm font-medium" style={{ color: statusColor[quote.status as QuoteStatus] }}>
                <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                {quote.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
