import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiCalendar, HiUser } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { formatNewsDate } from "@/lib/newsData";
import { NewsCard } from "./news-card";

export function NewsDetail({ post, related }) {
  return (
    <>
      {/* Hero — matches project detail */}
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
              <span className="px-3 py-1 rounded-full border border-secondaryColor text-secondaryColor dark:brightness-150 w-fit text-xs lg:text-sm inline-block">
                {post.category}
              </span>

              <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-1">
                  <HiCalendar className="w-4 h-4" />
                  <time dateTime={post.date}>{formatNewsDate(post.date)}</time>
                </div>
                <div className="flex items-center gap-1">
                  <HiUser className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              </div>

              <h1 className="text-2xl md:text-4xl tracking-tighter text-balance pb-1 font-bold">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main content — matches project detail */}
      <section id="content-section" className="py-8 md:py-12 flex justify-center">
        <div className="mx-4 lg:mx-62">
          <h2 className="text-xl md:text-3xl font-bold mb-6">Article Overview</h2>
          <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300">
            <p className="text-base md:text-lg font-medium leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
            {post.content.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Related — matches project detail */}
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
