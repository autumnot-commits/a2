import { isSonEomneunNal } from "@/lib/lunar";

// 달력에 표시하는 '예상' 혼잡도. 실제 예약 데이터가 아니라 규칙으로 계산한다.
// TODO(QUOTE): DB가 연결되면 실제 예약 건수로 바꾼다.
export type Congestion = "low" | "mid" | "high";

export const congestionLabel: Record<Congestion, string> = {
  low: "여유",
  mid: "보통",
  high: "많음",
};

function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getCongestion(date: Date): Congestion {
  const weekday = date.getDay();
  const day = date.getDate();
  const monthEnd = day > daysInMonth(date) - 3;
  // 손 없는 날, 금·토요일, 월말 3일은 예약이 몰린다.
  if (isSonEomneunNal(date) || weekday === 5 || weekday === 6 || monthEnd) return "high";
  if (weekday === 0 || day >= 25) return "mid";
  return "low";
}

export { isSonEomneunNal };
