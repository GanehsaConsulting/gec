import { Branding } from "@/components/branding";
import { FamilyProductsClient } from "@/components/home/family-products-client";
import { LatestProjectClient } from "@/components/home/latest-project-client";
import { MainBanner } from "@/components/main-banner";
import { StatsSection } from "@/components/stats-section";
import { WhyUs } from "@/components/why-us";

export default function Home() {

  return (
    <>
      <MainBanner />
      <LatestProjectClient />
      <Branding />
      <StatsSection />
      <WhyUs />
      <FamilyProductsClient />
    </>
  );
}
