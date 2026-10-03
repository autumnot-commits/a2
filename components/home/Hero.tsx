"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "@/components/icons";
import { heroSlides, type HeroSlide } from "@/data/heroSlides";
import { cn } from "@/lib/cn";

const INTERVAL_MS = 5000;

function SlideImage({ slide, priority }: { slide: HeroSlide; priority: boolean }) {
  const body = slide.image ? (
    <Image
      src={slide.image}
      alt={slide.alt}
      fill
      sizes="100vw"
      className="object-cover"
      style={{ objectPosition: slide.position ?? "center" }}
      priority={priority}
    />
  ) : (
    // 이미지가 아직 없을 때: 단색 자리표시
    <div role="img" aria-label={slide.alt} className="size-full" style={{ backgroundColor: slide.bgColor }} />
  );

  return slide.href ? (
    <Link href={slide.href} className="block size-full">
      {body}
    </Link>
  ) : (
    body
  );
}

// 이미지 슬라이더. 5초 자동 재생, 무한 반복, fade 전환.
// 마우스를 올리거나 포커스가 들어오거나 일시정지를 누르면 멈춘다.
export function Hero() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const reduceMotion = useReducedMotion();
  const count = heroSlides.length;
  const slide = heroSlides[index];
  const playing = !stopped && !reduceMotion;

  useEffect(() => {
    if (!playing || hovered || focused || count < 2) return;
    const timer = setTimeout(() => setIndex((current) => (current + 1) % count), INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [index, playing, hovered, focused, count]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="주요 안내"
      className="group relative h-[360px] overflow-hidden bg-muted lg:h-[380px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      {/* 첫 화면의 첫 슬라이드는 애니메이션 없이 바로 보인다 */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${count}개 중 ${index + 1}번째`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SlideImage slide={slide} priority={index === 0} />
        </motion.div>
      </AnimatePresence>

      {count > 1 && (
        <>
          {/* 좌우 화살표: 데스크톱에서 마우스를 올렸을 때만 보인다 */}
          {(["prev", "next"] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => setIndex((index + (direction === "prev" ? -1 : 1) + count) % count)}
              className={cn(
                "absolute top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white opacity-0 transition-opacity hover:bg-black/40 focus-visible:opacity-100 group-hover:opacity-100 lg:flex",
                direction === "prev" ? "left-6" : "right-6",
              )}
            >
              {direction === "prev" ? <ChevronLeftIcon className="size-6" /> : <ChevronRightIcon className="size-6" />}
              <span className="sr-only">{direction === "prev" ? "이전 슬라이드" : "다음 슬라이드"}</span>
            </button>
          ))}

          {/* 하단 페이지네이션 + 일시정지. 어떤 이미지 위에서도 보이도록 반투명 바탕을 깐다. */}
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/25 px-3 py-1.5">
            <div className="flex items-center gap-2">
              {heroSlides.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={i === index ? "true" : undefined}
                  className={cn("h-2 rounded-full transition-all duration-300", i === index ? "w-6 bg-white" : "w-2 bg-white/50")}
                >
                  <span className="sr-only">{i + 1}번 슬라이드 보기</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStopped((value) => !value)}
              className="flex size-5 items-center justify-center text-white/85 hover:text-white"
            >
              {playing ? <PauseIcon className="size-3.5" /> : <PlayIcon className="size-3.5" />}
              <span className="sr-only">{playing ? "자동 넘김 멈추기" : "자동 넘김 시작"}</span>
            </button>
          </div>
        </>
      )}
    </section>
  );
}
