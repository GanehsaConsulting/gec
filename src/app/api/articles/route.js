import {
  excludeProjectPosts,
  fetchArticleCategories,
  fetchArticles,
  getCmsConfig,
} from "@/lib/cmsArticles";

function json(data, status = 200, extraHeaders = {}) {
  return Response.json(data, {
    status,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  });
}

function errorResponse(error, fallbackStatus = 500) {
  const status = error.status || fallbackStatus;
  console.error("[articles API]", error.message);
  return json(
    {
      success: false,
      error: error.message || "Failed to fetch articles",
    },
    status
  );
}

function withCategoryLabels(posts, categories) {
  const labelById = new Map(
    (categories || []).map((cat) => [cat.id, cat.label])
  );
  return posts.map((post) => ({
    ...post,
    categoryLabel:
      labelById.get(post.category) || post.categoryLabel || post.category,
  }));
}

/** GET /api/articles — proxied CMS list */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const { brandId } = getCmsConfig();

    if (!brandId) {
      return json(
        { success: false, error: "CMS_BRAND_ID is not configured" },
        503
      );
    }

    const query = {
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 12,
    };

    const highlighted = searchParams.get("highlighted");
    if (highlighted === "true" || highlighted === "false") {
      query.highlighted = highlighted;
    }

    const category = searchParams.get("category");
    if (category) query.category = category;

    const tag = searchParams.get("tag");
    if (tag) query.tag = tag;

    const q =
      searchParams.get("q") ||
      searchParams.get("search") ||
      searchParams.get("query");
    if (q) query.q = q;

    const excludeSlug = searchParams.get("excludeSlug");
    if (excludeSlug) query.excludeSlug = excludeSlug;

    const sort = searchParams.get("sort");
    if (sort) query.sort = sort;

    const [result, categories] = await Promise.all([
      fetchArticles(query),
      fetchArticleCategories().catch(() => []),
    ]);

    // News “All” (no category): drop project posts from this page of results.
    // Explicit `category=our-project` stays available for /project + home.
    const posts = !category
      ? excludeProjectPosts(result.data)
      : result.data;

    return json({
      success: true,
      data: withCategoryLabels(posts, categories),
      pagination: result.pagination,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
