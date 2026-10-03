export type PricingType = {
  name: string;
  summary: string;
  description: string;
  caution?: string;
  // TODO: 실제 가격은 사용자가 직접 입력한다. 지금은 자리표시다.
  price: string;
  vehicle: string;
  crew: string;
  tasks: string[];
};

export type CardIcon = "estimate" | "online";

export type PageSection =
  | { type: "cards2"; no: string; title: string; items: { icon: CardIcon; title: string; description: string }[] }
  | { type: "steps"; no: string; title: string; items: { title: string; description: string }[] }
  | { type: "pricing"; no: string; title: string; items: PricingType[] }
  | { type: "merits"; no: string; title: string; items: { title: string; description: string }[] };

export type SubPageData = {
  slug: string;
  title: string;
  headline: string;
  intro: [string, string];
  heroImage?: string;
  // 하단 견적 버튼을 누르면 견적 모달의 이사 종류로 미리 선택된다.
  quoteType: string;
  sections: PageSection[];
};
