import { FloatingActions } from "@/components/layout/FloatingActions";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { QuoteWizardProvider } from "@/components/quote/wizard/QuoteWizard";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <QuoteWizardProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2"
      >
        본문으로 건너뛰기
      </a>
      <SiteHeader />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <SiteFooter />
      <FloatingActions />
    </QuoteWizardProvider>
  );
}
