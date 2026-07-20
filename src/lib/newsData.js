import newsJson from "@/data/news.json";

export const newsBanner = newsJson.banner;
export const newsCategories = newsJson.categories;
export const newsPosts = newsJson.posts;

export function getAllNews() {
  return [...newsPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedNews() {
  const featured = getAllNews().filter((post) => post.featured);
  if (featured.length > 0) return featured;
  const [first] = getAllNews();
  return first ? [first] : [];
}

export function getNewsBySlug(slug) {
  return newsPosts.find((post) => post.slug === slug) || null;
}

export function getRelatedNews(slug, limit = 3) {
  const current = getNewsBySlug(slug);
  if (!current) return getAllNews().slice(0, limit);

  return getAllNews()
    .filter((post) => post.slug !== slug)
    .sort((a, b) => {
      if (a.category === current.category && b.category !== current.category) {
        return -1;
      }
      if (b.category === current.category && a.category !== current.category) {
        return 1;
      }
      return 0;
    })
    .slice(0, limit);
}

export function formatNewsDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export function searchNews(posts, query) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return posts;

  return posts.filter((post) => {
    const haystack = [
      post.title,
      post.excerpt,
      post.category,
      post.author,
      ...(post.content || []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(trimmed);
  });
}

export function paginateNews(posts, page = 1, limit = 6) {
  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * limit;

  return {
    items: posts.slice(start, start + limit),
    pagination: {
      page: safePage,
      limit,
      total,
      totalPages,
      hasPrev: safePage > 1,
      hasNext: safePage < totalPages,
    },
  };
}
