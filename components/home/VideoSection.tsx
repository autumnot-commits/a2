"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "@/components/icons";
import { site } from "@/config/site";
import { stats, type Stat } from "@/data/stats";

function PlayBadge() {
  return (
    <span className="relative flex size-[72px] items-center justify-center lg:size-[90px]">
      <span className="absolute inset-0 animate-ping rounded-full bg-primary/40 motion-reduce:animate-none" aria-hidden="true" />
      <span className="relative flex size-full items-center justify-center rounded-full bg-primary text-white shadow-lg">
        <PlayIcon className="ml-1 size-8 lg:size-10" />
      </span>
    </span>
  );
}

// 유튜브: 썸네일과 재생 버튼만 먼저 보여 주고, 누르면 그때 iframe을 불러온다(첫 화면 속도 유지).
// 직접 파일: 누르면 <video>로 재생한다. 둘 다 없으면 "준비 중"을 보여 준다.
function IntroVideo() {
  const [playing, setPlaying] = useState(false);
  const { youtubeId, file, poster }: { youtubeId: string; file: string; poster: string } = site.video;
  const title = `${site.name} 소개 영상`;

  if (playing && youtubeId) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="size-full"
      />
    );
  }
  if (playing && file) {
    return <video src={file} poster={poster || undefined} controls autoPlay playsInline className="size-full bg-black object-contain" />;
  }

  const thumbnail = youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : poster;
  const ready = Boolean(youtubeId || file);

  return (
    <button
      type="button"
      disabled={!ready}
      onClick={() => setPlaying(true)}
      className="group relative flex size-full items-center justify-center bg-linear-to-br from-ink to-[#1e3a8a] bg-cover bg-center disabled:cursor-default"
      style={thumbnail ? { backgroundImage: `url(${thumbnail})` } : undefined}
    >
      <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35 group-disabled:bg-transparent" aria-hidden="true" />
      <span className="relative flex flex-col items-center gap-4">
        <PlayBadge />
        <span className="text-sm font-medium text-white/80">{ready ? `${title} 재생` : "소개 영상 준비 중"}</span>
      </span>
    </button>
  );
}

function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || stat.value === null) return;
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, stat.value]);

  return (
    <span ref={ref} className="tabular-nums">
      {stat.value === null ? "OO" : display.toLocaleString("ko-KR")}
      {stat.suffix}
    </span>
  );
}

export function VideoSection() {
  return (
    <section className="bg-white py-16 lg:py-[100px]">
      <div className="container-site">
        <div className="text-center">
          <p className="text-[13px] font-extrabold tracking-[0.5px] text-primary">ABOUT {site.name}</p>
          <h2 className="mt-3 text-[28px] font-bold tracking-[-0.02em] text-ink lg:text-4xl">믿고 맡기는 {site.name} 이야기</h2>
          <p className="mt-3 text-base text-ink-soft">견적부터 마무리까지, 이사 현장의 모습을 영상으로 확인해 보세요.</p>
        </div>

        <div className="mx-auto mt-10 aspect-video max-w-[1100px] overflow-hidden rounded-2xl shadow-[0_24px_60px_-24px_rgba(17,24,39,0.35)] lg:mt-14">
          <IntroVideo />
        </div>

        <dl className="mx-auto mt-12 grid max-w-[1100px] grid-cols-2 gap-y-8 border-t border-line pt-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="text-sm text-ink-soft">{stat.label}</dt>
              <dd className="mt-1 text-[28px] font-bold tracking-tight text-ink lg:text-4xl">
                <CountUp stat={stat} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
