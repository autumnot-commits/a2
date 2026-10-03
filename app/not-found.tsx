import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-start justify-center gap-6 px-6 py-24 sm:mx-auto sm:w-full sm:max-w-xl">
      <h1 className="font-bold tracking-tight text-4xl text-ink">페이지를 찾을 수 없습니다</h1>
      <p className="text-ink-soft">
        주소가 바뀌었거나 아직 준비 중인 페이지입니다. 첫 화면에서 원하는 메뉴를 다시 찾아 주세요.
      </p>
      <ButtonLink href="/">첫 화면으로</ButtonLink>
    </main>
  );
}
