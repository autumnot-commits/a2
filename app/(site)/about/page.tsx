import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ConsultButton } from "@/components/consult/ConsultModal";
import { ArrowRightIcon, ChatIcon, CheckIcon, PhoneIcon } from "@/components/icons";
import { QuoteButton } from "@/components/quote/wizard/QuoteWizard";
import { CopyButton } from "@/components/ui/CopyButton";
import { site } from "@/config/site";
import { about } from "@/data/about";

export const metadata: Metadata = {
  title: "진주점 소개",
  description: about.intro,
  alternates: { canonical: "/about" },
};

// 서브페이지와 같은 구조: 왼쪽에 번호·제목(PC에서는 스크롤을 따라옴), 오른쪽에 내용.
function Block({ no, title, description, children }: { no: string; title: string; description?: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`about-${no}`} className="border-b border-line">
      <div className="container-site grid gap-8 py-16 lg:grid-cols-[1fr_2.2fr] lg:gap-16 lg:py-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-semibold tabular-nums text-primary">{no}</p>
          <h2 id={`about-${no}`} className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink lg:text-[30px]">
            {title}
          </h2>
          {description && <p className="mt-3 max-w-xs text-[15px] text-ink-soft">{description}</p>}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const { company, hours } = site;

  return (
    <>
      {/* 상단 */}
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
              <li aria-current="page" className="text-ink">
                진주점 소개
              </li>
            </ol>
          </nav>
          <h1 className="mt-5 text-[40px] font-bold leading-[1.15] tracking-[-0.03em] text-ink lg:text-[56px]">{site.name}</h1>
          <p className="mt-4 text-xl font-semibold text-primary lg:text-2xl">{about.headline}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft lg:text-[17px]">{about.intro}</p>
        </div>
        {/* 진주점 트럭 사진: 자르거나 늘리지 않고 원래 비율 그대로 */}
        <div className="container-site pb-12 lg:pb-20">
          <Image
            src="/slides/asd12232.png"
            alt={`${site.name} 이사 트럭`}
            width={681}
            height={384}
            sizes="(max-width: 720px) 100vw, 681px"
            className="h-auto w-full max-w-[681px] rounded-2xl"
            priority
          />
        </div>
      </section>

      <Block no="01" title="인사말">
        <div className="max-w-2xl">
          {about.greeting.map((paragraph, i) => (
            <p key={i} className={i === 0 ? "text-xl font-semibold leading-relaxed text-ink lg:text-2xl" : "mt-5 text-base leading-[1.9] text-ink-soft lg:text-[17px]"}>
              {paragraph}
            </p>
          ))}
          <p className="mt-8 text-[15px] text-ink">
            {site.name} 대표 <span className="ml-1 font-bold">{company.ceo}</span>
          </p>
        </div>
      </Block>

      <Block no="02" title="진주점의 약속" description="모든 이사를 같은 기준으로 진행합니다.">
        <ol className="grid gap-x-8 sm:grid-cols-3">
          {about.promises.map((promise, i) => (
            <li key={promise.title} className="border-t-2 border-line pb-8 pt-5 first:border-primary">
              <span className="text-sm font-semibold tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-bold text-ink">{promise.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{promise.description}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block no="03" title="서비스 지역" description={about.serviceArea.note}>
        <div className="flex flex-wrap gap-2">
          <span className="flex h-11 items-center gap-1.5 rounded-full bg-primary px-5 text-[15px] font-semibold text-white">
            <CheckIcon className="size-4" />
            {about.serviceArea.main}
          </span>
          {about.serviceArea.nearby.map((area) => (
            <span key={area} className="flex h-11 items-center rounded-full border border-line px-5 text-[15px] text-ink">
              {area}
            </span>
          ))}
        </div>
      </Block>

      <Block no="04" title="연락처">
        <dl className="divide-y divide-line border-y border-line">
          <div className="grid grid-cols-[6rem_1fr] gap-4 py-5">
            <dt className="text-sm text-ink-soft">전화</dt>
            <dd className="flex flex-wrap items-center gap-3">
              <a href={site.phoneHref} className="text-2xl font-bold tabular-nums tracking-tight text-ink hover:text-primary">
                {site.phone}
              </a>
              <CopyButton text={site.phone} />
            </dd>
          </div>
          <div className="grid grid-cols-[6rem_1fr] gap-4 py-5">
            <dt className="text-sm text-ink-soft">상담 시간</dt>
            <dd className="text-[15px] text-ink">
              평일 <span className="tabular-nums">{hours.weekday}</span>
              <br />
              주말·공휴일 <span className="tabular-nums">{hours.weekend}</span>
            </dd>
          </div>
          <div className="grid grid-cols-[6rem_1fr] gap-4 py-5">
            <dt className="text-sm text-ink-soft">주소</dt>
            <dd className="text-[15px] text-ink">{company.address}</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton className="group inline-flex h-14 items-center gap-2 rounded-full bg-primary px-8 font-bold text-white hover:bg-primary-deep">
            무료 견적 신청
            <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
          </QuoteButton>
          <ConsultButton className="inline-flex h-14 items-center gap-2 rounded-full border border-line px-7 font-semibold text-ink hover:border-ink/40">
            <ChatIcon className="size-5 text-primary" />
            무료 상담
          </ConsultButton>
          <a href={site.phoneHref} className="inline-flex h-14 items-center gap-2 rounded-full border border-line px-7 font-semibold text-ink hover:border-ink/40 sm:hidden">
            <PhoneIcon className="size-5 text-primary" />
            전화 걸기
          </a>
        </div>
      </Block>
    </>
  );
}
