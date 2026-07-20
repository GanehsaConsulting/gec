import {
  fetchArticleCategories,
  fetchRelatedArticles,
  getCmsConfig,
} from "@/lib/cmsArticles";

function withCategoryLabels(posts, categories) {
  const labelById = new Map(
    (categories || []).map((cat) => [cat.id, cat.label])
  );
  return (posts || []).map((post) => ({
    ...post,
    categoryLabel:
      labelById.get(post.category) || post.categoryLabel || post.category,
  }));
}

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const { brandId } = getCmsConfig();

    if (!brandId) {
      return Response.json(
        { success: false, error: "CMS_BRAND_ID is not configured" },
        { status: 503 }
      );
    }

    const limit = parseInt(searchParams.get("limit") || "4", 10);

    const [related, categories] = await Promise.all([
      fetchRelatedArticles(slug, limit),
      fetchArticleCategories().catch(() => []),
    ]);

    return Response.json({
      success: true,
      data: withCategoryLabels(related, categories),
    });
  } catch (error) {
    console.error("[articles related API]", error.message);
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to fetch related articles",
      },
      { status: error.status || 500 }
    );
  }
}
