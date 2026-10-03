// 사이트 전역 설정. 브랜드명, 전화번호, 운영시간, 메뉴는 이 파일 한 곳에서만 바꾼다.
// TODO(ENV-12): 대괄호 값은 실제 회사 정보로 교체해야 한다.
export const site = {
  name: "KGB 이사서비스 진주점",
  description: "가정이사, 원룸·소형이사, 사무실이사, 보관이사. 평일·주말 상관없이 365일 무료 방문견적.",
  url: "http://localhost:3000",
  phone: "055-757-8224",
  // tel: 링크용 숫자. 번호를 바꿀 때 함께 바꾼다.
  phoneHref: "tel:0557578224",
  // 카카오톡 채널 채팅 주소. 비어 있으면 상담 창의 카카오톡 버튼이 "준비 중"으로 표시된다.
  // 예: "https://pf.kakao.com/_xxxxx/chat"
  kakaoUrl: "",
  hours: {
    weekday: "09:00 ~ 19:00",
    weekend: "09:00 ~ 18:00",
  },
  company: {
    legalName: "[상호]",
    ceo: "안상원",
    businessNumber: "[사업자등록번호]",
    licenseNumber: "[화물자동차 운송주선사업 허가번호]",
    address: "[사업장 주소]",
    email: "[이메일]",
    privacyOfficer: "박명철",
  },
  // 업체 소개 영상. youtubeId가 있으면 유튜브를, 없고 file이 있으면 직접 파일(<video>)을 쓴다. 둘 다 없으면 "준비 중" 화면.
  // 예: youtubeId: "dQw4w9WgXcQ" 또는 file: "/videos/intro.mp4", poster: "/videos/intro-poster.jpg"
  video: {
    youtubeId: "CQmhd3oMTUM", // https://youtu.be/CQmhd3oMTUM
    file: "",
    poster: "",
  },
} as const;

// 기능 켜기/끄기
// PHONE_VERIFY_ENABLED: 견적 신청 마지막 단계의 휴대폰 인증. 문자 발송 서비스를 연결한 뒤 켠다.
export const PHONE_VERIFY_ENABLED = false;

export type NavItem = { href: string; label: string };

export const footerLinks: NavItem[] = [
  { href: "/terms", label: "이용약관" },
  { href: "/privacy", label: "개인정보처리방침" },
];

export const adminNav: NavItem[] = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/quotes", label: "견적 신청" },
];
