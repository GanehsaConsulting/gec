import { NewsPage } from "@/components/news/news-page";
import {
  getAllNews,
  getFeaturedNews,
  newsBanner,
  newsCategories,
} from "@/lib/newsData";

export const metadata = {
  title: "News & Blog | GEC",
  description:
    "Update perusahaan, insight produk, dan cerita proyek dari Ganesha Engineering & Construction.",
};

export default function NewsRoutePage() {
  return (
    <NewsPage
      banner={newsBanner}
      categories={newsCategories}
      posts={getAllNews()}
      featuredPosts={getFeaturedNews()}
    />
  );
}
