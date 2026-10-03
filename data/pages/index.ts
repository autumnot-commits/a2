import { homePage } from "./home";
import { officePage } from "./office";
import { smallPage } from "./small";
import { storagePage } from "./storage";
import type { SubPageData } from "./types";

// /moving/[slug] 페이지 목록. 새 페이지는 데이터 파일을 만들고 여기에 추가한다.
export const movingPages: Record<string, SubPageData> = {
  home: homePage,
  office: officePage,
  small: smallPage,
  storage: storagePage,
};
