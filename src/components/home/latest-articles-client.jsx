"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Title } from "@/components/title-text";
import { Button } from "@/components/ui/button";
import { NewsCard } from "@/components/news/news-card";
import { useArticles } from "@/hooks/useArticles";
import { PROJECT_CATEGORY_ID } from "@/lib/cmsConstants";

function ArticlesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-main overflow-hidden bg-lightColor dark:bg-secondaryDark animate-pulse"
        >
          <div className="aspect-[4/3] bg-neutral-200 dark:bg-neutral-800" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-5 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LatestArticlesClient() {
  const { data, loading, error, refetch } = useArticles({
    page: 1,
    limit: 8,
    sort: "publishedAt-desc",
  });

  const posts = (data || [])
    .filter((article) => article.category !== PROJECT_CATEGORY_ID)
    .slice(0, 4);

  if (loading) {
    return (
      <section className="margin spacing">
        <Title className="mb-6">Latest Articles</Title>
        <ArticlesSkeleton />
      </section>
    );
  }

  if (error) {
    return (
      <section className="margin spacing">
        <Title className="mb-6">Latest Articles</Title>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200 text-sm">
            Failed to load articles: {error}
          </p>
          <Button onClick={refetch} className="mt-4" variant="outline">
            Retry
          </Button>
        </div>
      </section>
    );
  }

  if (!posts.length) return null;

  return (
    <section className="margin spacing space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <Title className="mb-2" icon={false}>
            News & Blog
          </Title>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter">
            Latest Articles
          </h2>
        </div>
        <Button asChild variant="outline">
          <Link href="/news">
            View all
            <ArrowRight />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
