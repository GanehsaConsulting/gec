"use client";

import { useCallback, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { CardPost } from "@/components/card-post";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/pagination";
import { ProjectGridSkeleton } from "@/components/project-card-skeleton";
import { ReusableBanner } from "@/components/reusable-banner";
import { useArticles } from "@/hooks/useArticles";
import { PROJECT_CATEGORY_ID } from "@/lib/cmsConstants";

const PAGE_SIZE = 12;

function mapArticleToCard(article) {
  const year = article.publishedAt || article.date
    ? new Date(article.publishedAt || article.date).getFullYear()
    : "";

  return {
    id: article.id,
    slug: article.slug,
    href: `/news/${article.slug}`,
    title: article.title,
    category: article.categoryLabel || article.category || "Our Project",
    categoryLabel: article.categoryLabel || article.category || "Our Project",
    description: article.excerpt || "",
    image: article.coverImage || article.thumbnail,
    year: Number.isFinite(year) ? String(year) : "",
  };
}

export default function ProjectArticlePage() {
  const [page, setPage] = useState(1);

  const { data, loading, error, pagination, refetch } = useArticles({
    page,
    limit: PAGE_SIZE,
    category: PROJECT_CATEGORY_ID,
    sort: "publishedAt-desc",
  });

  const cards = (data || []).map(mapArticleToCard);

  const handlePageChange = useCallback((nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <ReusableBanner
        imageSrc="https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d"
        imageAlt="Our Projects"
        title="Our Project"
        titleHighlight="& Activity"
        description="Menampilkan berbagai proyek dan aktifitas yang telah GEC selesaikan dengan standar mutu tinggi, presisi teknik, dan dedikasi penuh terhadap kepuasan mitra."
        buttonText="Explore"
        buttonIcon={<MdOutlineArrowOutward className="rotate-90" />}
      />

      {loading && (
        <ProjectGridSkeleton
          count={6}
          gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        />
      )}

      {error && (
        <div className="margin py-10">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">
              Failed to load projects: {error}
            </p>
            <Button onClick={refetch} className="mt-4" variant="outline">
              Retry
            </Button>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          <CardPost
            mode="grid"
            data={cards}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            emptyMessage="No projects published yet."
          />

          {pagination && pagination.totalPages > 1 && (
            <div className="margin pb-10">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                totalItems={pagination.total}
                itemsPerPage={PAGE_SIZE}
                itemLabel="projects"
                showInfo
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
