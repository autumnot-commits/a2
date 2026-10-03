import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { featuredFaqs } from "@/data/faq";

// 메인 FAQ 요약 (FAQ-11): featured 질문 5개만 보여 주고 전체는 자주하는 질문 페이지로 안내한다.
// FAQPage 구조화 데이터는 같은 질문이 두 페이지에 중복되지 않도록 /support/faq에만 넣는다(FAQ-13).
export function FaqSection() {
  return (
    <section className="border-t border-line bg-white py-16 lg:py-24">
      <div className="container-site grid gap-8 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
        <div>
          <h2 className="text-[28px] font-bold tracking-[-0.02em] text-ink lg:text-[36px]">자주하는 질문</h2>
          <p className="mt-2 text-base text-ink-soft">고객님들이 가장 많이 물어보시는 질문이에요.</p>
          <Link href="/support/faq" className="group mt-6 hidden items-center gap-1.5 text-[15px] font-semibold text-primary lg:inline-flex">
            전체 질문 보기
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div>
          <ul className="border-t border-ink/80">
            {featuredFaqs.map((faq) => (
              <li key={faq.question} className="border-b border-line">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span
                      className="relative size-5 shrink-0 text-ink-soft before:absolute before:left-1/2 before:top-1/2 before:h-0.5 before:w-3.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-current after:absolute after:left-1/2 after:top-1/2 after:h-3.5 after:w-0.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-current after:transition-transform group-open:after:scale-y-0"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="pb-6 pr-9 text-[15px] leading-[1.8] text-ink-soft">{faq.answer}</p>
                </details>
              </li>
            ))}
          </ul>
          <Link href="/support/faq" className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary lg:hidden">
            전체 질문 보기
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
