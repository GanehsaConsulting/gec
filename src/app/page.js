'use client'
import { Branding } from "@/components/branding";
import { CardPost } from "@/components/card-post";
import { CardProducts } from "@/components/card-product";
import { MainBanner } from "@/components/main-banner";
import { StatsSection } from "@/components/stats-section";
import { WhyUs } from "@/components/why-us";
import { useCategorizedProducts, useProducts } from "@/hooks/useProducts";
import { useProjects } from "@/hooks/useProjects";

export default function Home() {
  const { data: products, loading, error } = useProducts({
    priority: true,
    published: true
  });

  const { data: productsC, loadingC, errorC } = useCategorizedProducts({
    published: true,
    hasVariants: true,
  });

  const { data: projects, loadingProject, errorProject } = useProjects({
    page: 1,
    limit: 12,
    published: true,
  });

  // Transform data ke format yang dibutuhkan CardPost
  const transformedProjects = projects?.map(project => ({
    id: project.id,
    title: project.title,
    category: project.category,
    location: project.location,
    year: project.date?.split('/')[2] || '',
    description: project.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' || '',
    image: project.thumbnail || project.imageUrl[0] || 'https://images.unsplash.com/photo-1519143009590-e3800b9df468',
  })) || [];

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

      {/* Loading State with Skeleton */}
      {loadingProject && (
        <ProjectGridSkeleton
          count={6}
          gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        />
      )}

      {/* Error State */}
      {errorProject && (
        <div className="margin py-10">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">
              Failed to load projects: {error}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          <CardPost
            mode="carousel"
            showTitle={true}
            title="Latest Projects"
            data={transformedProjects}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          />
        </>
      )}
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
      <StatsSection />
      <WhyUs />
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
