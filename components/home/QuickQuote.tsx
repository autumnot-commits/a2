import { ArrowRightIcon, PhoneIcon } from "@/components/icons";
import { QuoteButton } from "@/components/quote/wizard/QuoteWizard";
import { site } from "@/config/site";

// 슬라이더 아래 견적 시작 영역. 가운데 정렬로 큰 버튼 하나에 시선을 모은다.
export function QuickQuote() {
  return (
    <section className="bg-white">
      <div className="container-site flex flex-col items-center py-16 text-center lg:py-24">
        <p className="text-[15px] text-ink-soft">평일·주말 상관없이, 365일 무료 방문견적</p>
        <h2 className="mt-3 text-[32px] font-bold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[44px] lg:text-[56px]">
          어디서 어디로 이사하시나요?
        </h2>

        <QuoteButton className="group mt-10 inline-flex h-16 items-center justify-center gap-2 rounded-full bg-primary px-10 text-lg font-bold text-white shadow-[0_12px_32px_-12px_rgba(29,78,216,0.7)] transition-colors hover:bg-primary-deep lg:mt-12">
          무료 견적 신청하기
          <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
        </QuoteButton>
        <p className="mt-4 text-sm text-ink-soft">5분이면 끝나요 · 방문 견적 무료</p>

        <div className="mt-10 flex items-center gap-2 border-t border-line pt-6 text-[15px] text-ink-soft lg:mt-12">
          <PhoneIcon className="size-4 text-primary" />
          전화로 바로 상담하시려면
          <a href={site.phoneHref} className="font-semibold tabular-nums text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
