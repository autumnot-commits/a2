"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

// 오류가 있는 상태에서 "다음"을 누를 때마다 좌우로 흔든다.
// 안쪽 입력칸을 다시 만들지 않도록(입력 중 커서·한글 조합이 끊기지 않게) 같은 요소에서 애니메이션만 다시 실행한다.
export function Shake({ active, trigger, children, className }: { active: boolean; trigger: number; children: ReactNode; className?: string }) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (active && trigger > 0) controls.start({ x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.4 } });
    // 흔들기는 "다음"을 누른 순간(trigger 변화)에만 실행한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <motion.div className={className} data-invalid={active || undefined} animate={controls}>
      {children}
    </motion.div>
  );
}

export function FieldGroup({
  label,
  error,
  trigger,
  children,
  optional,
}: {
  label: string;
  error?: string;
  trigger: number;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <Shake active={Boolean(error)} trigger={trigger}>
      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-ink">
          {label}
          {optional && <span className="ml-1 font-normal text-ink-soft">(선택)</span>}
        </legend>
        {children}
        {error && trigger > 0 && <p className="mt-2 text-[13px] font-medium text-danger">{error}</p>}
      </fieldset>
    </Shake>
  );
}

export function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "h-10 shrink-0 whitespace-nowrap rounded-full border px-4 text-[15px] transition-colors",
        selected ? "border-primary bg-primary text-white" : "border-line bg-white text-ink hover:border-ink/40",
      )}
    >
      {children}
    </button>
  );
}

// 큰 선택 타일. 선택하면 테두리·배경이 바뀌고 오른쪽 위에 체크 배지가 튀어나온다. (라디오 버튼 없음)
export function Tile({
  selected,
  onClick,
  icon,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors",
        selected ? "border-primary bg-primary-tint" : "border-line bg-white hover:border-ink/25",
      )}
    >
      <span className="flex size-[60px] shrink-0 items-center justify-center rounded-xl bg-white text-ink">{icon}</span>
      <span>
        <span className="block text-[17px] font-bold text-ink">{title}</span>
        <span className="mt-0.5 block text-[13px] leading-snug text-ink-soft">{description}</span>
      </span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-primary text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
          >
            <CheckIcon className="size-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
