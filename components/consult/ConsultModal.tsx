"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { ChatIcon, ChevronLeftIcon, CloseIcon, KakaoBubbleIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

type Method = "phone" | "kakao";
type OpenConsult = (method?: Method) => void;

const ConsultContext = createContext<OpenConsult | null>(null);

export function useConsult() {
  const open = useContext(ConsultContext);
  if (!open) throw new Error("useConsult는 ConsultProvider 안에서만 사용할 수 있습니다.");
  return open;
}

// 누르면 상담 방법(전화·카카오톡)을 고르는 창을 연다.
export function ConsultButton({ method, onClick, type = "button", ...props }: ComponentProps<"button"> & { method?: Method }) {
  const open = useConsult();
  return (
    <button
      type={type}
      onClick={(event) => {
        onClick?.(event);
        open(method);
      }}
      {...props}
    />
  );
}

const kakaoUrl: string = site.kakaoUrl;

function MethodTile({ onClick, icon, title, description }: { onClick: () => void; icon: ReactNode; title: string; description: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-start gap-4 rounded-2xl border-2 border-line p-5 text-left transition-colors hover:border-primary hover:bg-primary-tint"
    >
      {icon}
      <span>
        <span className="block text-[17px] font-bold text-ink">{title}</span>
        <span className="mt-0.5 block text-[13px] text-ink-soft">{description}</span>
      </span>
    </button>
  );
}

function PhonePanel() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 복사가 막힌 환경에서는 번호를 직접 보고 걸 수 있다.
    }
  }

  return (
    <div className="text-center">
      <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary-tint text-primary">
        <PhoneIcon className="size-8" />
      </span>
      <p className="mt-5 text-sm text-ink-soft">전화 상담</p>
      <p className="mt-1 text-[34px] font-bold tabular-nums tracking-tight text-ink">{site.phone}</p>
      <dl className="mx-auto mt-3 grid w-fit grid-cols-[auto_auto] gap-x-4 gap-y-1 text-sm">
        <dt className="text-ink-soft">평일</dt>
        <dd className="tabular-nums text-ink">{site.hours.weekday}</dd>
        <dt className="text-ink-soft">주말·공휴일</dt>
        <dd className="tabular-nums text-ink">{site.hours.weekend}</dd>
      </dl>
      <div className="mt-7 grid grid-cols-[1fr_auto] gap-2">
        <a href={site.phoneHref} className="flex h-14 items-center justify-center gap-2 rounded-[14px] bg-primary font-bold text-white hover:bg-primary-deep">
          <PhoneIcon className="size-5" />
          전화 걸기
        </a>
        <button type="button" onClick={copy} className="h-14 rounded-[14px] border border-line px-5 font-semibold text-ink hover:border-ink/40">
          {copied ? "복사됨" : "번호 복사"}
        </button>
      </div>
      <p className="mt-3 text-[13px] text-ink-soft" aria-live="polite">
        {copied ? "번호를 복사했어요." : <span className="hidden md:inline">PC에서는 번호를 복사해 휴대폰으로 걸어 주세요.</span>}
      </p>
    </div>
  );
}

function KakaoPanel() {
  const ready = Boolean(kakaoUrl);
  return (
    <div className="text-center">
      <KakaoBubbleIcon className="mx-auto size-16" />
      <p className="mt-5 text-[22px] font-bold text-ink">카카오톡으로 편하게 상담하세요</p>
      <p className="mt-2 text-[15px] text-ink-soft">
        사진을 보내 주시면 짐의 양을 보고 더 정확하게 안내해 드려요.
        <br />
        답변은 상담 시간({site.hours.weekday}) 안에 드려요.
      </p>
      {ready ? (
        <a
          href={kakaoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 flex h-14 items-center justify-center gap-2 rounded-[14px] bg-[#FEE500] font-bold text-[#191919] hover:brightness-95"
        >
          <ChatIcon className="size-5" />
          카카오톡으로 상담하기
          <span className="sr-only">(새 창)</span>
        </a>
      ) : (
        <button type="button" disabled className="mt-7 h-14 w-full cursor-not-allowed rounded-[14px] bg-[#FEE500]/50 font-bold text-[#191919]/60">
          카카오톡 채널 준비 중
        </button>
      )}
    </div>
  );
}

export function ConsultProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [method, setMethod] = useState<Method | null>(null);

  const open = useCallback<OpenConsult>((next) => {
    setMethod(next ?? null);
    setIsOpen(true);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setIsOpen(false);
  }, []);

  return (
    <ConsultContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label="무료 상담"
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-[440px] rounded-3xl bg-white p-0 backdrop:bg-[rgba(10,15,40,0.55)] backdrop:backdrop-blur-[4px]"
      >
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="p-6 sm:p-8">
            <div className="flex h-10 items-center justify-between">
              {method ? (
                <button type="button" onClick={() => setMethod(null)} className="-ml-2 flex items-center gap-1 rounded-full px-2 py-1 text-sm text-ink-soft hover:text-ink">
                  <ChevronLeftIcon className="size-4" />
                  다른 방법 선택
                </button>
              ) : (
                <p className="text-[13px] font-extrabold text-primary">무료 상담</p>
              )}
              <button type="button" onClick={close} className="-mr-2 flex size-10 items-center justify-center rounded-full text-ink-soft hover:bg-muted hover:text-ink">
                <CloseIcon className="size-5" />
                <span className="sr-only">닫기</span>
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={method ?? "choose"}
                initial={{ opacity: 0, x: method ? 24 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: method ? -24 : 24 }}
                transition={{ duration: 0.18 }}
                className={cn("pt-2", method && "pt-4")}
              >
                {method === "phone" ? (
                  <PhonePanel />
                ) : method === "kakao" ? (
                  <KakaoPanel />
                ) : (
                  <>
                    <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink">어떤 방법으로 상담하시겠어요?</h2>
                    <p className="mt-1.5 text-[15px] text-ink-soft">견적과 일정, 궁금한 점 무엇이든 물어보세요.</p>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <MethodTile
                        onClick={() => setMethod("phone")}
                        icon={
                          <span className="flex size-12 items-center justify-center rounded-xl bg-primary-tint text-primary">
                            <PhoneIcon className="size-6" />
                          </span>
                        }
                        title="전화 상담"
                        description="바로 통화하세요"
                      />
                      <MethodTile onClick={() => setMethod("kakao")} icon={<KakaoBubbleIcon className="size-12" />} title="카카오톡 상담" description="채팅으로 편하게" />
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </dialog>
    </ConsultContext.Provider>
  );
}
