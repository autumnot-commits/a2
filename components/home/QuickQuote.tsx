import { ConsultButton } from "@/components/consult/ConsultModal";
import { ArrowRightIcon, KakaoBubbleIcon, PhoneIcon } from "@/components/icons";
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

        {/* 모바일: 손가락으로 누르기 쉬운 큰 버튼 2개 */}
        <div className="mt-8 grid w-full max-w-sm grid-cols-2 gap-2 sm:hidden">
          <a href={site.phoneHref} className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-line text-[15px] font-semibold text-ink">
            <PhoneIcon className="size-5 text-primary" />
            전화 상담
          </a>
          <ConsultButton method="kakao" className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#FEE500] text-[15px] font-semibold text-[#191919]">
            <KakaoBubbleIcon className="size-5" />
            카카오톡 상담
          </ConsultButton>
        </div>
        <p className="mt-3 text-[13px] tabular-nums text-ink-soft sm:hidden">{site.phone}</p>

        {/* PC: 문장형 안내 */}
        <div className="mt-10 hidden flex-col items-center gap-3 border-t border-line pt-6 text-[15px] text-ink-soft sm:flex lg:mt-12">
          <p className="flex items-center gap-2">
            <PhoneIcon className="size-4 text-primary" />
            전화로 바로 상담하시려면
            <a href={site.phoneHref} className="font-semibold tabular-nums text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
              {site.phone}
            </a>
          </p>
          {/* 누르면 무료 상담 창이 카카오톡 상담 화면으로 바로 열린다 */}
          <ConsultButton method="kakao" className="group flex items-center gap-2">
            <KakaoBubbleIcon className="size-4" />
            채팅으로 상담하시려면
            <span className="font-semibold text-ink underline decoration-line underline-offset-4 group-hover:decoration-ink">카카오톡 상담</span>
          </ConsultButton>
        </div>
      </div>
    </section>
  );
}
