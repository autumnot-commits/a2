import { ConsultButton } from "@/components/consult/ConsultModal";
import { ChatIcon } from "@/components/icons";
import { QuoteButton } from "@/components/quote/wizard/QuoteWizard";
import { buttonClass } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MegaNav } from "./MegaNav";
import { MobileDrawer } from "./MobileDrawer";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="container-site flex h-16 items-center gap-8 lg:h-[72px]">
        <Logo />
        <MegaNav />
        <div className="ml-auto hidden shrink-0 items-center gap-5 lg:flex">
          <ConsultButton className="flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-primary">
            <ChatIcon className="size-[18px] text-primary" />
            무료 상담
          </ConsultButton>
          <QuoteButton className={buttonClass({ variant: "primary", size: "sm" })}>무료 견적</QuoteButton>
        </div>
        <MobileDrawer />
      </div>
    </header>
  );
}
