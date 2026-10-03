import { storagePricing } from "@/data/pricing/storage";
import { customerCareSection } from "./shared";
import type { SubPageData } from "./types";

// TODO(INFO-02): 문구는 회사 기준으로 확인한다.
export const storagePage: SubPageData = {
  slug: "storage",
  title: "보관 이사",
  headline: "입주일까지 짐은 저희가 맡겠습니다",
  intro: ["이사 날짜와 입주 날짜가 맞지 않을 때 짐을 맡아 드립니다.", "보관부터 입주일 배송까지 한 번에 해결하세요."],
  quoteType: "보관이사",
  sections: [
    customerCareSection,
    {
      type: "steps",
      no: "02",
      title: "이사서비스 작업 과정",
      items: [
        { title: "보관 상담", description: "보관 기간과 짐의 양을 확인해 보관 공간을 정합니다." },
        { title: "포장·입고", description: "짐을 포장해 보관 창고로 옮기고 목록을 정리합니다." },
        { title: "보관", description: "정해진 기간 동안 짐을 안전하게 보관합니다." },
        { title: "출고·배송", description: "입주일에 맞춰 새집으로 옮기고 배치까지 마칩니다." },
      ],
    },
    { type: "pricing", no: "03", title: "이용 요금", items: storagePricing },
    {
      type: "merits",
      no: "04",
      title: "서비스 특징",
      items: [
        { title: "보관과 이사를 한 번에", description: "보관 업체와 이사 업체를 따로 알아보실 필요가 없습니다." },
        { title: "짐 목록 관리", description: "입고할 때 짐 목록을 만들어 두어, 보관 중에도 무엇을 맡기셨는지 확인하실 수 있습니다." },
        { title: "습기와 먼지 관리", description: "보관 중 습기와 먼지로부터 짐을 지키도록 포장합니다." },
        { title: "기간 조정", description: "입주일이 바뀌셔도 보관 기간을 늘리거나 줄이실 수 있습니다." },
        { title: "부분 출고", description: "급히 필요한 짐은 일부만 먼저 꺼내 받으실 수 있습니다." },
        { title: "입주일 배송", description: "입주 날 새집으로 바로 옮겨 배치까지 마칩니다." },
      ],
    },
  ],
};
