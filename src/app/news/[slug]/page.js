import { Suspense } from "react";
import { NewsDetailView } from "@/components/news/news-detail";
import {
  fetchArticleBySlug,
  isPreviewAuthorized,
} from "@/lib/cmsArticles";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearch = await searchParams;
  const preview = isPreviewAuthorized(resolvedSearch);

  try {
    const post = await fetchArticleBySlug(slug, {
      preview,
      cache: preview ? "no-store" : undefined,
    });

    if (!post) {
      return { title: "Article Not Found | GEC" };
    }

    return {
      title: `${post.metaTitle || post.title} | GEC News`,
      description: post.metaDescription || post.excerpt,
    };
  } catch {
    return { title: "News | GEC" };
  }
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;

  return (
    <Suspense fallback={null}>
      <NewsDetailView slug={slug} />
    </Suspense>
  );
}
