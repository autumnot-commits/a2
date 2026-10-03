"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { gallery, type GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/cn";

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

// 현장 사진 갤러리. PC는 큰 사진 1장 + 작은 사진 4장, 모바일은 큰 사진 아래 2열.
// 사진을 누르면 원래 비율 그대로 크게 본다.
export function Gallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (selected) dialogRef.current?.showModal();
  }, [selected]);

  return (
    <div className="mt-14 lg:mt-20">
      <h3 className="text-xl font-bold tracking-tight text-ink lg:text-2xl">현장 사진</h3>
      <p className="mt-1 text-[15px] text-ink-soft">작업 현장의 모습을 사진으로 확인해 보세요.</p>

      <ul className="mt-6 grid grid-cols-2 gap-3 lg:h-[460px] lg:grid-cols-4 lg:grid-rows-2">
        {gallery.slice(0, 5).map((item, i) => (
          <li key={item.caption} className={cn(i === 0 ? "col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto" : "aspect-square lg:aspect-auto")}>
            {item.src ? (
              <button
                type="button"
                onClick={() => setSelected(item)}
                className="group relative block size-full overflow-hidden rounded-2xl bg-muted"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent px-4 pb-3 pt-10 text-left text-sm font-medium text-white">
                  {item.caption}
                </span>
                <span className="sr-only">크게 보기</span>
              </button>
            ) : (
              // 사진 자리표시
              <div className="flex size-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d6dfee] bg-[#f3f6fb] text-ink-soft">
                <CameraIcon className="size-7 opacity-60" />
                <span className="text-sm font-medium text-ink/70">{item.caption}</span>
                <span className="text-xs">사진 준비 중</span>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* 크게 보기 */}
      <dialog
        ref={dialogRef}
        aria-label={selected?.caption ?? "사진 크게 보기"}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] bg-transparent p-0 backdrop:bg-black/75"
      >
        {selected?.src && (
          <figure className="relative">
            <Image
              src={selected.src}
              alt={selected.alt}
              width={selected.width ?? 1200}
              height={selected.height ?? 800}
              sizes="100vw"
              className="h-auto max-h-[calc(100dvh-7rem)] w-auto max-w-full rounded-2xl"
            />
            <figcaption className="mt-3 text-center text-sm text-white/85">{selected.caption}</figcaption>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <CloseIcon className="size-5" />
              <span className="sr-only">닫기</span>
            </button>
          </figure>
        )}
      </dialog>
    </div>
  );
}
