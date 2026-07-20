import { Suspense } from "react";
import { NewsPage } from "@/components/news/news-page";

export const metadata = {
  title: "News & Blog | GEC",
  description:
    "Update perusahaan, insight produk, dan cerita proyek dari Ganesha Engineering & Construction.",
};

function NewsPageFallback() {
  return (
    <div className="margin spacing">
      <div className="h-8 w-48 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="aspect-[4/3] rounded-main bg-neutral-200 dark:bg-neutral-800 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export default function NewsRoutePage() {
  return (
    <Suspense fallback={<NewsPageFallback />}>
      <NewsPage />
    </Suspense>
  );
}
