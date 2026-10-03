import liveQuotes from "@/data/live-quotes.json";
import { maskName } from "@/lib/mask";
import { LiveQuoteList, statusColor, type QuoteStatus } from "./LiveQuoteList";
import { SectionHeading } from "./SectionHeading";

const statuses: QuoteStatus[] = ["문의접수", "진행중", "완료"];

export function LiveQuoteSection() {
  const counts = statuses.map((status) => ({ status, count: liveQuotes.filter((q) => q.status === status).length }));

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-site">
        <SectionHeading title="실시간 견적 현황" description="지금 들어온 신청과 진행 상황입니다." />

        {/* 이사 출발 안내판 */}
        <div className="mt-10 rounded-3xl border border-[#d6dfee] bg-[#ebf0f8] px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-6">
            <dl className="flex gap-2 sm:gap-3">
              {counts.map(({ status, count }) => (
                <div key={status} className="min-w-[88px] rounded-2xl bg-white px-4 py-3 shadow-[0_1px_2px_rgba(17,24,39,0.06)] sm:min-w-[112px] sm:px-5">
                  <dt className="flex items-center gap-1.5 text-xs text-ink-soft">
                    <span className="size-1.5 rounded-full" style={{ backgroundColor: statusColor[status] }} aria-hidden="true" />
                    {status}
                  </dt>
                  <dd className="mt-1 text-2xl font-bold tabular-nums text-ink sm:text-3xl">{count}</dd>
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
      </div>
    </section>
  );
}
