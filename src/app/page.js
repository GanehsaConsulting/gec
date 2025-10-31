'use client'
import { Branding } from "@/components/branding";
import { CardPost } from "@/components/card-post";
import { CardProducts } from "@/components/card-product";
import { MainBanner } from "@/components/main-banner";
import { StatsSection } from "@/components/stats-section";
import { Title } from "@/components/title";
import { WhyUs } from "@/components/why-us";
import { useCategorizedProducts, useProducts } from "@/hooks/useProducts";

export default function Home() {
  const { data: products, loading, error } = useProducts({
    priority: true,
    published: true
  });

  const { data: productsC, loadingC, errorC } = useCategorizedProducts({
    published: true,
    hasVariants: true,
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
      <CardPost
        mode="carousel"
        showTitle={true}
        title="Latest Projects"
      />
      <StatsSection />
      <WhyUs />

      {/* Mode Carousel - Best Selling */}
      <CardProducts
        products={productsC}
        loading={loading}
        title="Family Products"
        mode="family"
        showTitle={true}
        showDesc={false}
        showArrows={true}
        gridCols="grid-cols-2 md:grid-cols-6"
      />
    </>
  );
}
