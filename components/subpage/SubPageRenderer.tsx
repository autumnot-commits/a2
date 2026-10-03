import { PhoneIcon } from "@/components/icons";
import { QuoteButton } from "@/components/quote/wizard/QuoteWizard";
import { buttonClass } from "@/components/ui/Button";
import { site } from "@/config/site";
import type { PageSection, SubPageData } from "@/data/pages/types";
import { CardsSection, MeritsSection, StepsSection } from "./sections";
import { SubPageHeader } from "./SubPageHeader";

// 섹션 종류별 한 줄 설명
const descriptions: Record<PageSection["type"], string> = {
  cards2: "견적부터 이사 후까지 한 명의 담당자가 챙깁니다.",
  steps: "방문 견적 후 정해진 순서대로 진행합니다.",
  merits: "같은 이사라도 차이는 작은 데서 납니다.",
};

function SectionBody({ section }: { section: PageSection }) {
  switch (section.type) {
    case "cards2":
      return <CardsSection section={section} />;
    case "steps":
      return <StepsSection section={section} />;
    case "merits":
      return <MeritsSection section={section} />;
  }
}

// 페이지 데이터의 sections 배열 순서대로 섹션을 그린다.
// 각 섹션은 왼쪽에 번호·제목(PC에서는 스크롤을 따라옴), 오른쪽에 내용을 둔다.
export function SubPageRenderer({ data }: { data: SubPageData }) {
  return (
    <>
      <SubPageHeader data={data} section="이사 서비스" />

      {data.sections.map((section) => (
        <section key={section.no} aria-labelledby={`section-${section.no}`} className="border-b border-line">
          <div className="container-site grid gap-8 py-16 lg:grid-cols-[1fr_2.2fr] lg:gap-16 lg:py-24">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-sm font-semibold tabular-nums text-primary">{section.no}</p>
              <h2 id={`section-${section.no}`} className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink lg:text-[30px]">
                {section.title}
              </h2>
              <p className="mt-3 max-w-xs text-[15px] text-ink-soft">{descriptions[section.type]}</p>
            </div>
            <div>
              <SectionBody section={section} />
            </div>
          </div>
        </section>
      ))}

      <section className="container-site py-16 lg:py-24">
        <div className="flex flex-col gap-6 rounded-2xl bg-ink px-8 py-10 text-white md:flex-row md:items-center md:justify-between lg:px-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{data.title}, 무료 견적부터 받아 보세요</h2>
            <p className="mt-2 text-white/70">담당자가 방문해 확정 견적을 드립니다. 견적은 무료입니다.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={site.phoneHref} className="flex h-12 items-center gap-2 rounded-md border border-white/25 px-5 font-semibold tabular-nums hover:border-white/60">
              <PhoneIcon className="size-[18px]" />
              {site.phone}
            </a>
            <QuoteButton preset={{ moveType: data.quoteType }} className={buttonClass({ variant: "primary", size: "md" })}>
              무료 견적 신청
            </QuoteButton>
          </div>
        </div>
      </section>
    </>
  );
}
