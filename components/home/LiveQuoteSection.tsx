import Link from "next/link";
import { ArrowRightIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/config/site";
import liveQuotes from "@/data/live-quotes.json";
import { maskName } from "@/lib/mask";
import { LiveQuoteList, statusColor, type QuoteStatus } from "./LiveQuoteList";
import { SectionHeading } from "./SectionHeading";

const guides = [
  { href: "/support/faq", label: "자주 묻는 질문" },
  { href: "/support/checklist", label: "이사 체크리스트" },
  { href: "/support/lucky-days", label: "손 없는 날" },
];

const statuses: QuoteStatus[] = ["문의접수", "진행중", "완료"];

export function LiveQuoteSection() {
  const counts = statuses.map((status) => ({ status, count: liveQuotes.filter((q) => q.status === status).length }));

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-site">
        <SectionHeading title="실시간 견적 현황" description="지금 들어온 신청과 진행 상황입니다." />

        {/* 이사 출발 안내판 */}
        <div className="mt-10 rounded-3xl border border-line bg-muted px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-6">
            <dl className="flex gap-8 sm:gap-12">
              {counts.map(({ status, count }) => (
                <div key={status}>
                  <dt className="flex items-center gap-1.5 text-xs text-ink-soft">
                    <span className="size-1.5 rounded-full" style={{ backgroundColor: statusColor[status] }} aria-hidden="true" />
                    {status}
                  </dt>
                  <dd className="mt-1 text-3xl font-bold tabular-nums text-ink">{count}</dd>
                </div>
              ))}
            </dl>
            <span className="flex items-center gap-2 text-xs text-ink-soft">
              <span className="size-2 animate-pulse rounded-full bg-success" aria-hidden="true" />
              실시간 업데이트
            </span>
          </div>
          {/* 이름은 서버에서 가린 뒤 넘긴다 (원래 이름이 페이지 데이터에 실리지 않게) */}
          <LiveQuoteList quotes={liveQuotes.map(({ name, ...quote }) => ({ ...quote, maskedName: maskName(name) }))} />
        </div>

        {/* 전화 상담 + 안내 링크를 카드 없이 한 줄로 */}
        <div className="mt-6 flex flex-col gap-6 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={site.phoneHref} className="flex items-center gap-2.5 text-2xl font-bold tabular-nums tracking-tight text-ink hover:text-primary">
              <PhoneIcon className="size-5 text-primary" />
              {site.phone}
            </a>
            <p className="text-sm text-ink-soft">
              평일 <span className="tabular-nums text-ink">{site.hours.weekday}</span>
              <span className="mx-2 text-line" aria-hidden="true">
                |
              </span>
              주말·공휴일 <span className="tabular-nums text-ink">{site.hours.weekend}</span>
            </p>
          </div>
          <ul className="flex flex-col divide-y divide-line border-t border-line sm:flex-row sm:divide-x sm:divide-y-0 sm:border-t-0">
            {guides.map((guide) => (
              <li key={guide.href} className="py-3 sm:px-6 sm:py-0 sm:first:pl-0 sm:last:pr-0">
                <Link href={guide.href} className="group flex items-center justify-between gap-1.5 text-[15px] font-medium text-ink hover:text-primary sm:justify-start">
                  {guide.label}
                  <ArrowRightIcon className="size-4 text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
