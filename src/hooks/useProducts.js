'use client';
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook untuk fetch products dari API
 * 
 * @param {Object} options - Query options
 * @param {string} options.endpoint - 'products' | 'categorized' | 'detail' | 'categorized/detail' | 'products/division'
 * @param {string} options.id - Product ID
 * @param {string} options.slug - Product slug
 * @param {string} options.search - Search query
 * @param {boolean} options.published - Filter published only
 * @param {boolean} options.priority - Filter priority only
 * @param {string} options.category - Filter by category
 * @param {string} options.division - Filter by division
 * @param {string} options.sortBy - Sort field: 'id' | 'name' | 'price' | 'category' | 'division'
 * @param {string} options.order - Sort order: 'asc' | 'desc'
 * @param {number} options.page - Page number
 * @param {number} options.limit - Items per page
 * @param {number} options.minPrice - Minimum price
 * @param {number} options.maxPrice - Maximum price
 * @param {boolean} options.hasVariants - Filter products with variants (true = only products with variants, false = only products without variants)
 * @param {boolean} options.debug - Debug mode
 * @param {boolean} options.enabled - Auto fetch on mount (default: true)
 * 
 * @returns {Object} { data, loading, error, pagination, refetch }
 */

export function useProducts(options = {}) {
  const {
    endpoint = 'products',
    id,
    slug,
    search,
    published,
    priority,
    category,
    division,
    sortBy,
    order,
    page,
    limit,
    minPrice,
    maxPrice,
    hasVariants,
    debug,
    enabled = true,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const buildUrl = useCallback(() => {
    const params = new URLSearchParams();

    if (id) params.append('id', id);
    if (slug) params.append('slug', slug);
    if (search) params.append('search', search);
    if (published !== undefined) params.append('published', published);
    if (priority !== undefined) params.append('priority', priority);
    if (category) params.append('category', category);
    if (division) params.append('division', division);
    if (sortBy) params.append('sortBy', sortBy);
    if (order) params.append('order', order);
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (minPrice !== undefined) params.append('minPrice', minPrice);
    if (maxPrice !== undefined) params.append('maxPrice', maxPrice);
    if (hasVariants !== undefined) params.append('hasVariants', hasVariants);
    if (debug) params.append('debug', debug);

    const queryString = params.toString();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return `${baseUrl}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;
  }, [
    endpoint,
    id,
    slug,
    search,
    published,
    priority,
    category,
    division,
    sortBy,
    order,
    page,
    limit,
    minPrice,
    maxPrice,
    hasVariants,
    debug,
  ]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const url = buildUrl();
      const response = await fetch(url);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch products');
      }

      if (result.success) {
        setData(result.data);
        setPagination(result.pagination || null);
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (err) {
      setError(err.message);
      setData(null);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [buildUrl]);

  useEffect(() => {
    if (enabled) {
      fetchProducts();
    }
  }, [fetchProducts, enabled]);

  return {
    data,
    loading,
    error,
    pagination,
    refetch: fetchProducts,
  };
}

/**
 * Hook untuk get single product
 */
export function useProduct(idOrSlug, options = {}) {
  const isId = /^\d+$/.test(idOrSlug);

  return useProducts({
    endpoint: options.detailed ? 'products/detail' : 'products',
    ...(isId ? { id: idOrSlug } : { slug: idOrSlug }),
    ...options,
  });
}

/**
 * Hook untuk get categorized products (with variants)
 */
export function useCategorizedProducts(options = {}) {
  return useProducts({
    endpoint: 'products/categorized',
    ...options,
  });
}

/**
 * Hook untuk get single categorized product with full details
 */
export function useCategorizedProduct(idOrSlug, options = {}) {
  const isId = /^\d+$/.test(idOrSlug);

  return useProducts({
    endpoint: 'products/categorized/detail',
    ...(isId ? { id: idOrSlug } : { slug: idOrSlug }),
    ...options,
  });
}

/**
 * Hook untuk get products grouped by division
 * Returns array of { division: string, products: array }
 */
export function useProductsByDivision(options = {}) {
  return useProducts({
    endpoint: 'products/division',
    ...options,
  });
}

/**
 * Hook untuk search products dengan debounce
 */
export function useProductSearch(initialQuery = '', options = {}) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, options.debounceMs || 500);

    return () => clearTimeout(timer);
  }, [query, options.debounceMs]);

  const result = useProducts({
    endpoint: options.categorized ? 'products/categorized' : 'products',
    search: debouncedQuery,
    enabled: debouncedQuery.length >= (options.minLength || 2),
    ...options,
  });

  return {
    ...result,
    query,
    setQuery,
    isSearching: query !== debouncedQuery || result.loading,
  };
}