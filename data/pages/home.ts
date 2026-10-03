import { homePricing } from "@/data/pricing/home";
import { customerCareSection } from "./shared";
import type { SubPageData } from "./types";

// TODO(INFO-02): 문구는 회사 기준으로 확인한다.
export const homePage: SubPageData = {
  slug: "home",
  title: "가정이사",
  headline: "짐 걱정 없이 새집으로",
  intro: ["아파트·빌라·주택 가정이사를 포장부터 정리까지 맡아 드립니다.", "짐을 쌀 걱정 없이, 새집에서 바로 생활을 시작하세요."],
  quoteType: "가정이사",
  sections: [
    customerCareSection,
    {
      type: "steps",
      no: "02",
      title: "이사서비스 작업 과정",
      items: [
        { title: "방문 견적", description: "담당 팀장이 방문해 짐의 양과 동선을 확인합니다." },
        { title: "포장", description: "가구는 보호재로, 주방 살림과 옷은 전용 박스로 포장합니다." },
        { title: "운반", description: "사다리차와 엘리베이터 보양으로 안전하게 옮깁니다." },
        { title: "배치·정리", description: "가구 배치와 살림 정리, 바닥 청소까지 마칩니다." },
      ],
    },
    { type: "pricing", no: "03", title: "이용 요금", items: homePricing },
    {
      type: "merits",
      no: "04",
      title: "서비스 특징",
      items: [
        { title: "확정 견적", description: "방문 견적 때 정한 금액 그대로 진행하고 당일 추가 요금을 받지 않습니다." },
        { title: "한 팀이 끝까지", description: "견적을 본 팀장이 이사 당일까지 같은 내용으로 책임집니다." },
        { title: "주방 살림 전담", description: "그릇과 식기는 전담 인원이 따로 포장하고 정리합니다." },
        { title: "가전 분리·설치", description: "세탁기와 TV 같은 가전의 분리와 설치를 함께 진행합니다." },
        { title: "새집 보양", description: "엘리베이터와 현관, 바닥에 보양재를 깔아 새집을 지킵니다." },
        { title: "마무리 확인", description: "고객님과 함께 짐 상태와 배치를 확인한 뒤 작업을 마칩니다." },
      ],
    },
  ],
};
