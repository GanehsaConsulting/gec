"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  HiArrowLeft,
  HiCalendar,
  HiChevronLeft,
  HiChevronRight,
  HiUser,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skleton";
import { formatNewsDate } from "@/lib/newsData";
import { useArticleDetail } from "@/hooks/useArticles";
import { ArticleBody } from "./article-body";
import { NewsCard } from "./news-card";

function NewsDetailSkeleton() {
  return (
    <>
      <section className="h-[60vh] relative overflow-hidden bg-neutral-200 dark:bg-neutral-800">
        <div className="absolute bottom-0 linear-blur w-full h-[60lvh] bg-white/70 dark:bg-black/50" />
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
          <Skeleton className="w-40 h-9" />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mb-8 flex justify-center">
            <div className="space-y-3 w-full mx-4 lg:mx-62">
              <Skeleton className="w-32 h-6 rounded-full" />
              <div className="flex gap-3">
                <Skeleton className="w-32 h-5" />
                <Skeleton className="w-40 h-5" />
              </div>
              <Skeleton className="w-full h-8 md:h-10" />
              <Skeleton className="w-3/4 h-8 md:h-10" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 md:py-12 flex justify-center">
        <div className="mx-4 lg:mx-62 w-full space-y-3">
          <Skeleton className="w-64 h-8 mb-6" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
        </div>
      </section>
    </>
  );
}

function ArticleGallery({ images = [], title }) {
  const carouselRef = useRef(null);
  if (!images.length) return null;

  const scrollBy = (dir) => {
    if (!carouselRef.current) return;
    const amount = carouselRef.current.offsetWidth * 0.8;
    carouselRef.current.scrollBy({
      left: dir * amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-8 md:py-12">
      <div className="mb-6 flex lg:flex-row flex-col lg:items-center justify-between mx-4 lg:mx-62">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Article Gallery</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {images.length} {images.length === 1 ? "Image" : "Images"}
          </p>
        </div>
        {images.length > 1 && (
          <div className="md:flex items-center gap-2 hidden">
            <Button
              size="icon"
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
            >
              <HiChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              onClick={() => scrollBy(1)}
              aria-label="Next"
            >
              <HiChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar px-0 md:px-10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className={`relative flex-shrink-0 rounded-lg overflow-hidden
              ${index === 0 ? "ml-4 md:ml-53" : ""}
              ${index === images.length - 1 ? "mr-4 md:mr-53" : ""}`}
            style={{ width: "500px", height: "350px" }}
          >
            <Image
              src={url}
              alt={`${title} — image ${index + 1}`}
              fill
              className="object-cover"
              sizes="500px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function NewsDetailView({ slug }) {
  const searchParams = useSearchParams();
  const preview = searchParams.get("preview") === "1";
  const previewToken =
    searchParams.get("token") || searchParams.get("previewToken") || "";
  const { data: post, related, loading, error } = useArticleDetail(slug, {
    preview,
    previewToken,
  });

  if (loading) return <NewsDetailSkeleton />;

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center margin">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Article Not Found</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            {error || "This article is unavailable."}
          </p>
          <Link href="/news">
            <Button>
              <HiArrowLeft className="mr-2" />
              Back to News
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryLabel = post.categoryLabel || post.category;
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const gallery = Array.isArray(post.gallery) ? post.gallery.filter(Boolean) : [];

  return (
    <>
      {preview && (
        <div className="bg-otherColor text-otherColorDark text-center text-xs font-semibold uppercase tracking-wider py-2">
          Preview mode — draft / scheduled content
        </div>
      )}

      <section className="h-[60vh] relative overflow-hidden">
        <Image
          fill
          src={post.coverImage}
          alt={post.coverAlt || post.title}
          className="h-[60vh] w-full object-cover"
          priority
        />
        <div className="absolute bottom-0 linear-blur w-full h-[60lvh] bg-white/70 dark:bg-black/50" />

        <div className="absolute top-4 left-4 md:top-8 md:left-8">
          <Link href="/news">
            <Button
              variant="outline"
              size="sm"
              className="backdrop-blur-sm bg-white/80 dark:bg-black/60"
            >
              <HiArrowLeft className="mr-2" />
              Back to News
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="mb-8 flex justify-center">
            <div className="space-y-3 w-full mx-4 lg:mx-62">
              {categoryLabel && (
                <Link
                  href={`/news?category=${encodeURIComponent(post.category)}`}
                  className="px-3 py-1 rounded-full border border-secondaryColor text-secondaryColor dark:brightness-150 w-fit text-xs lg:text-sm inline-block hover:bg-secondaryColor/10"
                >
                  {categoryLabel}
                </Link>
              )}

              <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                {post.date && (
                  <div className="flex items-center gap-1">
                    <HiCalendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {formatNewsDate(post.date)}
                    </time>
                  </div>
                )}
                {post.author && (
                  <div className="flex items-center gap-1">
                    <HiUser className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                )}
              </div>

              <h1 className="text-2xl md:text-4xl tracking-tighter text-balance pb-1 font-bold">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section
        id="content-section"
        className="py-8 md:py-12 flex justify-center"
      >
        <div className="mx-4 lg:mx-62">
          <h2 className="text-xl md:text-3xl font-bold mb-6">
            Article Overview
          </h2>
          {post.excerpt && (
            <p className="text-base md:text-lg font-medium leading-relaxed text-muted-foreground mb-6">
              {post.excerpt}
            </p>
          )}
          {post.content ? <ArticleBody html={post.content} /> : null}

          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/news?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-main bg-lightColor dark:bg-secondaryDark border border-neutral-200/60 dark:border-white/10 hover:border-mainColor/30 dark:hover:border-otherColor/30"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <ArticleGallery images={gallery} title={post.title} />

      {related?.length > 0 && (
        <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="margin">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {related.map((item) => (
                <NewsCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
