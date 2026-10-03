import { ConsultButton } from "@/components/consult/ConsultModal";
import { ChatIcon } from "@/components/icons";
import { QuoteButton } from "@/components/quote/wizard/QuoteWizard";

// 화면 오른쪽 아래에 떠 있는 상담·견적 버튼.
export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-30 flex items-center gap-2 sm:bottom-8 sm:right-8">
      <ConsultButton className="flex size-12 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_8px_24px_-8px_rgba(17,24,39,0.25)] hover:border-ink/30">
        <ChatIcon className="size-5" />
        <span className="sr-only">무료 상담</span>
      </ConsultButton>
      <QuoteButton className="flex h-12 items-center rounded-full border border-white/20 bg-ink px-5 text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(17,24,39,0.45)] hover:bg-ink/85">
        무료 견적
      </QuoteButton>
    </div>
  );
}
