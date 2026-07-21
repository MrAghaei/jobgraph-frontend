import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { HeroSection } from "@/components/landing/hero-section";
import { SourceStrip } from "@/components/landing/source-strip";
import { HowItWorks } from "@/components/landing/how-it-works";
import { MarketPulse } from "@/components/landing/market-pulse";
import { ProAlerts } from "@/components/landing/pro-alerts";
import { FinalCta } from "@/components/landing/final-cta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <SourceStrip />
        <HowItWorks />
        <MarketPulse />
        <ProAlerts />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
