import { officePricing } from "@/data/pricing/office";
import { customerCareSection } from "./shared";
import type { SubPageData } from "./types";

// TODO(INFO-02): 문구는 회사 기준으로 확인한다.
export const officePage: SubPageData = {
  slug: "office",
  title: "사무실 이사",
  headline: "월요일 아침, 바로 일할 수 있게",
  intro: ["사무실·상가·기업 이전을 업무 일정에 맞춰 진행합니다.", "이전 다음 날 아침, 바로 일할 수 있게 자리까지 배치해 드립니다."],
  quoteType: "사무실이사",
  sections: [
    customerCareSection,
    {
      type: "steps",
      no: "02",
      title: "이사서비스 작업 과정",
      items: [
        { title: "사전 답사", description: "현재 사무실과 새 사무실을 둘러보고 이전 일정을 나눕니다." },
        { title: "번호 포장", description: "부서와 자리별로 번호를 붙여 짐이 섞이지 않게 포장합니다." },
        { title: "이전", description: "엘리베이터 예약 시간에 맞춰 집기와 장비를 옮깁니다." },
        { title: "자리 배치", description: "도면에 맞춰 책상과 장비를 배치하고 확인을 받습니다." },
      ],
    },
    { type: "pricing", no: "03", title: "이용 요금", items: officePricing },
    {
      type: "merits",
      no: "04",
      title: "서비스 특징",
      items: [
        { title: "업무 공백 최소화", description: "주말과 야간 일정으로 평일 업무에 지장이 없게 이전합니다." },
        { title: "번호 관리 포장", description: "자리별 번호표로 새 사무실에서도 짐을 바로 찾을 수 있습니다." },
        { title: "전산 장비 별도 포장", description: "컴퓨터와 서버 장비는 충격 방지 포장으로 따로 옮깁니다." },
        { title: "보안 문서 관리", description: "중요 서류는 잠금 박스에 담아 이동 중에도 열리지 않게 합니다." },
        { title: "건물 규정 확인", description: "엘리베이터 예약과 반입 시간 같은 건물 규정을 미리 확인합니다." },
        { title: "배치 후 점검", description: "자리 배치를 담당자와 함께 확인한 뒤 작업을 마칩니다." },
      ],
    },
  ],
};
