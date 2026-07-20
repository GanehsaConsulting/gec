/**
 * CMS Banners client — server-side only.
 * Public API: https://cms.gonline.id/api/public/banners*
 */

import { getCmsConfig } from "@/lib/cmsArticles";

/**
 * Allow only same-site paths or https URLs on trusted hosts.
 * Rejects protocol-relative (`//…`), javascript:, data:, etc.
 */
export function sanitizeBannerRedirectUrl(url) {
  if (!url || typeof url !== "string") return "";

  const trimmed = url.trim();
  if (!trimmed) return "";

  // Same-site path only (not protocol-relative)
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:") return "";

    const host = parsed.hostname.toLowerCase();
    const allowed =
      host === "gec.co.id" ||
      host.endsWith(".gec.co.id") ||
      host === "cms.gonline.id" ||
      host.endsWith(".gonline.id") ||
      host === "wa.me" ||
      host === "api.whatsapp.com";

    return allowed ? parsed.toString() : "";
  } catch {
    return "";
  }
}

export function mapBanner(banner) {
  if (!banner) return null;

  const images = Array.isArray(banner.images)
    ? banner.images.filter(Boolean)
    : [];

  return {
    id: banner.id,
    brandId: banner.brandId,
    name: banner.name || "",
    key: banner.key || "",
    images,
    redirectUrl: sanitizeBannerRedirectUrl(banner.redirectUrl || ""),
    isActive: Boolean(banner.isActive),
    createdAt: banner.createdAt || null,
    updatedAt: banner.updatedAt || null,
  };
}

async function cmsBannerFetch(path, query = {}, options = {}) {
  const { baseUrl, brandId } = getCmsConfig();
  const search = new URLSearchParams();
  search.set("brandId", brandId);

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });

  const url = `${baseUrl}${path}?${search.toString()}`;
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    redirect: "manual",
    next: { revalidate: options.revalidate ?? 60 },
    ...(options.cache ? { cache: options.cache } : {}),
  });

  if (response.status >= 300 && response.status < 400) {
    return null;
  }

  if (response.status === 404) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  const payload = await response.json();

  if (!response.ok) {
    if (payload?.error || response.status >= 400) {
      return null;
    }
    const error = new Error(
      payload?.error || `CMS banners failed (${response.status})`
    );
    error.status = response.status;
    throw error;
  }

  return payload;
}

export async function fetchBanners(query = {}, options = {}) {
  const payload = await cmsBannerFetch("/api/public/banners", query, options);
  if (!payload) return [];

  const list = Array.isArray(payload.data)
    ? payload.data
    : Array.isArray(payload)
      ? payload
      : [];

  return list.map(mapBanner).filter(Boolean);
}

export async function fetchBannerByKey(key, options = {}) {
  if (!key) return null;

  const payload = await cmsBannerFetch(
    `/api/public/banners/by-key/${encodeURIComponent(key)}`,
    {},
    options
  );

  if (!payload) return null;

  const banner = payload.data || payload;
  if (!banner || banner.error) return null;

  return mapBanner(banner);
}
