import { z } from "zod";

export const moveTypes = [
  { value: "가정이사", description: "아파트·빌라·주택 살림 전체" },
  { value: "원룸·소형이사", description: "원룸·투룸·오피스텔 1~2인 가구" },
  { value: "용달이사", description: "짐 몇 개만 빠르게 옮길 때" },
  { value: "보관이사", description: "입주일까지 짐을 맡기셔야 할 때" },
  { value: "사무실이사", description: "사무실·상가·매장 이전" },
] as const;

export const floors = ["반지하", ...Array.from({ length: 19 }, (_, i) => `${i + 1}층`), "20층 이상"];
export const sizes = ["10평 미만", "10~20평", "20~30평", "30~40평", "40평 이상"];
export const elevatorOptions = ["있음", "없음"] as const;

export type WizardData = {
  moveType: string;
  date: string;
  from: { address: string; sido: string; sigungu: string; detail: string; floor: string; elevator: string; size: string };
  to: { sido: string; sigungu: string; address: string; elevator: string };
  name: string;
  phone: string;
  memo: string;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
};

export const emptyData: WizardData = {
  moveType: "",
  date: "",
  from: { address: "", sido: "", sigungu: "", detail: "", floor: "", elevator: "", size: "" },
  to: { sido: "", sigungu: "", address: "", elevator: "" },
  name: "",
  phone: "",
  memo: "",
  agreePrivacy: false,
  agreeMarketing: false,
};

export function todayString() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

// 단계별 검사. 오류 경로(path)는 화면에서 어느 칸을 흔들지 정하는 데 쓴다.
const stepSchemas = [
  z.object({ moveType: z.string().min(1, "이사 종류를 선택해 주세요.") }),
  z.object({
    date: z
      .string()
      .min(1, "이사 날짜를 선택해 주세요.")
      .refine((value) => value >= todayString(), "오늘 이후 날짜를 선택해 주세요."),
  }),
  z.object({
    from: z.object({
      address: z.string().min(1, "출발지 주소를 검색해 주세요."),
      floor: z.string().min(1, "층수를 선택해 주세요."),
      elevator: z.string().min(1, "엘리베이터 유무를 선택해 주세요."),
      size: z.string().min(1, "평수를 선택해 주세요."),
    }),
  }),
  z.object({
    to: z.object({
      sido: z.string().min(1, "도착지 시/도를 선택해 주세요."),
      sigungu: z.string().min(1, "도착지 시/군/구를 선택해 주세요."),
      elevator: z.string().min(1, "엘리베이터 유무를 선택해 주세요."),
    }),
  }),
  z.object({
    name: z.string().trim().min(2, "이름을 2자 이상 입력해 주세요."),
    phone: z.string().regex(/^01[016789]-\d{3,4}-\d{4}$/, "휴대폰 번호를 정확히 입력해 주세요."),
    agreePrivacy: z.literal(true, { error: "개인정보 수집·이용에 동의해 주세요." }),
  }),
];

export type FieldErrors = Record<string, string>;

export function validateStep(step: number, data: WizardData): FieldErrors {
  const result = stepSchemas[step].safeParse(data);
  if (result.success) return {};
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path.join(".");
    errors[key] ??= issue.message;
  }
  return errors;
}

// 010-1234-5678 형태로 하이픈을 자동으로 넣는다.
export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  const middle = digits.length === 11 ? 4 : 3;
  return `${digits.slice(0, 3)}-${digits.slice(3, 3 + middle)}-${digits.slice(3 + middle)}`;
}

// "서울 강남구"처럼 티켓에 보여 줄 짧은 지역명
export function shortPlace(sido: string, sigungu: string) {
  return [sido, sigungu.split(" ")[0]].filter(Boolean).join(" ");
}

export function shortDate(date: string) {
  if (!date) return "";
  const [, m, d] = date.split("-");
  return `${Number(m)}/${Number(d)}`;
}

// 입력 중인 내용 임시 저장. 이름·연락처·요청사항 같은 개인정보는 저장하지 않는다.
const DRAFT_KEY = "quote-wizard-draft";

export type Draft = { step: number; data: WizardData };

export function saveDraft(step: number, data: WizardData) {
  const safe: WizardData = { ...data, name: "", phone: "", memo: "", agreePrivacy: false, agreeMarketing: false };
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ step: Math.min(step, 4), data: safe }));
  } catch {
    // 저장 공간이 없거나 막혀 있으면 임시 저장을 건너뛴다.
  }
}

export function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw) as Draft;
    return { step: draft.step, data: { ...emptyData, ...draft.data, from: { ...emptyData.from, ...draft.data.from }, to: { ...emptyData.to, ...draft.data.to } } };
  } catch {
    return null;
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // 무시
  }
}

export function hasProgress(data: WizardData) {
  return Boolean(data.moveType || data.date || data.from.address || data.to.sido || data.name || data.phone);
}
