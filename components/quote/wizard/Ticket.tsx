"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { shortDate, shortPlace, type WizardData } from "./model";

// 값이 바뀌면 글자가 타자 치듯 하나씩 나타난다. 비어 있으면 회색 대시.
function TypeText({ value, className }: { value: string; className?: string }) {
  if (!value) return <span className={cn("text-ink-soft/40", className)}>———</span>;
  return (
    <span key={value} className={className} aria-label={value}>
      {Array.from(value).map((char, i) => (
        <motion.span key={i} aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04, duration: 0.01 }}>
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function TruckGlyph() {
  return (
    <svg viewBox="0 0 32 20" className="h-5 w-8 shrink-0 text-primary" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M2 14V4h16v10M18 8h6l5 4v2H2" />
      <circle cx="8" cy="16" r="2.2" fill="#fff" />
      <circle cx="24" cy="16" r="2.2" fill="#fff" />
    </svg>
  );
}

// 이사 티켓: 출발 → 도착, 아래에 날짜·종류·평수. 좌우 반원 노치와 점선으로 절취선을 표현한다.
// notchColor는 티켓 뒤 배경색과 같아야 노치가 뚫린 것처럼 보인다.
export function Ticket({ data, notchColor = "#0f1b3d", className }: { data: WizardData; notchColor?: string; className?: string }) {
  const from = shortPlace(data.from.sido, data.from.sigungu);
  const to = shortPlace(data.to.sido, data.to.sigungu);
  const cells = [
    { label: "DATE", value: shortDate(data.date) },
    { label: "TYPE", value: data.moveType },
    { label: "SIZE", value: data.from.size },
  ];

  return (
    <div className={cn("relative rounded-2xl bg-white text-ink", className)} aria-label="이사 티켓 요약">
      <div className="flex items-center justify-between gap-2 px-5 pb-5 pt-5">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-ink-soft">출발</p>
          <TypeText value={from} className="block truncate text-lg font-bold" />
        </div>
        <TruckGlyph />
        <div className="min-w-0 text-right">
          <p className="text-[11px] font-semibold text-ink-soft">도착</p>
          <TypeText value={to} className="block truncate text-lg font-bold" />
        </div>
      </div>

      <div className="relative h-0" aria-hidden="true">
        <span className="absolute -left-3 -top-3 size-6 rounded-full" style={{ backgroundColor: notchColor }} />
        <span className="absolute -right-3 -top-3 size-6 rounded-full" style={{ backgroundColor: notchColor }} />
        <span className="absolute inset-x-5 top-0 border-t-2 border-dashed border-line" />
      </div>

      <dl className="grid grid-cols-3 gap-2 px-5 pb-5 pt-5">
        {cells.map((cell) => (
          <div key={cell.label} className="min-w-0">
            <dt className="text-[10px] font-bold tracking-wide text-ink-soft">{cell.label}</dt>
            <dd className="mt-1 text-[13px] font-semibold leading-snug">
              <TypeText value={cell.value} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ticketSummary(data: WizardData) {
  const from = shortPlace(data.from.sido, data.from.sigungu) || "출발지";
  const to = shortPlace(data.to.sido, data.to.sigungu) || "도착지";
  return `${from} → ${to} · ${shortDate(data.date) || "날짜"}`;
}
