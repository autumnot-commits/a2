"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@/components/icons";
import reviews from "@/data/reviews.json";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./SectionHeading";

const pad = (n: number) => String(n).padStart(2, "0");
const NOTCH = "#f6f7f9"; // 섹션 배경색과 같아야 노치가 뚫린 것처럼 보인다

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5 text-primary" role="img" aria-label={`5점 만점에 ${rating}점`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={i < rating ? "size-4" : "size-4 opacity-20"} />
      ))}
    </span>
  );
}

// 후기 티켓: 위에 이사 구간, 절취선, 아래에 후기 전문. 오른쪽 목록에서 고르면 바뀐다.
export function ReviewSection() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];
  const total = reviews.length;
  const go = (next: number) => setIndex((next + total) % total);

  return (
    <section className="bg-muted py-16 lg:py-24">
      <div className="container-site">
        <SectionHeading title="고객 후기" description="이사를 마치신 고객님들이 남겨 주신 이야기입니다." />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-10">
          <article className="flex flex-col rounded-3xl bg-white" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-1 flex-col"
              >
                <header className="flex flex-wrap items-end justify-between gap-3 px-6 pb-6 pt-7 sm:px-9 sm:pt-9">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-ink-soft">{review.type}</p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight text-ink sm:text-2xl">{review.region}</h3>
                  </div>
                  <Stars rating={review.rating} />
                </header>

                <div className="relative h-0" aria-hidden="true">
                  <span className="absolute -left-3 -top-3 size-6 rounded-full" style={{ backgroundColor: NOTCH }} />
                  <span className="absolute -right-3 -top-3 size-6 rounded-full" style={{ backgroundColor: NOTCH }} />
                  <span className="absolute inset-x-6 top-0 border-t-2 border-dashed border-line sm:inset-x-9" />
                </div>

                <p className="flex-1 px-6 pb-6 pt-7 text-lg leading-[1.8] text-ink sm:min-h-[150px] sm:px-9 sm:pt-8 sm:text-xl">{review.body}</p>
              </motion.div>
            </AnimatePresence>

            <footer className="flex items-center justify-between px-6 pb-6 sm:px-9 sm:pb-8">
              <p className="text-sm tabular-nums text-ink-soft">
                <span className="font-semibold text-ink">{pad(index + 1)}</span> / {pad(total)}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(index - 1)} className="flex size-11 items-center justify-center rounded-full border border-line text-ink hover:border-ink/40">
                  <ChevronLeftIcon className="size-5" />
                  <span className="sr-only">이전 후기</span>
                </button>
                <button type="button" onClick={() => go(index + 1)} className="flex size-11 items-center justify-center rounded-full border border-line text-ink hover:border-ink/40">
                  <ChevronRightIcon className="size-5" />
                  <span className="sr-only">다음 후기</span>
                </button>
              </div>
            </footer>
          </article>

          {/* 후기 목록 (PC) */}
          <ul className="hidden max-h-[420px] overflow-y-auto border-t border-line lg:block" aria-label="후기 목록">
            {reviews.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "relative w-full border-b border-line py-4 pl-5 pr-2 text-left transition-colors hover:bg-white/60",
                    "before:absolute before:inset-y-3 before:left-0 before:w-[3px] before:rounded-full before:transition-colors",
                    i === index ? "before:bg-primary" : "before:bg-transparent",
                  )}
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className={cn("truncate text-[15px] font-semibold", i === index ? "text-ink" : "text-ink/80")}>{item.region}</span>
                    <span className="shrink-0 text-xs text-ink-soft">{item.type}</span>
                  </span>
                  <span className="mt-1 block truncate text-sm text-ink-soft">{item.body}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
