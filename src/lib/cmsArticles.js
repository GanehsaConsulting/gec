/**
 * CMS Articles client — server-side only.
 * Public API: https://cms.gonline.id/api/public/articles*
 */

import { createHash, timingSafeEqual } from "crypto";
import { unstable_cache } from "next/cache";
import {
  NEWS_EXCLUDED_CATEGORY_IDS,
  PROJECT_CATEGORY_ID,
} from "@/lib/cmsConstants";

export { NEWS_EXCLUDED_CATEGORY_IDS, PROJECT_CATEGORY_ID };

const DEFAULT_CMS_URL = "https://cms.gonline.id";
const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop";

export const newsBanner = {
  imageSrc: FALLBACK_COVER,
  imageAlt: "News and blog GEC",
  title: "News",
  titleHighlight: "& Blog",
  description:
    "Update perusahaan, insight produk, dan cerita proyek dari GEC — solusi rekayasa dan konstruksi untuk infrastruktur Indonesia.",
};

export function getCmsConfig() {
  return {
    baseUrl: (process.env.CMS_API_URL || DEFAULT_CMS_URL).replace(/\/$/, ""),
    brandId:
      process.env.CMS_BRAND_ID || process.env.NEXT_PUBLIC_CMS_BRAND_ID || "gec",
    previewSecret: process.env.CMS_PREVIEW_SECRET || "",
  };
}

/**
 * Preview is authorized only when `preview=1` and `token` matches CMS_PREVIEW_SECRET.
 * Do not treat `preview=1` alone as authorization.
 * @param {URLSearchParams | Record<string, string | string[] | undefined> | null} searchParams
 */
export function isPreviewAuthorized(searchParams) {
  const { previewSecret } = getCmsConfig();
  if (!previewSecret || !searchParams) return false;

  const read = (key) => {
    if (typeof searchParams.get === "function") {
      return searchParams.get(key) || "";
    }
    const value = searchParams[key];
    if (Array.isArray(value)) return value[0] || "";
    return value == null ? "" : String(value);
  };

  if (read("preview") !== "1") return false;

  const token = read("token") || read("previewToken");
  if (!token) return false;

  try {
    const left = createHash("sha256").update(token).digest();
    const right = createHash("sha256").update(previewSecret).digest();
    return timingSafeEqual(left, right);
  } catch {
    return false;
  }
}

export function formatNewsDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return String(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Drop oversized base64 avatars from CMS payloads (often ~1–2MB each).
 * Keep short http(s) URLs if present.
 */
export function stripHeavyArticleFields(value) {
  if (Array.isArray(value)) {
    return value.map(stripHeavyArticleFields);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const out = {};
  for (const [key, child] of Object.entries(value)) {
    if (key === "authorImage") {
      if (
        typeof child === "string" &&
        /^https?:\/\//i.test(child) &&
        child.length < 2048
      ) {
        out[key] = child;
      }
      continue;
    }
    out[key] = stripHeavyArticleFields(child);
  }
  return out;
}

/** Map CMS ArticleSummary / Article → FE post shape used by news components */
export function mapArticleToPost(article) {
  if (!article) return null;

  const coverImage =
    article.thumbnail ||
    (Array.isArray(article.gallery) && article.gallery[0]) ||
    FALLBACK_COVER;

  return {
    id: article.id,
    brandId: article.brandId,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt || "",
    category: article.category || "",
    categoryLabel: article.categoryLabel || article.category || "",
    tags: Array.isArray(article.tags) ? article.tags : [],
    date: article.publishedAt || article.createdAt || null,
    publishedAt: article.publishedAt || null,
    createdAt: article.createdAt || null,
    updatedAt: article.updatedAt || null,
    author: article.authorName || "",
    featured: Boolean(article.highlighted),
    highlighted: Boolean(article.highlighted),
    coverImage,
    coverAlt: article.title,
    content: typeof article.content === "string" ? article.content : "",
    gallery: Array.isArray(article.gallery) ? article.gallery : [],
    thumbnail: article.thumbnail || "",
    metaTitle: article.metaTitle || article.title,
    metaDescription: article.metaDescription || article.excerpt || "",
    status: article.status,
  };
}

export function mapCategory(category) {
  if (!category) return null;
  return {
    id: category.id,
    label: category.label || category.id,
    source: category.source || "custom",
  };
}

function buildQuery(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    searchParams.set(key, String(value));
  });
  return searchParams.toString();
}

/**
 * Low-level CMS fetch. Returns parsed JSON or throws.
 * Always no-store on the upstream Response (CMS may embed multi-MB base64).
 * Mapped results are cached via unstable_cache in the public fetch helpers.
 *
 * @param {string} path - e.g. `/api/public/articles`
 * @param {Record<string, string|number|boolean>} query
 * @param {{ preview?: boolean, cache?: RequestCache, revalidate?: number|false }} options
 */
export async function cmsFetch(path, query = {}, options = {}) {
  const { baseUrl, brandId, previewSecret } = getCmsConfig();
  const params = { brandId, ...query };
  const qs = buildQuery(params);
  const url = `${baseUrl}${path}${qs ? `?${qs}` : ""}`;

  const headers = {
    Accept: "application/json",
  };

  // Header-only preview auth — never put the secret in the query string
  if (options.preview && previewSecret) {
    headers.Authorization = `Bearer ${previewSecret}`;
  }

  const response = await fetch(url, {
    headers,
    redirect: "manual",
    cache: "no-store",
  });

  // CMS middleware sometimes 307 → /login when feature/auth misconfigured
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location") || "";
    throw new Error(
      `CMS redirected (${response.status}) to ${location || "unknown"}. Check articles feature and brandId=${brandId}.`
    );
  }

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const message =
      payload?.error ||
      payload?.message ||
      `CMS request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  if (!isJson) {
    throw new Error("CMS returned non-JSON response");
  }

  return stripHeavyArticleFields(payload);
}

function unwrapList(payload) {
  const data = Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload)
      ? payload
      : [];

  const pagination =
    payload?.meta?.pagination ||
    payload?.pagination || {
      page: 1,
      limit: data.length,
      total: data.length,
      totalPages: 1,
    };

  return { data, pagination };
}

function normalizeArticleList(payload, query = {}) {
  const { data, pagination } = unwrapList(payload);
  return {
    data: data.map(mapArticleToPost).filter(Boolean),
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || query.limit || 20,
      total: pagination.total ?? data.length,
      totalPages: pagination.totalPages || 1,
      hasPrev: (pagination.page || 1) > 1,
      hasNext: (pagination.page || 1) < (pagination.totalPages || 1),
    },
  };
}

async function fetchArticlesUncached(query = {}, options = {}) {
  const payload = await cmsFetch("/api/public/articles", query, options);
  return normalizeArticleList(payload, query);
}

export async function fetchArticles(query = {}, options = {}) {
  if (options.preview || options.cache === "no-store") {
    return fetchArticlesUncached(query, options);
  }

  const { brandId } = getCmsConfig();
  const cacheKey = JSON.stringify({ brandId, query });

  return unstable_cache(
    () => fetchArticlesUncached(query, { ...options, cache: "no-store" }),
    ["cms-articles-list", cacheKey],
    { revalidate: 60 }
  )();
}

async function fetchArticleBySlugUncached(slug, options = {}) {
  const payload = await cmsFetch(
    `/api/public/articles/${encodeURIComponent(slug)}`,
    {},
    options
  );
  const article = payload?.data || payload;
  return mapArticleToPost(article);
}

export async function fetchArticleBySlug(slug, options = {}) {
  if (options.preview || options.cache === "no-store") {
    return fetchArticleBySlugUncached(slug, options);
  }

  const { brandId } = getCmsConfig();

  return unstable_cache(
    () => fetchArticleBySlugUncached(slug, { ...options, cache: "no-store" }),
    ["cms-article-slug", brandId, slug],
    { revalidate: 60 }
  )();
}

export async function fetchRelatedArticles(slug, limit = 3, options = {}) {
  const payload = await cmsFetch(
    `/api/public/articles/${encodeURIComponent(slug)}/related`,
    { limit },
    options
  );
  const { data } = unwrapList(payload);
  return data.map(mapArticleToPost).filter(Boolean);
}

export async function fetchArticleCategories(options = {}) {
  const { brandId } = getCmsConfig();

  const load = async () => {
    const payload = await cmsFetch(
      "/api/public/article-categories",
      {},
      options
    );
    const list = Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload)
        ? payload
        : [];
    return list.map(mapCategory).filter(Boolean);
  };

  if (options.preview || options.cache === "no-store") {
    return load();
  }

  return unstable_cache(load, ["cms-article-categories", brandId], {
    revalidate: 60,
  })();
}

/**
 * Categories that have at least one published article (total > 0).
 * Probes each category with limit=1 to read pagination.total.
 * Excludes project category from News chips by default.
 */
export async function fetchArticleCategoriesWithArticles(options = {}) {
  const {
    excludeIds = NEWS_EXCLUDED_CATEGORY_IDS,
    ...fetchOptions
  } = options;

  const categories = await fetchArticleCategories(fetchOptions);
  const excluded = new Set(excludeIds || []);

  const withCounts = await Promise.all(
    categories
      .filter((category) => !excluded.has(category.id))
      .map(async (category) => {
        try {
          const { pagination } = await fetchArticles(
            { category: category.id, page: 1, limit: 1 },
            fetchOptions
          );
          const count = pagination?.total ?? 0;
          return { ...category, count };
        } catch {
          return { ...category, count: 0 };
        }
      })
  );

  return withCounts
    .filter((category) => category.count > 0)
    .sort((a, b) => a.label.localeCompare(b.label));
}

/** Drop project posts from a news “All” page (best-effort; prefer category filter). */
export function excludeProjectPosts(posts = []) {
  const excluded = new Set(NEWS_EXCLUDED_CATEGORY_IDS);
  return (posts || []).filter((post) => !excluded.has(post.category));
}
