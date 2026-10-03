"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "@/components/icons";
import { heroSlides, type HeroSlide } from "@/data/heroSlides";
import { cn } from "@/lib/cn";

const INTERVAL_MS = 5000;

// 이미지는 자르거나 늘리지 않고 원래 크기 그대로 가운데에 둔다. (화면이 더 좁으면 비율을 지키며 줄어든다)
// 양옆 빈 곳은 같은 이미지를 흐리게 깔아 자연스럽게 채운다.
function SlideImage({ slide, priority }: { slide: HeroSlide; priority: boolean }) {
  if (!slide.image || !slide.width || !slide.height) {
    // 이미지가 없을 때: 단색 배경 가운데에 안내 문구
    return (
      <div
        className="relative flex h-[240px] flex-col items-center justify-center overflow-hidden px-6 text-center text-white sm:h-[320px] lg:h-[380px]"
        style={{ backgroundColor: slide.bgColor }}
      >
        {/* 은은한 빛 번짐 */}
        <span className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <span className="pointer-events-none absolute -bottom-32 -right-16 size-96 rounded-full bg-black/10 blur-3xl" aria-hidden="true" />
        <p className="relative flex items-center gap-2 rounded-full border border-white/25 px-3 py-1 text-xs font-medium text-white/85">
          <span className="size-1.5 animate-pulse rounded-full bg-white" aria-hidden="true" />
          곧 공개됩니다
        </p>
        <h2 className="relative mt-5 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">{slide.title ?? slide.alt}</h2>
        {slide.text && <p className="relative mt-3 text-[15px] text-white/75 lg:text-base">{slide.text}</p>}
      </div>
    );
  }

  const image = (
    <Image
      src={slide.image}
      alt={slide.alt}
      width={slide.width}
      height={slide.height}
      sizes={`(max-width: ${slide.width}px) 100vw, ${slide.width}px`}
      className="relative mx-auto block h-auto w-full"
      style={{ maxWidth: slide.width }}
      priority={priority}
    />
  );

  return (
    <div className="relative overflow-hidden">
      <Image src={slide.image} alt="" fill sizes="100vw" aria-hidden="true" className="scale-110 object-cover opacity-70 blur-2xl" />
      {slide.href ? (
        <Link href={slide.href} className="relative block">
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
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
    // 슬라이드 폭은 헤더와 같은 컨테이너(회사 마크 왼쪽 끝 ~ 무료 견적 버튼 오른쪽 끝)에 맞춘다.
    <section className="bg-white pt-4 lg:pt-6">
      <div
        aria-roledescription="carousel"
        aria-label="주요 안내"
        className="container-site group relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
      >
        <div className="grid overflow-hidden rounded-3xl bg-muted">
          {/* 첫 화면의 첫 슬라이드는 애니메이션 없이 바로 보인다 */}
          <AnimatePresence initial={false}>
            <motion.div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${count}개 중 ${index + 1}번째`}
              className="col-start-1 row-start-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SlideImage slide={slide} priority={index === 0} />
            </motion.div>
          </AnimatePresence>
        </div>

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
                  direction === "prev" ? "left-10" : "right-10",
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
      </div>
    </section>
  );
}
