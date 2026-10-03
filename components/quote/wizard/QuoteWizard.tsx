"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
} from "react";
import { CheckIcon, CloseIcon, LogoMark, PhoneIcon } from "@/components/icons";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import {
  clearDraft,
  emptyData,
  hasProgress,
  loadDraft,
  saveDraft,
  validateStep,
  type WizardData,
} from "./model";
import { ContactStep, DateStep, FromStep, MoveTypeStep, steps, ToStep } from "./Steps";
import { Ticket, ticketSummary } from "./Ticket";

export type QuotePreset = { moveType?: string };
type OpenQuoteWizard = (options?: { preset?: QuotePreset }) => void;

const QuoteWizardContext = createContext<OpenQuoteWizard | null>(null);

export function useQuoteWizard() {
  const open = useContext(QuoteWizardContext);
  if (!open) throw new Error("useQuoteWizard는 QuoteWizardProvider 안에서만 사용할 수 있습니다.");
  return open;
}

// 누르면 견적 위저드를 여는 버튼. preset.moveType을 주면 이사 종류가 선택된 채 날짜 단계부터 시작한다.
export function QuoteButton({ preset, onClick, type = "button", ...props }: ComponentProps<"button"> & { preset?: QuotePreset }) {
  const open = useQuoteWizard();
  return (
    <button
      type={type}
      onClick={(event) => {
        onClick?.(event);
        open({ preset });
      }}
      {...props}
    />
  );
}

type Screen = "resume" | "form" | "done";
const NAVY = "#0f1b3d";
const LAST_STEP = steps.length - 1;

function makeReceipt() {
  const now = new Date();
  const ymd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  return `MV-${ymd}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;
}

export function QuoteWizardProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const autoNextRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [screen, setScreen] = useState<Screen>("form");
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<WizardData>(emptyData);
  const [trigger, setTrigger] = useState(0);
  const [confirmExit, setConfirmExit] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [receipt, setReceipt] = useState("");

  const errors = validateStep(step, data);
  const stepValid = Object.keys(errors).length === 0;

  const start = useCallback((nextData: WizardData, nextStep: number) => {
    setData(nextData);
    setStep(nextStep);
    setDirection(1);
    setTrigger(0);
    setScreen("form");
  }, []);

  const openWizard = useCallback<OpenQuoteWizard>(
    ({ preset } = {}) => {
      setMobile(window.matchMedia("(max-width: 767px)").matches);
      setConfirmExit(false);
      setTicketOpen(false);
      const draft = loadDraft();
      if (preset?.moveType) start({ ...emptyData, moveType: preset.moveType }, 1);
      else if (draft && hasProgress(draft.data)) {
        setData(draft.data);
        setStep(draft.step);
        setScreen("resume");
      } else start(emptyData, 0);
      setIsOpen(true);
      dialogRef.current?.showModal();
    },
    [start],
  );

  const close = useCallback(() => {
    if (autoNextRef.current) clearTimeout(autoNextRef.current);
    dialogRef.current?.close();
    setIsOpen(false);
    setConfirmExit(false);
  }, []);

  // 작성 중이면 바로 닫지 않고 확인을 받는다.
  const requestClose = useCallback(() => {
    if (screen === "form" && hasProgress(data) && !confirmExit) setConfirmExit(true);
    else close();
  }, [screen, data, confirmExit, close]);

  // 입력할 때마다 임시 저장 (개인정보 제외)
  useEffect(() => {
    if (isOpen && screen === "form") saveDraft(step, data);
  }, [isOpen, screen, step, data]);

  // 열려 있는 동안 뒤 페이지 스크롤을 막는다.
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = "";
    };
  }, [isOpen]);

  function update(patch: Partial<WizardData>) {
    setData((current) => ({ ...current, ...patch }));
  }

  function goTo(next: number) {
    if (autoNextRef.current) clearTimeout(autoNextRef.current);
    setDirection(next > step ? 1 : -1);
    setStep(next);
    setTrigger(0);
  }

  function handleNext(event?: FormEvent) {
    event?.preventDefault();
    if (!stepValid) {
      setTrigger((t) => t + 1);
      // 빠진 칸이 화면 밖에 있을 수 있으니 첫 번째 빠진 칸으로 스크롤한다.
      setTimeout(() => {
        dialogRef.current?.querySelector("[data-invalid]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 0);
      return;
    }
    if (step < LAST_STEP) {
      goTo(step + 1);
      return;
    }
    // TODO(QUOTE-08): 서버 접수 연결 전이라 실제로 전송하지 않는다.
    setReceipt(makeReceipt());
    clearDraft();
    setScreen("done");
  }

  const current = steps[step];
  const StepBody = [DateStep, FromStep, ToStep, ContactStep][step - 1];

  return (
    <QuoteWizardContext.Provider value={openWizard}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label="무료 견적 신청"
        onCancel={(event) => {
          event.preventDefault();
          requestClose();
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-[rgba(10,15,40,0.55)] backdrop:backdrop-blur-[4px] md:m-auto md:h-[620px] md:w-[960px] md:max-w-[calc(100vw-2rem)]"
      >
        {isOpen && (
          <motion.div
            className="relative flex size-full overflow-hidden bg-white md:rounded-3xl"
            initial={mobile ? { y: "100%" } : { opacity: 0, scale: 0.97 }}
            animate={mobile ? { y: 0 } : { opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          >
            <LayoutGroup>
              {screen === "done" ? (
                <DoneScreen data={data} receipt={receipt} onClose={close} />
              ) : (
                <>
                  {/* 왼쪽 패널 (PC) */}
                  <aside className="hidden w-[320px] shrink-0 flex-col gap-8 p-7 text-white md:flex" style={{ backgroundColor: NAVY }}>
                    <div className="flex items-center gap-2.5">
                      <LogoMark className="size-7" />
                      <span className="text-lg font-bold">{site.name}</span>
                    </div>
                    <motion.div layoutId="quote-ticket">
                      <Ticket data={data} />
                    </motion.div>
                    <ol className="mt-auto flex flex-col gap-3" aria-label="진행 단계">
                      {steps.map((item, i) => {
                        const done = i < step;
                        const active = i === step && screen === "form";
                        return (
                          <li key={item.label}>
                            <button
                              type="button"
                              disabled={!done}
                              onClick={() => goTo(i)}
                              aria-current={active ? "step" : undefined}
                              className={cn(
                                "flex items-center gap-3 text-[15px]",
                                active ? "font-bold text-white" : done ? "text-white hover:underline" : "text-white/40",
                              )}
                            >
                              <span
                                className={cn(
                                  "flex size-6 items-center justify-center rounded-full text-xs font-bold tabular-nums",
                                  done && "bg-white text-[#0f1b3d]",
                                  active && "bg-primary text-white",
                                  !done && !active && "border border-white/30",
                                )}
                              >
                                {done ? <CheckIcon className="size-3.5" /> : i + 1}
                              </span>
                              {item.label}
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </aside>

                  {/* 오른쪽 패널 */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    {/* 모바일: 미니 티켓 바 + 진행 바 */}
                    <div className="md:hidden" style={{ backgroundColor: NAVY }}>
                      <button
                        type="button"
                        onClick={() => setTicketOpen((v) => !v)}
                        aria-expanded={ticketOpen}
                        className="flex h-14 w-full items-center justify-between px-5 text-left text-[15px] font-semibold text-white"
                      >
                        <span className="truncate">{ticketSummary(data)}</span>
                        <span className="ml-3 shrink-0 text-xs font-normal text-white/60">{ticketOpen ? "접기" : "티켓 보기"}</span>
                      </button>
                      {ticketOpen && (
                        <div className="px-5 pb-5">
                          <Ticket data={data} />
                        </div>
                      )}
                    </div>
                    {screen === "form" && (
                      <div className="flex gap-1 px-5 pt-4 md:hidden" aria-hidden="true">
                        {steps.map((item, i) => (
                          <span key={item.label} className={cn("h-1 flex-1 rounded-full", i <= step ? "bg-primary" : "bg-line")} />
                        ))}
                      </div>
                    )}

                    {screen === "resume" ? (
                      <ResumeScreen
                        onResume={() => setScreen("form")}
                        onRestart={() => {
                          clearDraft();
                          start(emptyData, 0);
                        }}
                        onClose={close}
                      />
                    ) : (
                      <form onSubmit={handleNext} noValidate className="flex min-h-0 flex-1 flex-col">
                        <div className="flex items-center justify-between px-6 pt-5 md:px-12 md:pt-10">
                          <p className="text-[13px] font-extrabold tabular-nums text-primary">
                            STEP {step + 1} / {steps.length}
                          </p>
                          <button type="button" onClick={requestClose} className="-m-2 flex size-10 items-center justify-center rounded-full text-ink-soft hover:bg-muted hover:text-ink">
                            <CloseIcon className="size-5" />
                            <span className="sr-only">닫기</span>
                          </button>
                        </div>

                        <div className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                          <AnimatePresence mode="wait" initial={false} custom={direction}>
                            <motion.div
                              key={step}
                              custom={direction}
                              variants={{
                                enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
                                center: { x: 0, opacity: 1 },
                                exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
                              }}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              className="px-6 pb-8 pt-3 md:px-12"
                            >
                              <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink md:text-[28px]">{current.title}</h2>
                              <p className="mt-1.5 text-[15px] text-ink-soft">{current.description}</p>
                              <div className="mt-7">
                                {step === 0 ? (
                                  <MoveTypeStep
                                    data={data}
                                    update={update}
                                    errors={errors}
                                    trigger={trigger}
                                    onPicked={() => {
                                      // 하나만 고르는 단계는 0.3초 뒤 자동으로 다음 단계로 넘어간다.
                                      if (autoNextRef.current) clearTimeout(autoNextRef.current);
                                      autoNextRef.current = setTimeout(() => goTo(1), 300);
                                    }}
                                  />
                                ) : (
                                  StepBody && <StepBody data={data} update={update} errors={errors} trigger={trigger} />
                                )}
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <div className="border-t border-line px-6 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:px-12 md:py-5">
                          {trigger > 0 && !stepValid && (
                            <p role="alert" className="mb-3 text-right text-[13px] font-medium text-danger">
                              {Object.values(errors)[0]}
                            </p>
                          )}
                          <div className="flex items-center justify-between gap-4">
                            {step > 0 ? (
                              <button type="button" onClick={() => goTo(step - 1)} className="text-[15px] font-medium text-ink-soft hover:text-ink">
                                이전
                              </button>
                            ) : (
                              <span />
                            )}
                            <button
                              type="submit"
                              aria-disabled={!stepValid}
                              className={cn(
                                "h-14 w-full max-w-[200px] rounded-[14px] text-base font-bold text-white transition-colors",
                                stepValid ? "bg-primary hover:bg-primary-deep" : "bg-primary/40",
                              )}
                            >
                              {step === LAST_STEP ? "견적 신청 완료" : "다음"}
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </>
              )}
            </LayoutGroup>

            {confirmExit && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 p-6" role="alertdialog" aria-labelledby="exit-title">
                <div className="w-full max-w-sm rounded-2xl bg-white p-6">
                  <h2 id="exit-title" className="text-lg font-bold text-ink">
                    작성 중인 내용이 있어요. 나갈까요?
                  </h2>
                  <p className="mt-1.5 text-sm text-ink-soft">입력한 내용은 저장돼서 다음에 이어서 작성할 수 있어요. (이름·연락처 제외)</p>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setConfirmExit(false)} className="h-12 rounded-xl border border-line font-semibold text-ink" autoFocus>
                      계속 작성
                    </button>
                    <button type="button" onClick={close} className="h-12 rounded-xl bg-ink font-semibold text-white">
                      나가기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </dialog>
    </QuoteWizardContext.Provider>
  );
}

function ResumeScreen({ onResume, onRestart, onClose }: { onResume: () => void; onRestart: () => void; onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col px-6 pt-5 md:px-12 md:pt-10">
      <div className="flex justify-end">
        <button type="button" onClick={onClose} className="-m-2 flex size-10 items-center justify-center rounded-full text-ink-soft hover:bg-muted hover:text-ink">
          <CloseIcon className="size-5" />
          <span className="sr-only">닫기</span>
        </button>
      </div>
      <div className="my-auto pb-16">
        <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink md:text-[28px]">작성하던 견적이 있어요</h2>
        <p className="mt-2 text-[15px] text-ink-soft">이어서 작성하거나 처음부터 다시 시작할 수 있어요.</p>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={onResume} className="h-14 rounded-[14px] bg-primary px-8 font-bold text-white hover:bg-primary-deep" autoFocus>
            이어서 작성하기
          </button>
          <button type="button" onClick={onRestart} className="h-14 rounded-[14px] border border-line px-8 font-semibold text-ink hover:border-ink/40">
            새로 시작
          </button>
        </div>
      </div>
    </div>
  );
}

function DoneScreen({ data, receipt, onClose }: { data: WizardData; receipt: string; onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-10 text-center text-white" style={{ backgroundColor: NAVY }}>
      <motion.div layoutId="quote-ticket" className="relative w-full max-w-[380px]" transition={{ type: "spring", stiffness: 160, damping: 22 }}>
        <Ticket data={data} className="md:scale-[1.06]" />
        {/* 도장 "쿵" */}
        <motion.span
          className="absolute right-3 top-1/2 flex size-20 -translate-y-1/2 items-center justify-center rounded-full border-4 border-primary text-[15px] font-black text-primary mix-blend-multiply"
          initial={{ scale: 2.4, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: -12 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 420, damping: 14 }}
          aria-hidden="true"
        >
          접수완료
        </motion.span>
      </motion.div>

      <h2 className="mt-10 text-xl font-bold md:text-2xl">{data.name}님, 견적 신청이 접수됐어요!</h2>
      <p className="mt-2 text-[15px] text-white/75">영업시간 기준 30분 안에 연락드릴게요.</p>
      <p className="mt-4 text-sm text-white/60">
        접수번호 <span className="font-semibold tabular-nums text-white">{receipt}</span>
      </p>
      <p className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-xs text-white/80">※ 개발 중인 화면이에요. 아직 실제로 접수·연락되지는 않아요.</p>

      <div className="mt-8 flex w-full max-w-sm gap-2">
        <button type="button" onClick={onClose} className="h-14 flex-1 rounded-[14px] bg-white font-bold text-ink" autoFocus>
          확인
        </button>
        <a href={site.phoneHref} className="flex h-14 flex-1 items-center justify-center gap-2 rounded-[14px] border border-white/30 font-semibold text-white">
          <PhoneIcon className="size-[18px]" />
          고객센터 전화하기
        </a>
      </div>
    </div>
  );
}
