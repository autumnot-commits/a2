import Link from "next/link";
import { LogoMark } from "@/components/icons";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

// TODO(UI-02): 실제 로고 파일을 받으면 이 임시 로고를 교체한다.
export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2.5 text-ink", className)}>
      <LogoMark className="size-8 shrink-0" />
      <span className="text-lg font-bold leading-none tracking-tight">{site.name}</span>
    </Link>
  );
}
