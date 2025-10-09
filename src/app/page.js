'use client'
import { Branding } from "@/components/branding";
import { CardProducts } from "@/components/card-product";
import { MainBanner } from "@/components/main-banner";
import { WhyUs } from "@/components/why-us";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const { data: products, loading, error } = useProducts({
    priority: true,
    published: true
  });
  return (
    <>
      <MainBanner />
      {/* Error State - Responsive padding */}
      {error && (
        <div className="margin my-6 md:my-10">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 md:p-6 text-center">
            <p className="text-sm md:text-base text-red-600 dark:text-red-400">Error: {error}</p>
          </div>
        </div>
      )}

      {/* Mode Carousel - Best Selling */}
      <CardProducts
        products={products}
        loading={loading}
        title="Featured Products"
        mode="carousel"
        showTitle={true}
        showDesc={false}
        showArrows={true}
      />

      <Branding />
      <WhyUs />
    </>
  );
}
