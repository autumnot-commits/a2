"use client";

import { Button, ButtonLink } from "@/components/ui/Button";

export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main className="flex flex-1 flex-col items-start justify-center gap-6 px-6 py-24 sm:mx-auto sm:w-full sm:max-w-xl">
      <h1 className="font-bold tracking-tight text-4xl text-ink">화면을 불러오지 못했습니다</h1>
      <p className="text-ink-soft">
        일시적인 문제일 수 있습니다. 다시 시도하셔도 같은 화면이 보이면 전화로 문의해 주세요.
      </p>
      <div className="flex gap-2">
        <Button onClick={() => retry()}>다시 시도</Button>
        <ButtonLink href="/" variant="outline">
          첫 화면으로
        </ButtonLink>
      </div>
    </main>
  );
}
