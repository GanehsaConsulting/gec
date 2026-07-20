"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Load a single CMS placement banner by key (e.g. mega-menu, homepage).
 */
export function useBanner(key, options = {}) {
  const { enabled = true } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(enabled && key));
  const [error, setError] = useState(null);

  const fetchBanner = useCallback(async () => {
    if (!enabled || !key) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/banners/by-key/${encodeURIComponent(key)}`
      );
      const result = await response.json();

      if (response.status === 404 || !result.success) {
        setData(null);
        return;
      }

      setData(result.data || null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [enabled, key]);

  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  return { data, loading, error, refetch: fetchBanner };
}
