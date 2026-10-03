import type { Metadata } from "next";
import { AdminNav } from "@/components/layout/AdminNav";
import { Logo } from "@/components/layout/Logo";

export const metadata: Metadata = {
  title: { default: "관리자", template: "%s | 관리자" },
  robots: { index: false, follow: false },
};

// TODO(AUTH-08): 7단계에서 requireAdmin()으로 접근을 막는다. 지금은 레이아웃 셸만 있다.
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-full flex-1 flex-col lg:flex-row">
      <aside className="border-b border-line bg-surface lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center px-5">
          <Logo href="/admin" />
        </div>
        <AdminNav />
      </aside>
      <div className="flex flex-1 flex-col">
        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
