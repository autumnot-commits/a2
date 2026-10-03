// 자주하는 질문 (FAQ-10).
// featured: true인 질문만 메인 페이지에 표시한다(최대 5개). 전체 목록은 /support/faq 페이지에서 보여 준다.
// TODO(INFO-02): 답변은 회사 정책(견적·파손·보관 기준 등)을 확인해 확정한다.
export type Faq = { question: string; answer: string; featured?: boolean };

export const faqs: Faq[] = [
  {
    question: "견적 비용이 있나요?",
    answer: "없습니다. 방문 견적과 전화·카카오톡 상담 모두 무료예요.",
    featured: true,
  },
  {
    question: "언제쯤 예약해야 하나요?",
    answer: "주말, 월말, 손 없는 날은 일찍 마감돼요. 이사 날짜가 정해지시면 바로 신청해 주세요.",
    featured: true,
  },
  {
    question: "견적 금액이 이사 당일에 바뀌기도 하나요?",
    answer: "방문 견적 때 확인한 짐과 조건이 같다면 정한 금액 그대로 진행해요. 짐이 크게 늘어나는 경우에는 작업 전에 미리 말씀드려요.",
    featured: true,
  },
  {
    question: "사다리차가 필요한지 어떻게 알 수 있나요?",
    answer: "층수, 엘리베이터 크기, 큰 가구 여부를 확인해서 견적 때 함께 안내해 드려요.",
    featured: true,
  },
  {
    question: "견적을 신청하면 언제 연락이 오나요?",
    answer: "상담 시간 안에 남겨 주신 연락처로 담당자가 연락드려요.",
    featured: true,
  },
  {
    question: "이사 당일 제가 따로 해야 할 일이 있나요?",
    answer: "포장이사는 따로 준비하실 것이 거의 없어요. 귀중품과 중요 서류만 미리 챙겨 두시면 돼요.",
  },
  {
    question: "귀중품은 어떻게 하나요?",
    answer: "현금, 귀금속, 중요 서류 같은 귀중품은 고객님께서 직접 보관해 주시길 부탁드려요.",
  },
  {
    question: "에어컨이나 가전 분리·설치도 해 주시나요?",
    answer: "세탁기, TV 같은 일반 가전은 이사 중에 분리·설치해 드려요. 에어컨처럼 전문 설치가 필요한 제품은 상담 때 따로 안내해 드려요.",
  },
  {
    question: "이사 중에 짐이 파손되면 어떻게 하나요?",
    answer: "작업 전에 짐 상태를 함께 확인하고, 작업 중 파손이 생기면 정해진 기준에 따라 처리해 드려요.",
  },
  {
    question: "보관이사는 얼마나 맡길 수 있나요?",
    answer: "며칠부터 몇 달까지 단기·장기 모두 가능해요. 입주일이 바뀌셔도 보관 기간을 조정하실 수 있어요.",
  },
];

export const featuredFaqs = faqs.filter((faq) => faq.featured).slice(0, 5);
