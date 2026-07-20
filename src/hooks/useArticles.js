"use client";

import { useCallback, useEffect, useState } from "react";

function buildArticlesUrl(options = {}) {
  const params = new URLSearchParams();
  const {
    page,
    limit,
    highlighted,
    category,
    tag,
    search,
    q,
    excludeSlug,
    sort,
  } = options;

  if (page) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));
  if (highlighted === true || highlighted === "true") {
    params.set("highlighted", "true");
  }
  if (highlighted === false || highlighted === "false") {
    params.set("highlighted", "false");
  }
  if (category && category !== "All") params.set("category", category);
  if (tag) params.set("tag", tag);
  const query = q || search;
  if (query) params.set("q", query);
  if (excludeSlug) params.set("excludeSlug", excludeSlug);
  if (sort) params.set("sort", sort);

  const qs = params.toString();
  return `/api/articles${qs ? `?${qs}` : ""}`;
}

/**
 * Paginated articles list from CMS (via local proxy).
 */
export function useArticles(options = {}) {
  const {
    page = 1,
    limit = 6,
    highlighted,
    category,
    tag,
    search,
    q,
    excludeSlug,
    sort,
    enabled = true,
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchArticles = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        buildArticlesUrl({
          page,
          limit,
          highlighted,
          category,
          tag,
          search,
          q,
          excludeSlug,
          sort,
        })
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to fetch articles");
      }

      setData(result.data || []);
      setPagination(result.pagination || null);
    } catch (err) {
      setError(err.message);
      setData([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [
    enabled,
    page,
    limit,
    highlighted,
    category,
    tag,
    search,
    q,
    excludeSlug,
    sort,
  ]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { data, loading, error, pagination, refetch: fetchArticles };
}

export function useHighlightedArticles(limit = 5, options = {}) {
  return useArticles({
    highlighted: true,
    limit,
    page: 1,
    ...options,
  });
}

export function useArticleCategories(options = {}) {
  const { enabled = true } = options;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/articles/categories");
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to fetch categories");
      }

      setData(result.data || []);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { data, loading, error, refetch: fetchCategories };
}

export function useArticleDetail(slug, options = {}) {
  const { enabled = true, preview = false, previewToken = "" } = options;
  const [data, setData] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(Boolean(enabled && slug));
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (!enabled || !slug) return;

    setLoading(true);
    setError(null);

    try {
      const previewParams = new URLSearchParams();
      if (preview) {
        previewParams.set("preview", "1");
        if (previewToken) previewParams.set("token", previewToken);
      }
      const previewQs = previewParams.toString()
        ? `?${previewParams.toString()}`
        : "";
      const [detailRes, relatedRes] = await Promise.all([
        fetch(`/api/articles/${encodeURIComponent(slug)}${previewQs}`),
        fetch(`/api/articles/${encodeURIComponent(slug)}/related?limit=4`),
      ]);

      const detailJson = await detailRes.json();
      if (!detailRes.ok || !detailJson.success) {
        throw new Error(detailJson.error || "Article not found");
      }

      setData(detailJson.data);

      if (relatedRes.ok) {
        const relatedJson = await relatedRes.json();
        setRelated(relatedJson.success ? relatedJson.data || [] : []);
      } else {
        setRelated([]);
      }
    } catch (err) {
      setError(err.message);
      setData(null);
      setRelated([]);
    } finally {
      setLoading(false);
    }
  }, [enabled, slug, preview, previewToken]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { data, related, loading, error, refetch: fetchDetail };
}
