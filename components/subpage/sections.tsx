import type { ComponentType, SVGProps } from "react";
import { CheckIcon, EstimateIllustration, OnlineIllustration } from "@/components/icons";
import type { CardIcon, PageSection } from "@/data/pages/types";

type SectionOf<T extends PageSection["type"]> = Extract<PageSection, { type: T }>;

const cardIcons: Record<CardIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  estimate: EstimateIllustration,
  online: OnlineIllustration,
};

const pad = (n: number) => String(n).padStart(2, "0");

// 고객관리: 아이콘 + 제목 + 설명을 구분선으로 나눈 목록
export function CardsSection({ section }: { section: SectionOf<"cards2"> }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {section.items.map((item) => {
        const Icon = cardIcons[item.icon];
        return (
          <li key={item.title} className="grid grid-cols-[56px_1fr] gap-5 py-7 sm:grid-cols-[72px_1fr] sm:gap-7">
            <Icon className="size-14 sm:size-[72px]" />
            <div>
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{item.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// 작업 과정: 윗선과 번호만 있는 단계 목록
export function StepsSection({ section }: { section: SectionOf<"steps"> }) {
  return (
    <ol className="grid gap-x-8 sm:grid-cols-2">
      {section.items.map((item, index) => (
        <li key={item.title} className="border-t border-line pb-8 pt-5">
          <span className="text-sm font-semibold tabular-nums text-primary">{pad(index + 1)}</span>
          <h3 className="mt-2 text-lg font-bold text-ink">{item.title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}

// 서비스 특징: 체크 표시와 글만 있는 2열 목록
export function MeritsSection({ section }: { section: SectionOf<"merits"> }) {
  return (
    <ul className="grid gap-x-10 border-t border-line sm:grid-cols-2">
      {section.items.map((item) => (
        <li key={item.title} className="flex gap-3 border-b border-line py-6">
          <CheckIcon className="mt-1 size-5 shrink-0 text-primary" />
          <div>
            <h3 className="font-bold text-ink">{item.title}</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
