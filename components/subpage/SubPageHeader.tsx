import Image from "next/image";
import Link from "next/link";
import { PhoneIcon } from "@/components/icons";
import { QuoteButton } from "@/components/quote/wizard/QuoteWizard";
import { buttonClass } from "@/components/ui/Button";
import { site } from "@/config/site";
import type { PricingType, SubPageData } from "@/data/pages/types";

// 서브페이지 첫 화면: 왼쪽에 제목과 소개, 오른쪽에 한눈에 보는 요약 카드.
export function SubPageHeader({ data, section }: { data: SubPageData; section: string }) {
  const pricing = data.sections.find((s) => s.type === "pricing")?.items as PricingType[] | undefined;
  const facts = [
    pricing?.[0] && { label: "시작 가격", value: pricing[0].price },
    pricing?.[0] && { label: "기본 구성", value: `${pricing[0].vehicle} · ${pricing[0].crew}` },
    pricing && { label: "요금 유형", value: `${pricing.length}가지` },
    { label: "방문 견적", value: "무료" },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  return (
    <section className="border-b border-line bg-white">
      <div className="container-site grid gap-10 py-12 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16 lg:py-20">
        <div>
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
        </div>

        <div className="rounded-2xl border border-line p-6 lg:p-7">
          <dl className="divide-y divide-line">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-baseline justify-between gap-4 py-3 first:pt-0">
                <dt className="text-sm text-ink-soft">{fact.label}</dt>
                <dd className="text-right font-semibold tabular-nums text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
            <QuoteButton preset={{ moveType: data.quoteType }} className={buttonClass({ variant: "primary" })}>
              무료 견적 신청
            </QuoteButton>
            <a href={site.phoneHref} className={buttonClass({ variant: "outline" })}>
              <PhoneIcon className="size-[18px]" />
              <span className="sr-only">전화 상담 {site.phone}</span>
            </a>
          </div>
        </div>
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
