import Image from "next/image";
import Link from "next/link";
import { formatNewsDate } from "@/lib/newsData";

export function NewsCard({ post, className = "" }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className={`group flex flex-col rounded-main overflow-hidden bg-lightColor dark:bg-secondaryDark border border-transparent dark:border-white/5 h-full ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.coverAlt || post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-secondary bg-lightColor/85 dark:bg-darkColor/80 backdrop-blur-sm">
          {post.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 gap-2 p-4 md:p-5">
        <time
          dateTime={post.date}
          className="text-[11px] uppercase tracking-wider text-muted-foreground"
        >
          {formatNewsDate(post.date)}
        </time>
        <h3 className="text-base md:text-lg font-semibold leading-snug line-clamp-2 group-hover:text-mainColor dark:group-hover:text-otherColor transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mt-auto">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
