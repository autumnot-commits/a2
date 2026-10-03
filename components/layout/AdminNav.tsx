"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { adminNav } from "@/config/site";

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="관리자 메뉴" className="px-3 pb-3 lg:pt-2">
      <ul className="flex gap-1 lg:flex-col">
        {adminNav.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block rounded-[var(--radius-control)] px-3 py-2",
                  active ? "bg-primary-tint font-medium text-primary-deep" : "text-ink-soft hover:bg-ink/5 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
