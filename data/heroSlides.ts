// 메인 히어로 슬라이드. 이미지만 보여준다. 순서대로 넘어간다.
// 이미지는 자르거나 늘리지 않고 원래 비율·크기 그대로 가운데에 보여주고, 양옆은 같은 이미지를 흐리게 깔아 채운다.
// width·height에는 이미지 파일의 실제 픽셀 크기를 적는다.
// image가 없으면 bgColor 단색 배경에 title·text를 가운데에 보여 준다(준비 중 안내 등).
export type HeroSlide = {
  id: string;
  image?: string;
  width?: number;
  height?: number;
  // 이미지 설명(대체 텍스트). 배너 안의 문구를 그대로 적는다.
  alt: string;
  bgColor: string;
  // 이미지가 없을 때 보여 줄 문구
  title?: string;
  text?: string;
  // 누르면 이동할 페이지 (선택)
  href?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    alt: "메인 배너 준비 중",
    bgColor: "#1d4ed8",
    title: "준비 중입니다",
    text: "새로운 소식을 곧 전해 드릴게요.",
  },
];
