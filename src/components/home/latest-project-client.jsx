"use client";

import { Button } from "@/components/ui/button";
import { CardPost } from "@/components/card-post";
import { ProjectGridSkeleton } from "@/components/project-card-skeleton";
import { useArticles } from "@/hooks/useArticles";
import { PROJECT_CATEGORY_ID } from "@/lib/cmsConstants";

function mapArticleToCard(article) {
  const year =
    article.publishedAt || article.date
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

export function LatestProjectClient() {
  const { data, loading, error, refetch } = useArticles({
    page: 1,
    limit: 12,
    category: PROJECT_CATEGORY_ID,
    sort: "publishedAt-desc",
  });

  const cards = (data || []).map(mapArticleToCard);

  if (loading) {
    return (
      <ProjectGridSkeleton
        count={4}
        gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      />
    );
  }

  if (error) {
    return (
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
    );
  }

  if (!cards.length) return null;

  return (
    <CardPost
      mode="carousel"
      showTitle
      title="Latest Projects"
      data={cards}
      emptyMessage="No projects published yet."
    />
  );
}
