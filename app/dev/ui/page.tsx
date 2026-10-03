import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Badge, Card } from "@/components/ui/Card";
import { Checkbox, RadioGroup } from "@/components/ui/Choice";
import { Field } from "@/components/ui/Field";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { OverlayDemo } from "./OverlayDemo";

export const metadata: Metadata = {
  title: "UI 미리보기",
  robots: { index: false, follow: false },
};

// 정적 생성되면 notFound()가 200 상태로 굳어 버리므로 요청 시점에 렌더링한다.
export const dynamic = "force-dynamic";

// 개발 중 공통 컴포넌트를 눈으로 확인하는 페이지. 운영 빌드에서는 404를 반환한다.
export default function UiPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-12 sm:px-6">
      <h1 className="font-bold tracking-tight text-4xl">UI 미리보기</h1>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">버튼</h2>
        <div className="flex flex-wrap gap-2">
          <ButtonLink href="/quote" variant="accent">견적 신청</ButtonLink>
          <Button>저장</Button>
          <Button variant="outline">취소</Button>
          <Button variant="ghost">더 보기</Button>
          <Button variant="danger">삭제</Button>
          <Button disabled>비활성</Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">작게</Button>
          <Button size="md">보통</Button>
          <Button size="lg">크게</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">입력</h2>
        <Card className="flex flex-col gap-5">
          <Field id="name" label="이름" required>
            {(control) => <Input {...control} autoComplete="name" />}
          </Field>
          <Field id="phone" label="연락처" hint="숫자만 입력해도 됩니다." error="휴대폰 번호 형식이 아닙니다." required>
            {(control) => <Input {...control} type="tel" inputMode="tel" defaultValue="010-12" />}
          </Field>
          <Field id="size" label="짐의 규모">
            {(control) => (
              <Select {...control} defaultValue="">
                <option value="" disabled>선택해 주세요</option>
                <option>원룸 (1톤 이하)</option>
                <option>투룸 (2.5톤)</option>
                <option>쓰리룸 이상 (5톤 이상)</option>
              </Select>
            )}
          </Field>
          <Field id="memo" label="추가 요청 사항">
            {(control) => <Textarea {...control} placeholder="피아노, 대형 냉장고처럼 미리 알려 주실 짐이 있다면 적어 주세요." />}
          </Field>
          <RadioGroup
            name="moveType"
            legend="이사 유형"
            required
            defaultValue="full"
            options={[
              { value: "full", label: "포장이사", description: "포장부터 정리까지 모두 맡김" },
              { value: "half", label: "반포장이사", description: "큰 짐 포장과 운반만 맡김" },
              { value: "basic", label: "일반이사", description: "운반만 맡김" },
              { value: "office", label: "사무실 이사" },
            ]}
          />
          <Checkbox
            id="agree"
            label="개인정보 수집·이용에 동의합니다 (필수)"
            description="견적 안내를 위해 이름, 연락처, 주소를 수집합니다."
            error="동의해야 신청할 수 있습니다."
          />
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">배지 (신청 상태)</h2>
        <div className="flex flex-wrap gap-2">
          <Badge tone="info">신규</Badge>
          <Badge tone="warning">진행 중</Badge>
          <Badge tone="success">완료</Badge>
          <Badge tone="danger">취소</Badge>
          <Badge>보관</Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">대화상자와 알림</h2>
        <OverlayDemo />
      </section>
    </div>
  );
}
