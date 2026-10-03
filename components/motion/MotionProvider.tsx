"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// 사용자가 OS에서 '동작 줄이기'를 켜면 framer-motion 애니메이션을 끈다.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
