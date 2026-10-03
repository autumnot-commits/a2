// 글자를 클립보드에 복사한다. 성공하면 true.
// navigator.clipboard는 https·localhost에서만 동작하므로, 그 밖(예: http://192.168.x.x로 휴대폰 접속)에서는
// 숨긴 입력칸을 선택해 복사하는 예전 방식으로 한 번 더 시도한다.
export async function copyText(text: string, from?: Element | null): Promise<boolean> {
  if (window.isSecureContext && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // 아래 예비 방식으로 넘어간다.
    }
  }

  // 모달(<dialog>) 안에서 누른 경우 바깥은 선택할 수 없으므로 모달 안에 임시 입력칸을 만든다.
  const container = from?.closest("dialog") ?? document.body;
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  container.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  textarea.remove();
  return ok;
}
