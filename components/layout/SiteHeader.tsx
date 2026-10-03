import { PhoneIcon } from "@/components/icons";
import { QuoteButton } from "@/components/quote/wizard/QuoteWizard";
import { buttonClass } from "@/components/ui/Button";
import { site } from "@/config/site";
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
          <a href={site.phoneHref} className="flex items-center gap-2 font-semibold tabular-nums text-ink">
            <PhoneIcon className="size-[18px] text-primary" />
            {site.phone}
          </a>
          <QuoteButton className={buttonClass({ variant: "primary", size: "sm" })}>무료 견적</QuoteButton>
        </div>
        <MobileDrawer />
      </div>
    </header>
  );
}
