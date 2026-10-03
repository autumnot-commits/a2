// 전체 메뉴 구조. 대메뉴 → 소메뉴. 메가메뉴, 모바일 드로어, 푸터가 이 파일을 쓴다.
export type SubMenu = { href: string; label: string };
export type MenuGroup = {
  label: string;
  href: string;
  // 같은 match 접두사로 시작하는 주소에 있으면 이 대메뉴를 현재 메뉴로 표시한다.
  match: string;
  // true면 주소가 match와 정확히 같을 때만 현재 메뉴로 표시한다. ("/"처럼 모든 주소의 앞부분이 되는 경우)
  exact?: boolean;
  children: SubMenu[];
};

export const menu: MenuGroup[] = [
  { label: "홈", href: "/", match: "/", exact: true, children: [] },
  {
    label: "진주점 소개",
    href: "/about",
    match: "/about",
    children: [{ href: "/about", label: "진주점 소개" }],
  },
  {
    label: "가정이사",
    href: "/moving/home",
    match: "/moving/home",
    children: [{ href: "/moving/home", label: "가정이사" }],
  },
  {
    label: "사무실 이사",
    href: "/moving/office",
    match: "/moving/office",
    children: [{ href: "/moving/office", label: "사무실 이사" }],
  },
  {
    label: "원룸/소형 이사",
    href: "/moving/small",
    match: "/moving/small",
    children: [{ href: "/moving/small", label: "원룸/소형 이사" }],
  },
  {
    label: "보관 이사",
    href: "/moving/storage",
    match: "/moving/storage",
    children: [{ href: "/moving/storage", label: "보관 이사" }],
  },
  {
    label: "고객센터",
    href: "/support/quote",
    match: "/support",
    children: [
      { href: "/support/quote", label: "견적신청" },
      { href: "/support/faq", label: "자주하는 질문" },
    ],
  },
];

export function findMenuGroup(pathname: string) {
  return menu.find((group) => (group.exact ? pathname === group.match : pathname.startsWith(group.match)));
}
