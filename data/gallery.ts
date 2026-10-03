// 이사 서비스 아래 현장 사진 갤러리. 첫 번째 사진이 크게 보이고, 나머지 4장은 작게 보인다.
// 사진은 public/gallery/ 폴더에 넣고 src에 "/gallery/파일이름.jpg"처럼 적는다.
// width·height에는 사진의 실제 픽셀 크기를 적는다(크게 보기에서 원래 비율로 보여 줄 때 쓴다).
// src가 없으면 "사진 준비 중" 칸으로 보인다.
export type GalleryItem = {
  src?: string;
  width?: number;
  height?: number;
  alt: string;
  caption: string;
};

export const gallery: GalleryItem[] = [
  { src: "/slides/asd12232.png", width: 681, height: 384, alt: "KGB 이사서비스 진주점 이사 트럭", caption: "진주점 이사 트럭" },
  { alt: "가구 포장 작업", caption: "꼼꼼한 포장" },
  { alt: "가구 운반 작업", caption: "안전한 운반" },
  { alt: "사다리차 작업", caption: "사다리차 작업" },
  { alt: "새집 정리 마무리", caption: "깔끔한 마무리" },
];
