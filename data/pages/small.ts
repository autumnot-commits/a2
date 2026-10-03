import { smallPricing } from "@/data/pricing/small";
import { customerCareSection } from "./shared";
import type { SubPageData } from "./types";

// TODO(INFO-02): 문구는 회사 기준으로 확인한다.
export const smallPage: SubPageData = {
  slug: "small",
  title: "원룸/소형 이사",
  headline: "가볍게, 꼭 필요한 만큼만",
  intro: ["짐이 적은 1~2인 가구를 위한 소형 차량 이사입니다.", "필요한 만큼만 고르고, 필요한 만큼만 비용을 내세요."],
  quoteType: "원룸·소형이사",
  sections: [
    customerCareSection,
    {
      type: "steps",
      no: "02",
      title: "이사서비스 작업 과정",
      items: [
        { title: "견적 상담", description: "짐의 양과 층수, 엘리베이터 여부를 확인해 차량과 인원을 정합니다." },
        { title: "포장·상차", description: "선택하신 범위만큼 포장하고 짐을 차량에 안전하게 싣습니다." },
        { title: "운반", description: "약속한 시간에 맞춰 새집까지 바로 이동합니다." },
        { title: "하차·배치", description: "원하시는 위치에 가구를 놓고 바닥 정리까지 마칩니다." },
      ],
    },
    { type: "pricing", no: "03", title: "이용 요금", items: smallPricing },
    {
      type: "merits",
      no: "04",
      title: "서비스 특징",
      items: [
        { title: "필요한 만큼만", description: "짐의 양에 맞춰 차량과 인원을 고르니 불필요한 비용이 없습니다." },
        { title: "1:1 담당 매니저", description: "상담부터 이사 당일까지 한 명의 담당자가 일정을 챙깁니다." },
        { title: "꼼꼼한 포장", description: "모서리 보호재와 이불 포장으로 가구와 가전의 흠집을 막습니다." },
        { title: "시간 약속", description: "약속한 시간에 도착하고, 늦어질 때는 미리 연락드립니다." },
        { title: "좁은 길도 문제없이", description: "골목과 언덕길이 많은 원룸 밀집 지역도 1톤 차량으로 들어갑니다." },
        { title: "깔끔한 마무리", description: "포장재 수거와 바닥 정리까지 마친 뒤 작업을 끝냅니다." },
      ],
    },
  ],
};
