import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { QuoteButton } from "@/components/quote/wizard/QuoteWizard";
import type { SubPageData } from "@/data/pages/types";

// 서브페이지 첫 화면: 제목, 한 줄 헤드라인, 소개, 그리고 무료 견적 신청 버튼 하나.
export function SubPageHeader({ data, section }: { data: SubPageData; section: string }) {
  return (
    <section className="border-b border-line bg-white">
      <div className="container-site py-12 lg:py-20">
        <nav aria-label="현재 위치">
          <ol className="flex items-center gap-2 text-[13px] text-ink-soft">
            <li>
              <Link href="/" className="hover:text-ink">
                홈
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>{section}</li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {data.title}
            </li>
          </ol>
        </nav>
        <h1 className="mt-5 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-ink lg:text-[56px]">{data.title}</h1>
        <p className="mt-4 text-xl font-semibold text-primary lg:text-2xl">{data.headline}</p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft lg:text-[17px]">
          {data.intro[0]} {data.intro[1]}
        </p>
        <QuoteButton
          preset={{ moveType: data.quoteType }}
          className="group mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-white shadow-[0_12px_32px_-12px_rgba(29,78,216,0.7)] transition-colors hover:bg-primary-deep"
        >
          무료 견적 신청
          <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
        </QuoteButton>
      </div>

      {/* 대표 이미지는 실제로 넣었을 때만 보여 준다 */}
      {data.heroImage && (
        <div className="container-site pb-12 lg:pb-20">
          <div className="relative h-[260px] overflow-hidden rounded-2xl sm:h-[360px] lg:h-[440px]">
            <Image src={data.heroImage} alt="" fill sizes="(min-width: 1400px) 1352px, 100vw" className="object-cover" priority />
          </div>
        </div>
      )}
    </section>
  );
}
