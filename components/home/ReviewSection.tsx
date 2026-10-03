"use client";

import { useState } from "react";
import { StarIcon } from "@/components/icons";
import { Dialog } from "@/components/ui/Dialog";
import reviews from "@/data/reviews.json";
import { SectionHeading } from "./SectionHeading";

type Review = (typeof reviews)[number];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5 text-primary" role="img" aria-label={`5점 만점에 ${rating}점`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={i < rating ? "size-4" : "size-4 opacity-20"} />
      ))}
    </span>
  );
}

function ReviewCard({ review, onOpen }: { review: Review; onOpen: (review: Review) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(review)}
      className="flex h-full w-[320px] shrink-0 flex-col rounded-2xl border border-line bg-white p-6 text-left transition-colors hover:border-ink/30"
    >
      <Stars rating={review.rating} />
      <span className="mt-4 line-clamp-4 flex-1 text-[15px] leading-[1.7] text-ink">{review.body}</span>
      <span className="mt-6 text-sm">
        <span className="font-semibold text-ink">{review.type}</span>
        <span className="ml-2 text-ink-soft">{review.region}</span>
      </span>
    </button>
  );
}

// 화면 전체 폭으로 왼쪽으로 천천히 흐른다. 마우스를 올리거나 포커스가 들어오면 멈춘다.
export function ReviewSection() {
  const [selected, setSelected] = useState<Review | null>(null);

  return (
    <section className="bg-muted py-16 lg:py-24">
      <div className="container-site">
        <SectionHeading title="고객 후기" description="이사를 마친 고객이 남긴 이야기입니다." />
      </div>

      <div className="mt-10 overflow-hidden motion-reduce:overflow-x-auto">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
          <ul className="flex gap-4 pr-4">
            {reviews.map((review) => (
              <li key={review.id}>
                <ReviewCard review={review} onOpen={setSelected} />
              </li>
            ))}
          </ul>
          {/* 끊김 없이 이어지도록 한 번 더 그린다. 보조기기와 키보드에서는 숨긴다. */}
          <ul className="flex gap-4 pr-4 motion-reduce:hidden" aria-hidden="true" inert>
            {reviews.map((review) => (
              <li key={review.id}>
                <ReviewCard review={review} onOpen={setSelected} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Dialog open={selected !== null} onClose={() => setSelected(null)} title={selected ? `${selected.type} 후기` : ""} size="lg">
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm">
              <Stars rating={selected.rating} />
              <span>{selected.region}</span>
            </div>
            <p className="text-[15px] leading-[1.8] text-ink">{selected.body}</p>
          </div>
        )}
      </Dialog>
    </section>
  );
}
