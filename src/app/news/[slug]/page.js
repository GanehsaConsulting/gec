import { notFound } from "next/navigation";
import { NewsDetail } from "@/components/news/news-detail";
import {
  getAllNews,
  getNewsBySlug,
  getRelatedNews,
} from "@/lib/newsData";

export function generateStaticParams() {
  return getAllNews().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) {
    return { title: "Article Not Found | GEC" };
  }

  return {
    title: `${post.title} | GEC News`,
    description: post.excerpt,
  };
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);

  if (!post) {
    notFound();
  }

  return <NewsDetail post={post} related={getRelatedNews(slug)} />;
}
