import type { Metadata } from "next";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { QuickQuote } from "@/components/home/QuickQuote";
import { LiveQuoteSection } from "@/components/home/LiveQuoteSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ReviewSection } from "@/components/home/ReviewSection";
import { ServiceSection } from "@/components/home/ServiceSection";
import { VideoSection } from "@/components/home/VideoSection";
import { site } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">{site.name} 이삿짐센터</h1>
      <Hero />
      <QuickQuote />
      <VideoSection />
      <ServiceSection />
      <ProcessSection />
      <LiveQuoteSection />
      <FaqSection />
      <ReviewSection />
    </>
  );
}
