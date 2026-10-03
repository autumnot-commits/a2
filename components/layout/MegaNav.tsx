"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { findMenuGroup, menu } from "@/config/menu";
import { cn } from "@/lib/cn";

const ITEM_HEIGHT = 26;
const PANEL_PADDING = 48;
const panelHeight = Math.max(...menu.map((group) => group.children.length)) * ITEM_HEIGHT + PANEL_PADDING;

// 대메뉴 아무 곳에나 마우스를 올리면 모든 소메뉴가 한 번에 펼쳐지는 전체폭 메가메뉴. PC 전용.
// 소메뉴 목록은 각 대메뉴 바로 아래에 붙어 있어서 위치가 항상 맞는다.
export function MegaNav() {
  const pathname = usePathname();
  const current = findMenuGroup(pathname);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // 다른 페이지로 이동하면 닫는다.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setHovered(null);
  }

  return (
    <nav
      aria-label="주요 메뉴"
      className="hidden h-full flex-1 lg:block"
      onMouseLeave={() => {
        setOpen(false);
        setHovered(null);
      }}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <ul className="flex h-full justify-center">
        {menu.map((group) => {
          const underline = hovered === group.label || (!hovered && current === group);
          return (
            <li key={group.label} className="relative h-full" onMouseEnter={() => {
                setOpen(true);
                setHovered(group.label);
              }}>
              <Link
                href={group.href}
                aria-current={current === group ? "page" : undefined}
                className="flex h-full items-center px-4 text-[15px] font-medium text-ink xl:px-6"
              >
                <span
                  className={cn(
                    "relative py-1 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-primary after:transition-transform after:duration-200",
                    underline ? "after:scale-x-100" : "after:scale-x-0",
                  )}
                >
                  {group.label}
                </span>
              </Link>
              {group.children.length > 0 && (
                <ul
                  className={cn(
                    "absolute left-1/2 top-full z-50 min-w-max -translate-x-1/2 pt-6 text-center transition-opacity duration-200",
                    open ? "visible opacity-100" : "invisible opacity-0",
                  )}
                >
                  {group.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block text-sm text-[#444] hover:text-primary"
                        style={{ lineHeight: `${ITEM_HEIGHT}px` }}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {/* 전체폭 흰 패널. 소메뉴 목록 뒤에 깔린다. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-full z-40 overflow-hidden border-t border-line bg-white shadow-[0_12px_24px_-12px_rgba(17,24,39,0.18)] transition-[height,opacity] duration-200"
        style={{ height: open ? panelHeight : 0, opacity: open ? 1 : 0, borderTopWidth: open ? 1 : 0 }}
      />
    </nav>
  );
}
