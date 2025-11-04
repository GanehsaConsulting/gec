'use client';
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook untuk fetch projects dari API
 * 
 * @param {Object} options - Query options
 * @param {string} options.id - Project ID
 * @param {string} options.slug - Project slug
 * @param {string} options.search - Search query
 * @param {boolean} options.published - Filter published only
 * @param {boolean} options.priority - Filter priority only
 * @param {string} options.category - Filter by category
 * @param {string} options.location - Filter by location
 * @param {string} options.sortBy - Sort field: 'id' | 'title' | 'date' | 'category' | 'location'
 * @param {string} options.order - Sort order: 'asc' | 'desc'
 * @param {number} options.page - Page number
 * @param {number} options.limit - Items per page
 * @param {boolean} options.debug - Debug mode
 * @param {boolean} options.enabled - Auto fetch on mount (default: true)
 * 
 * @returns {Object} { data, loading, error, pagination, refetch }
 */

export function useProjects(options = {}) {
    const {
        id,
        slug,
        search,
        published,
        priority,
        category,
        location,
        sortBy,
        order,
        page,
        limit,
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
        if (location) params.append('location', location);
        if (sortBy) params.append('sortBy', sortBy);
        if (order) params.append('order', order);
        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);
        if (debug) params.append('debug', debug);

        const queryString = params.toString();
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        return `${baseUrl}/api/projects/${queryString ? `?${queryString}` : ''}`;
    }, [
        id,
        slug,
        search,
        published,
        priority,
        category,
        location,
        sortBy,
        order,
        page,
        limit,
        debug,
    ]);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const url = buildUrl();
            const response = await fetch(url);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch projects');
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
            fetchProjects();
        }
    }, [fetchProjects, enabled]);

    return {
        data,
        loading,
        error,
        pagination,
        refetch: fetchProjects,
    };
}

/**
 * Hook untuk get single project by ID or slug
 * 
 * @param {string} idOrSlug - Project ID atau slug
 * @param {Object} options - Additional options
 * @returns {Object} { data, loading, error, refetch }
 */
export function useProject(idOrSlug, options = {}) {
    const isId = /^\d+$/.test(idOrSlug);

    return useProjects({
        ...(isId ? { id: idOrSlug } : { slug: idOrSlug }),
        ...options,
    });
}

/**
 * Hook untuk get published projects only
 * 
 * @param {Object} options - Additional options
 * @returns {Object} { data, loading, error, pagination, refetch }
 */
export function usePublishedProjects(options = {}) {
    return useProjects({
        published: true,
        ...options,
    });
}

/**
 * Hook untuk get priority projects only
 * 
 * @param {Object} options - Additional options
 * @returns {Object} { data, loading, error, pagination, refetch }
 */
export function usePriorityProjects(options = {}) {
    return useProjects({
        priority: true,
        ...options,
    });
}

/**
 * Hook untuk get projects by category
 * 
 * @param {string} category - Category name
 * @param {Object} options - Additional options
 * @returns {Object} { data, loading, error, pagination, refetch }
 */
export function useProjectsByCategory(category, options = {}) {
    return useProjects({
        category,
        published: true, // Default to published only
        ...options,
    });
}

/**
 * Hook untuk get projects by location
 * 
 * @param {string} location - Location name (partial match)
 * @param {Object} options - Additional options
 * @returns {Object} { data, loading, error, pagination, refetch }
 */
export function useProjectsByLocation(location, options = {}) {
    return useProjects({
        location,
        published: true, // Default to published only
        ...options,
    });
}

/**
 * Hook untuk search projects dengan debounce
 * 
 * @param {string} initialQuery - Initial search query
 * @param {Object} options - Additional options
 * @param {number} options.debounceMs - Debounce delay in ms (default: 500)
 * @param {number} options.minLength - Minimum query length to trigger search (default: 2)
 * @returns {Object} { data, loading, error, pagination, query, setQuery, isSearching, refetch }
 */
export function useProjectSearch(initialQuery = '', options = {}) {
    const [query, setQuery] = useState(initialQuery);
    const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, options.debounceMs || 500);

        return () => clearTimeout(timer);
    }, [query, options.debounceMs]);

    const result = useProjects({
        search: debouncedQuery,
        enabled: debouncedQuery.length >= (options.minLength || 2),
        published: true, // Default to published only
        ...options,
    });

    return {
        ...result,
        query,
        setQuery,
        isSearching: query !== debouncedQuery || result.loading,
    };
}

/**
 * Hook untuk get latest/recent projects
 * 
 * @param {number} limit - Number of projects to fetch (default: 6)
 * @param {Object} options - Additional options
 * @returns {Object} { data, loading, error, refetch }
 */
export function useLatestProjects(limit = 6, options = {}) {
    return useProjects({
        published: true,
        sortBy: 'date',
        order: 'desc',
        limit,
        page: 1,
        ...options,
    });
}

/**
 * Hook untuk get projects with pagination
 * 
 * @param {number} currentPage - Current page number
 * @param {number} itemsPerPage - Items per page (default: 10)
 * @param {Object} options - Additional options
 * @returns {Object} { data, loading, error, pagination, goToPage, nextPage, prevPage, refetch }
 */
export function useProjectsPagination(currentPage = 1, itemsPerPage = 10, options = {}) {
    const [page, setPage] = useState(currentPage);

    const result = useProjects({
        page,
        limit: itemsPerPage,
        published: true,
        sortBy: 'date',
        order: 'desc',
        ...options,
    });

    const goToPage = useCallback((newPage) => {
        setPage(newPage);
    }, []);

    const nextPage = useCallback(() => {
        if (result.pagination?.hasNext) {
            setPage(prev => prev + 1);
        }
    }, [result.pagination?.hasNext]);

    const prevPage = useCallback(() => {
        if (result.pagination?.hasPrev) {
            setPage(prev => prev - 1);
        }
    }, [result.pagination?.hasPrev]);

    return {
        ...result,
        currentPage: page,
        goToPage,
        nextPage,
        prevPage,
    };
}

/**
 * Hook untuk get all unique categories dari projects
 * 
 * @param {Object} options - Additional options
 * @returns {Object} { categories, loading, error }
 */
export function useProjectCategories(options = {}) {
    const { data, loading, error } = useProjects({
        published: true,
        limit: 1000, // Get all projects
        ...options,
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const uniqueCategories = [...new Set(data.map(project => project.category))].filter(Boolean);
            setCategories(uniqueCategories);
        }
    }, [data]);

    return {
        categories,
        loading,
        error,
    };
}

/**
 * Hook untuk get all unique locations dari projects
 * 
 * @param {Object} options - Additional options
 * @returns {Object} { locations, loading, error }
 */
export function useProjectLocations(options = {}) {
    const { data, loading, error } = useProjects({
        published: true,
        limit: 1000, // Get all projects
        ...options,
    });

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const uniqueLocations = [...new Set(data.map(project => project.location))].filter(Boolean);
            setLocations(uniqueLocations);
        }
    }, [data]);

    return {
        locations,
        loading,
        error,
    };
}

/**
 * Hook untuk get project detail by slug dengan related projects
 * 
 * @param {string} slug - Project slug
 * @param {Object} options - Additional options
 * @returns {Object} { data, related, loading, error, refetch }
 */
export function useProjectDetail(slug, options = {}) {
    const { enabled = true, ...restOptions } = options;

    const [data, setData] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProjectDetail = useCallback(async () => {
        if (!slug) return;

        setLoading(true);
        setError(null);

        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            const url = `${baseUrl}/api/projects/detail/${slug}`;

            const response = await fetch(url);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch project detail');
            }

            if (result.success) {
                setData(result.data);
                setRelated(result.related || []);
            } else {
                throw new Error(result.error || 'Unknown error');
            }
        } catch (err) {
            setError(err.message);
            setData(null);
            setRelated([]);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        if (enabled && slug) {
            fetchProjectDetail();
        }
    }, [fetchProjectDetail, enabled, slug]);

    return {
        data,
        related,
        loading,
        error,
        refetch: fetchProjectDetail,
    };
}