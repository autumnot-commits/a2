import type { PageSection } from "./types";

// 모든 이사 서비스 페이지에 공통으로 들어가는 '스마트 고객관리 서비스' 섹션.
export const customerCareSection: PageSection = {
  type: "cards2",
  no: "01",
  title: "스마트 고객관리 서비스",
  items: [
    {
      icon: "estimate",
      title: "1:1 무료 방문견적 서비스",
      description: "담당 팀장이 직접 방문해 짐의 양과 동선을 확인하고, 추가 요금 없는 확정 견적을 드립니다.",
    },
    {
      icon: "online",
      title: "온라인 견적서",
      description: "견적 내용과 작업 범위를 문자로 보내 드려, 언제든 휴대폰에서 다시 확인할 수 있습니다.",
    },
  ],
};
