import { fetchBanners } from "@/lib/cmsBanners";
import { getCmsConfig } from "@/lib/cmsArticles";

export async function GET(request) {
  try {
    const { brandId } = getCmsConfig();
    if (!brandId) {
      return Response.json(
        { success: false, error: "CMS_BRAND_ID is not configured" },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = {};
    const key = searchParams.get("key");
    const q = searchParams.get("q") || searchParams.get("search");
    const sort = searchParams.get("sort");

    if (key) query.key = key;
    if (q) query.q = q;
    if (sort) query.sort = sort;

    const data = await fetchBanners(query);

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("[banners API]", error.message);
    return Response.json(
      { success: false, error: error.message || "Failed to fetch banners" },
      { status: error.status || 500 }
    );
  }
}
