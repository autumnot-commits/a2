export type CardIcon = "estimate" | "online";

export type PageSection =
  | { type: "cards2"; no: string; title: string; items: { icon: CardIcon; title: string; description: string }[] }
  | { type: "steps"; no: string; title: string; items: { title: string; description: string }[] }
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
