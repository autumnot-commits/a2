"use client";

import { useState } from "react";
import { ChevronRightIcon, serviceIcons } from "@/components/icons";
import { Input, Textarea } from "@/components/ui/Input";
import { PHONE_VERIFY_ENABLED } from "@/config/site";
import { regions, sidoList } from "@/data/regions";
import { cn } from "@/lib/cn";
import { Calendar } from "./Calendar";
import { elevatorOptions, floors, formatPhone, moveTypes, sizes, type FieldErrors, type WizardData } from "./model";
import { Chip, FieldGroup, Shake, Tile } from "./parts";
import { usePostcode } from "./usePostcode";

export type StepProps = {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  errors: FieldErrors;
  trigger: number;
};

export const steps = [
  { label: "이사 종류", title: "어떤 이사를 하시나요?", description: "가장 가까운 이사 종류를 골라 주세요." },
  { label: "날짜", title: "언제 이사하시나요?", description: "희망 날짜를 고르시면 예상 혼잡도를 함께 보여 드려요." },
  { label: "출발지", title: "지금 어디에 사세요?", description: "출발지 주소와 집 정보를 알려 주세요." },
  { label: "도착지", title: "어디로 이사하세요?", description: "시/군/구까지만 고르셔도 견적을 받으실 수 있어요." },
  { label: "연락처", title: "견적을 받으실 연락처를 알려 주세요", description: "담당 팀장이 이 번호로 연락드려요." },
];

const moveTypeIcon: Record<string, string> = {
  가정이사: "home",
  "원룸·소형이사": "small",
  용달이사: "truck",
  보관이사: "storage",
  사무실이사: "office",
};

function ChipRow({ children, scroll }: { children: React.ReactNode; scroll?: boolean }) {
  return <div className={cn("flex gap-2", scroll ? "-mx-1 overflow-x-auto px-1 pb-1" : "flex-wrap")}>{children}</div>;
}

export function MoveTypeStep({ data, update, errors, trigger, onPicked }: StepProps & { onPicked: () => void }) {
  return (
    <Shake active={Boolean(errors.moveType)} trigger={trigger}>
      <div className="grid gap-3 sm:grid-cols-2">
        {moveTypes.map((type) => {
          const Icon = serviceIcons[moveTypeIcon[type.value]];
          return (
            <Tile
              key={type.value}
              selected={data.moveType === type.value}
              onClick={() => {
                update({ moveType: type.value });
                onPicked();
              }}
              icon={Icon && <Icon className="size-9" />}
              title={type.value}
              description={type.description}
            />
          );
        })}
      </div>
      {errors.moveType && trigger > 0 && <p className="mt-3 text-[13px] font-medium text-danger">{errors.moveType}</p>}
    </Shake>
  );
}

export function DateStep({ data, update, errors, trigger }: StepProps) {
  return (
    <div className="flex flex-col gap-7">
      <FieldGroup label="이사 날짜" error={errors.date} trigger={trigger}>
        <Calendar value={data.date} onChange={(date) => update({ date })} />
      </FieldGroup>
      <FieldGroup label="이사 날짜는 확정하셨나요?" error={errors.dateConfirmed} trigger={trigger}>
        <ChipRow>
          <Chip selected={data.dateConfirmed === "confirmed"} onClick={() => update({ dateConfirmed: "confirmed" })}>
            확정이에요
          </Chip>
          <Chip selected={data.dateConfirmed === "flexible"} onClick={() => update({ dateConfirmed: "flexible" })}>
            바뀔 수 있어요
          </Chip>
        </ChipRow>
      </FieldGroup>
    </div>
  );
}

export function FromStep({ data, update, errors, trigger }: StepProps) {
  const { open, failed } = usePostcode();
  const from = data.from;
  const set = (patch: Partial<WizardData["from"]>) => update({ from: { ...from, ...patch } });

  return (
    <div className="flex flex-col gap-7">
      <FieldGroup label="출발지 주소" error={errors["from.address"]} trigger={trigger}>
        {failed ? (
          <>
            <Input
              value={from.address}
              onChange={(e) => {
                const [sido = "", sigungu = ""] = e.target.value.trim().split(/\s+/);
                set({ address: e.target.value, sido, sigungu });
              }}
              placeholder="예: 서울 강남구 테헤란로 123"
              aria-label="출발지 주소"
            />
            <p className="mt-2 text-[13px] text-ink-soft">주소 검색을 불러오지 못해 직접 입력하실 수 있게 바꿨어요.</p>
          </>
        ) : (
          <button
            type="button"
            onClick={() => open((picked) => set(picked))}
            className={cn(
              "flex h-12 w-full items-center justify-between rounded-[var(--radius-control)] border border-line px-4 text-left text-base hover:border-ink/40",
              from.address ? "text-ink" : "text-ink-soft/70",
            )}
          >
            <span className="truncate">{from.address || "주소 검색"}</span>
            <ChevronRightIcon className="size-4 shrink-0 text-ink-soft" />
          </button>
        )}
        <Input
          className="mt-2"
          value={from.detail}
          onChange={(e) => set({ detail: e.target.value })}
          placeholder="상세 주소 (동·호수, 선택)"
          aria-label="출발지 상세 주소"
        />
      </FieldGroup>
      <FieldGroup label="층수" error={errors["from.floor"]} trigger={trigger}>
        <ChipRow scroll>
          {floors.map((floor) => (
            <Chip key={floor} selected={from.floor === floor} onClick={() => set({ floor })}>
              {floor}
            </Chip>
          ))}
        </ChipRow>
      </FieldGroup>
      <FieldGroup label="엘리베이터" error={errors["from.elevator"]} trigger={trigger}>
        <ChipRow>
          {elevatorOptions.map((option) => (
            <Chip key={option} selected={from.elevator === option} onClick={() => set({ elevator: option })}>
              {option}
            </Chip>
          ))}
        </ChipRow>
      </FieldGroup>
      <FieldGroup label="평수" error={errors["from.size"]} trigger={trigger}>
        <ChipRow>
          {sizes.map((size) => (
            <Chip key={size} selected={from.size === size} onClick={() => set({ size })}>
              {size}
            </Chip>
          ))}
        </ChipRow>
      </FieldGroup>
    </div>
  );
}

export function ToStep({ data, update, errors, trigger }: StepProps) {
  const { open, failed } = usePostcode();
  const [manual, setManual] = useState(false);
  const to = data.to;
  const set = (patch: Partial<WizardData["to"]>) => update({ to: { ...to, ...patch } });

  return (
    <div className="flex flex-col gap-7">
      <FieldGroup label="시/도" error={errors["to.sido"]} trigger={trigger}>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {sidoList.map((sido) => (
            <button
              key={sido}
              type="button"
              aria-pressed={to.sido === sido}
              onClick={() => set({ sido, sigungu: to.sido === sido ? to.sigungu : "", address: to.sido === sido ? to.address : "" })}
              className={cn(
                "h-10 rounded-lg border text-[15px] transition-colors",
                to.sido === sido ? "border-primary bg-primary text-white" : "border-line text-ink hover:border-ink/40",
              )}
            >
              {sido}
            </button>
          ))}
        </div>
      </FieldGroup>

      {to.sido && (
        <FieldGroup label={`${to.sido} 시/군/구`} error={errors["to.sigungu"]} trigger={trigger}>
          <ChipRow>
            {regions[to.sido].map((sigungu) => (
              <Chip key={sigungu} selected={to.sigungu === sigungu} onClick={() => set({ sigungu })}>
                {sigungu}
              </Chip>
            ))}
          </ChipRow>
        </FieldGroup>
      )}

      <div>
        {manual || failed ? (
          <FieldGroup label="정확한 주소" trigger={trigger} optional>
            <Input value={to.address} onChange={(e) => set({ address: e.target.value })} placeholder="도착지 주소" aria-label="도착지 주소" />
          </FieldGroup>
        ) : to.address ? (
          <p className="text-[15px] text-ink">
            {to.address}{" "}
            <button type="button" onClick={() => setManual(true)} className="text-sm text-primary underline underline-offset-4">
              수정
            </button>
          </p>
        ) : (
          <button
            type="button"
            onClick={() =>
              open((picked) => {
                const sido = sidoList.find((name) => picked.sido.startsWith(name)) ?? to.sido;
                set({ address: picked.address, sido, sigungu: picked.sigungu.split(" ")[0] });
              })
            }
            className="text-[15px] font-medium text-primary underline underline-offset-4"
          >
            정확한 주소를 아시면 입력하기
          </button>
        )}
      </div>

      <FieldGroup label="엘리베이터" error={errors["to.elevator"]} trigger={trigger}>
        <ChipRow>
          {elevatorOptions.map((option) => (
            <Chip key={option} selected={to.elevator === option} onClick={() => set({ elevator: option })}>
              {option}
            </Chip>
          ))}
        </ChipRow>
      </FieldGroup>
    </div>
  );
}

const terms = {
  privacy:
    "수집 항목: 이름, 휴대폰 번호, 이사 날짜, 출발지·도착지 정보, 요청사항\n이용 목적: 이사 견적 안내 및 상담\n보유 기간: [보유 기간 확정 필요] 후 파기\n동의를 거부하실 수 있으나, 거부하시면 견적 신청을 하실 수 없습니다.",
  marketing: "이벤트·할인 소식을 문자로 받아 보실 수 있습니다. 동의하지 않으셔도 견적 신청에는 영향이 없습니다.",
};

function Agreement({
  checked,
  onChange,
  label,
  required,
  detail,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  required?: boolean;
  detail: string;
}) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center gap-3 py-2.5 [&::-webkit-details-marker]:hidden">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          onClick={(e) => e.stopPropagation()}
          className="size-5 accent-primary"
          aria-label={label}
        />
        <span className="flex-1 text-[15px] text-ink">
          {label} <span className={required ? "text-primary" : "text-ink-soft"}>({required ? "필수" : "선택"})</span>
        </span>
        <span className="text-[13px] text-ink-soft underline underline-offset-2">
          <span className="group-open:hidden">보기</span>
          <span className="hidden group-open:inline">닫기</span>
        </span>
      </summary>
      <p className="mb-2 ml-8 whitespace-pre-line rounded-lg bg-muted p-3 text-[13px] leading-relaxed text-ink-soft">{detail}</p>
    </details>
  );
}

export function ContactStep({ data, update, errors, trigger }: StepProps) {
  const allAgreed = data.agreePrivacy && data.agreeMarketing;

  return (
    <div className="flex flex-col gap-6">
      <FieldGroup label="이름" error={errors.name} trigger={trigger}>
        <Input value={data.name} onChange={(e) => update({ name: e.target.value })} autoComplete="name" aria-label="이름" />
      </FieldGroup>
      <FieldGroup label="휴대폰 번호" error={errors.phone} trigger={trigger}>
        <div className="flex gap-2">
          <Input
            value={data.phone}
            onChange={(e) => update({ phone: formatPhone(e.target.value) })}
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="010-1234-5678"
            aria-label="휴대폰 번호"
          />
          {PHONE_VERIFY_ENABLED && (
            // TODO: 문자 인증 서비스를 연결한 뒤 동작을 붙인다.
            <button type="button" disabled className="h-11 shrink-0 rounded-[var(--radius-control)] border border-line px-4 text-sm text-ink-soft">
              인증번호 받기
            </button>
          )}
        </div>
      </FieldGroup>
      <FieldGroup label="요청사항" trigger={trigger} optional>
        <Textarea
          value={data.memo}
          onChange={(e) => update({ memo: e.target.value })}
          rows={3}
          maxLength={500}
          placeholder="예: 피아노 있어요, 에어컨 이전 설치도 필요해요"
          aria-label="요청사항"
        />
      </FieldGroup>
      <FieldGroup label="약관 동의" error={errors.agreePrivacy} trigger={trigger}>
        <div className="rounded-xl border border-line px-4 py-1.5">
          <label className="flex items-center gap-3 border-b border-line py-3">
            <input
              type="checkbox"
              checked={allAgreed}
              onChange={(e) => update({ agreePrivacy: e.target.checked, agreeMarketing: e.target.checked })}
              className="size-5 accent-primary"
            />
            <span className="text-[15px] font-bold text-ink">전체 동의</span>
          </label>
          <Agreement checked={data.agreePrivacy} onChange={(agreePrivacy) => update({ agreePrivacy })} label="개인정보 수집·이용 동의" required detail={terms.privacy} />
          <Agreement checked={data.agreeMarketing} onChange={(agreeMarketing) => update({ agreeMarketing })} label="마케팅 정보 수신 동의" detail={terms.marketing} />
        </div>
      </FieldGroup>
    </div>
  );
}
