"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronRightIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { ConsultButton } from "@/components/consult/ConsultModal";
import { QuoteButton } from "@/components/quote/wizard/QuoteWizard";
import { buttonClass } from "@/components/ui/Button";
import { menu } from "@/config/menu";
import { site } from "@/config/site";

// 1024px 미만에서 쓰는 햄버거 메뉴. 오른쪽에서 드로어가 밀려 나온다.
export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // 다른 페이지로 이동하면 메뉴를 닫는다.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        onClick={() => setOpen(true)}
        className="flex size-10 items-center justify-center rounded-md text-ink hover:bg-ink/5"
      >
        <MenuIcon className="size-6" />
        <span className="sr-only">메뉴 열기</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="전체 메뉴"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(320px,85vw)] flex-col bg-white shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex h-16 items-center justify-between border-b border-line px-5">
                <span className="text-lg font-bold text-ink">{site.name}</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex size-10 items-center justify-center rounded-md text-ink hover:bg-ink/5"
                >
                  <CloseIcon className="size-6" />
                  <span className="sr-only">메뉴 닫기</span>
                </button>
              </div>
              <nav aria-label="주요 메뉴" className="flex-1 overflow-y-auto px-5">
                <ul>
                  {menu.map((group) =>
                    group.children.length > 1 ? (
                      <li key={group.label} className="border-b border-line">
                        <details className="group">
                          <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
                            {group.label}
                            <ChevronRightIcon className="size-4 text-ink-soft transition-transform group-open:rotate-90" />
                          </summary>
                          <ul className="pb-3">
                            {group.children.map((child) => (
                              <li key={child.href}>
                                <Link href={child.href} className="block py-2 pl-3 text-[15px] text-ink-soft hover:text-primary">
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </li>
                    ) : (
                      <li key={group.label}>
                        <Link href={group.href} className="block border-b border-line py-4 text-base font-medium text-ink">
                          {group.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
              <div className="grid gap-2 border-t border-line p-5">
                <ConsultButton onClick={() => setOpen(false)} className={buttonClass({ variant: "outline", size: "lg" })}>
                  무료 상담
                </ConsultButton>
                <QuoteButton onClick={() => setOpen(false)} className={buttonClass({ variant: "primary", size: "lg" })}>
                  무료견적 신청
                </QuoteButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
