import { About } from "@/components/about";
import { MainBanner } from "@/components/main-banner";
import { WhyUs } from "@/components/why-us";

export default function Home() {
  return (
    <>
      <MainBanner />
      <About />
      <WhyUs />
    </>
  );
}
