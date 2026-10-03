// 메인 히어로 슬라이드. 이미지만 보여준다. 순서대로 넘어간다.
// 이미지는 자르거나 늘리지 않고 원래 비율·크기 그대로 가운데에 보여주고, 양옆은 같은 이미지를 흐리게 깔아 채운다.
// width·height에는 이미지 파일의 실제 픽셀 크기를 적는다. image가 없으면 bgColor 단색으로 자리만 표시한다.
export type HeroSlide = {
  id: string;
  image?: string;
  width?: number;
  height?: number;
  // 이미지 설명(대체 텍스트). 배너 안의 문구를 그대로 적는다.
  alt: string;
  bgColor: string;
  // 누르면 이동할 페이지 (선택)
  href?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/slides/asd12232.png",
    width: 681,
    height: 384,
    alt: "KGB 이사서비스 진주점 이사 트럭",
    bgColor: "#1d4ed8",
  },
];
