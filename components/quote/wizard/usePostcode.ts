"use client";

import { useCallback, useState } from "react";

// 카카오(다음) 우편번호 서비스. 무료이며 API 키가 필요 없다. 처음 쓸 때만 스크립트를 불러온다.
const SCRIPT_SRC = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

type PostcodeResult = { roadAddress: string; jibunAddress: string; sido: string; sigungu: string };
type PostcodeConstructor = new (options: { oncomplete: (data: PostcodeResult) => void }) => { open: () => void };

declare global {
  interface Window {
    daum?: { Postcode: PostcodeConstructor };
  }
}

export type PickedAddress = { address: string; sido: string; sigungu: string };

let loading: Promise<void> | null = null;

function loadScript() {
  if (window.daum?.Postcode) return Promise.resolve();
  loading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null;
      reject(new Error("우편번호 서비스를 불러오지 못했습니다."));
    };
    document.head.appendChild(script);
  });
  return loading;
}

export function usePostcode() {
  const [failed, setFailed] = useState(false);

  const open = useCallback(async (onPick: (picked: PickedAddress) => void) => {
    try {
      await loadScript();
      new window.daum!.Postcode({
        oncomplete: (data) =>
          onPick({ address: data.roadAddress || data.jibunAddress, sido: data.sido, sigungu: data.sigungu }),
      }).open();
    } catch {
      // 불러오지 못하면 주소를 직접 입력할 수 있게 한다.
      setFailed(true);
    }
  }, []);

  return { open, failed };
}
