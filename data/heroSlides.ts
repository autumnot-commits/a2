// 메인 히어로 슬라이드. 이미지만 보여준다. 순서대로 넘어간다.
// 이미지 권장 크기: 1920 × 380px (모바일에서는 가운데 기준으로 좌우가 잘린다).
// image가 없으면 bgColor 단색으로 자리만 표시한다.
export type HeroSlide = {
  id: string;
  image?: string;
  // 가로로 긴 슬라이더에 맞춰 잘릴 때 남길 위치 (CSS object-position). 기본값 "center"
  position?: string;
  // 이미지 설명(대체 텍스트). 배너 안의 문구를 그대로 적는다.
  alt: string;
  bgColor: string;
  // 누르면 이동할 페이지 (선택)
  href?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/slides/aa.jpg",
    position: "center 50%",
    alt: "이삿짐을 트럭에 싣는 직원들",
    bgColor: "#1d4ed8",
  },
];
