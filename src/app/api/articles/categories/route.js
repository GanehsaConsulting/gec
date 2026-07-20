import {
  fetchArticleCategoriesWithArticles,
  getCmsConfig,
} from "@/lib/cmsArticles";

export async function GET() {
  try {
    const { brandId } = getCmsConfig();

    if (!brandId) {
      return Response.json(
        { success: false, error: "CMS_BRAND_ID is not configured" },
        { status: 503 }
      );
    }

    // Only categories that currently have published articles
    const categories = await fetchArticleCategoriesWithArticles();

    return Response.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("[article-categories API]", error.message);
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to fetch article categories",
      },
      { status: error.status || 500 }
    );
  }
}
