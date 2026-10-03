// 업체 소개 영상 아래 신뢰 지표.
// TODO(ENV-12): 실제 숫자를 받으면 value에 넣는다. null이면 "OO"로 표시하고 카운트업하지 않는다.
// 확인되지 않은 숫자를 지어내 넣지 않는다(표시광고법).
export type Stat = { label: string; value: number | null; suffix: string };

export const stats: Stat[] = [
  { label: "누적 이사", value: null, suffix: "건" },
  { label: "고객 만족도", value: null, suffix: "%" },
  { label: "평균 견적 응답", value: null, suffix: "분" },
  { label: "보유 차량", value: null, suffix: "대" },
];
