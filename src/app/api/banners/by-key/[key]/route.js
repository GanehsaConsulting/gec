import { fetchBannerByKey } from "@/lib/cmsBanners";
import { getCmsConfig } from "@/lib/cmsArticles";

export async function GET(_request, { params }) {
  try {
    const { key } = await params;
    const { brandId } = getCmsConfig();

    if (!brandId) {
      return Response.json(
        { success: false, error: "CMS_BRAND_ID is not configured" },
        { status: 503 }
      );
    }

    const banner = await fetchBannerByKey(key);

    if (!banner || !banner.images?.length) {
      return Response.json(
        { success: false, error: "Banner not found", data: null },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: banner });
  } catch (error) {
    console.error("[banners by-key API]", error.message);
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to fetch banner",
        data: null,
      },
      { status: error.status || 500 }
    );
  }
}
