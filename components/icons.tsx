import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...props}>
      <path d="M5 4h3.5l1.5 4-2.2 1.4a11 11 0 0 0 5.8 5.8L15 13l4 1.5V18a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} strokeWidth={1.8} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} strokeWidth={1.8} {...props}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...props}>
      <path d="M12 4c4.97 0 9 3.13 9 7s-4.03 7-9 7c-.9 0-1.77-.1-2.6-.3L5 20l1.1-3.6C4.18 15.13 3 13.18 3 11c0-3.87 4.03-7 9-7z" />
    </svg>
  );
}

// 카카오톡 상담용 노란 말풍선 (카카오 공식 로고가 아닌 일반 아이콘)
export function KakaoBubbleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <rect width="64" height="64" rx="18" fill="#FEE500" />
      <path
        d="M32 16c-9.94 0-18 6.27-18 14 0 4.98 3.35 9.35 8.4 11.83l-1.7 6.27c-.15.55.47.99.95.67l7.4-4.9c.97.09 1.95.13 2.95.13 9.94 0 18-6.27 18-14s-8.06-14-18-14z"
        fill="#191919"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} strokeWidth={2} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} strokeWidth={1.8} {...props}>
      <path d="M4 11l8-7 8 7M6 9.5V20h12V9.5" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
    </svg>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} strokeWidth={1.8} {...props}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

/* 서브페이지 카드 아이콘: 굵은 검정 외곽선 + 파랑 포인트 */
const bold = { fill: "none", stroke: "var(--color-ink)", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function EstimateIllustration(props: IconProps) {
  return (
    <svg viewBox="0 0 110 110" aria-hidden="true" {...props}>
      <rect x="24" y="14" width="56" height="76" rx="6" {...bold} />
      <path d="M36 34h32M36 46h32M36 58h20" {...bold} />
      <circle cx="78" cy="78" r="16" fill="var(--color-primary)" />
      <path d="M71 78l5 5 9-10" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function OnlineIllustration(props: IconProps) {
  return (
    <svg viewBox="0 0 110 110" aria-hidden="true" {...props}>
      <rect x="22" y="16" width="44" height="80" rx="8" {...bold} />
      <path d="M38 86h12" {...bold} />
      <path d="M58 30h34a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H74l-10 9v-9h-6z" fill="var(--color-primary)" />
      <path d="M68 42h20M68 50h12" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} strokeWidth={1.8} {...props}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} strokeWidth={1.8} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

// 임시 로고: 상자 안으로 들어가는 화살표. TODO(UI-02): 실제 로고로 교체
export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="8" fill="var(--color-ink)" />
      <path d="M9 16h11M16 11l5 5-5 5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 9v14" stroke="var(--color-primary)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/* 서비스 아이콘 */
export const serviceIcons: Record<string, (props: IconProps) => React.JSX.Element> = {
  home: (props) => (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...line} {...props}>
      <path d="M4 15L16 5l12 10" />
      <path d="M7 13v14h18V13" />
      <path d="M13 27v-7h6v7" />
    </svg>
  ),
  small: (props) => (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...line} {...props}>
      <rect x="6" y="9" width="20" height="16" rx="2" />
      <path d="M6 15h20M16 9v6" />
    </svg>
  ),
  office: (props) => (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...line} {...props}>
      <rect x="7" y="4" width="18" height="24" rx="1.5" />
      <path d="M12 9h2M18 9h2M12 14h2M18 14h2M12 19h2M18 19h2M14 28v-4h4v4" />
    </svg>
  ),
  truck: (props) => (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...line} {...props}>
      <path d="M3 22V9h16v13M19 13h6l4 5v4H3" />
      <circle cx="9" cy="23.5" r="2.5" />
      <circle cx="23" cy="23.5" r="2.5" />
    </svg>
  ),
  storage: (props) => (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...line} {...props}>
      <path d="M4 12L16 6l12 6v15H4z" />
      <path d="M9 27V16h14v11M9 20h14M9 24h14" />
    </svg>
  ),
};
