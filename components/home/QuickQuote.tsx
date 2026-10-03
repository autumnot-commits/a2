import { ArrowRightIcon } from "@/components/icons";
import { QuoteButton } from "@/components/quote/wizard/QuoteWizard";
import { site } from "@/config/site";

// 슬라이더 아래 견적 시작 영역. 큰 버튼 하나로 견적 위저드를 연다.
export function QuickQuote() {
  return (
    <section className="bg-white">
      <div className="container-site pb-16 pt-14 lg:pb-20 lg:pt-20">
        <p className="text-[15px] text-ink-soft">평일·주말 상관없이, 365일 무료 방문견적</p>
        <h2 className="mt-3 text-[32px] font-bold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[40px] lg:text-5xl">
          어디서 어디로 이사하시나요?
        </h2>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 lg:mt-10">
          <QuoteButton className="group inline-flex h-16 items-center justify-center gap-2 rounded-full bg-primary px-9 text-lg font-bold text-white shadow-[0_12px_32px_-12px_rgba(29,78,216,0.7)] hover:bg-primary-deep">
            무료 견적 신청하기
            <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
          </QuoteButton>
          <p className="text-[15px] text-ink-soft">1분이면 끝나요 · 방문 견적 무료</p>
        </div>
        <p className="mt-6 text-[15px] text-ink-soft">
          전화로 바로 상담하려면{" "}
          <a href={site.phoneHref} className="font-semibold tabular-nums text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            {site.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
