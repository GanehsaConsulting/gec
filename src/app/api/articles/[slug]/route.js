import {
  fetchArticleBySlug,
  fetchArticleCategories,
  getCmsConfig,
  isPreviewAuthorized,
} from "@/lib/cmsArticles";

function json(data, status = 200, headers = {}) {
  return Response.json(data, { status, headers });
}

function withCategoryLabel(post, categories) {
  if (!post) return post;
  const match = (categories || []).find((cat) => cat.id === post.category);
  return {
    ...post,
    categoryLabel: match?.label || post.categoryLabel || post.category,
  };
}

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const wantsPreviewFlag = searchParams.get("preview") === "1";
    const previewAuthorized = isPreviewAuthorized(searchParams);
    const { brandId, previewSecret } = getCmsConfig();

    if (!brandId) {
      return json(
        { success: false, error: "CMS_BRAND_ID is not configured" },
        503
      );
    }

    if (wantsPreviewFlag && !previewSecret) {
      return json(
        { success: false, error: "Preview is not configured on this server" },
        403
      );
    }

    if (wantsPreviewFlag && !previewAuthorized) {
      return json(
        {
          success: false,
          error: "Preview requires a valid token (?preview=1&token=…)",
        },
        403
      );
    }

    const [article, categories] = await Promise.all([
      fetchArticleBySlug(slug, {
        preview: previewAuthorized,
        cache: previewAuthorized ? "no-store" : undefined,
      }),
      fetchArticleCategories().catch(() => []),
    ]);

    if (!article) {
      return json({ success: false, error: "Article not found" }, 404);
    }

    return json(
      {
        success: true,
        data: withCategoryLabel(article, categories),
      },
      200,
      previewAuthorized
        ? { "Cache-Control": "private, no-store" }
        : undefined
    );
  } catch (error) {
    const status = error.status || 500;
    console.error("[articles detail API]", error.message);
    return json(
      {
        success: false,
        error: error.message || "Failed to fetch article",
      },
      status
    );
  }
}
