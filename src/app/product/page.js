"use client"
import { useState, useCallback, useEffect } from "react";
import { useProducts, useProductsByDivision } from "@/hooks/useProducts";
import { CardProducts } from "@/components/card-product";
import { ProductBanner } from "@/components/product-banner";
import { Sidebar } from "@/components/sidebar";
import { SearchBar } from "@/components/search-bar";
import { Pagination } from "@/components/pagination";
import { toast } from "sonner";

export default function ProdukPage() {
    const [filters, setFilters] = useState({
        search: '',
        division: '',
        page: 1,
        limit: 6
    });

    // Untuk mode loadmore - accumulate products
    const [accumulatedProducts, setAccumulatedProducts] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { data: products, loading, error, pagination } = useProducts({
        published: true,
        ...filters
    });

    const { data: divisionsData } = useProductsByDivision({
        published: true
    });

    // Reset accumulated products when filters change (except page)
    useEffect(() => {
        if (filters.page === 1) {
            setAccumulatedProducts(products || []);
        }
    }, [filters.search, filters.division, products]);

    // Accumulate products when loading more
    useEffect(() => {
        if (filters.page > 1 && products && products.length > 0) {
            setAccumulatedProducts(prev => {
                // Avoid duplicates
                const existingIds = new Set(prev.map(p => p.id));
                const newProducts = products.filter(p => !existingIds.has(p.id));

                // Show success toast
                toast.success(
                    `${newProducts.length} produk baru dimuat (Total: ${prev.length + newProducts.length})`,
                    { id: "load-more" }
                );

                return [...prev, ...newProducts];
            });
            setIsLoadingMore(false);
        }
    }, [products, filters.page]);

    const handleSearch = useCallback((searchQuery) => {
        setFilters(prev => ({
            ...prev,
            search: searchQuery,
            page: 1
        }));
        setAccumulatedProducts([]);
    }, []);

    const handleDivisionChange = useCallback((division) => {
        setFilters(prev => ({
            ...prev,
            division,
            page: 1
        }));
        setAccumulatedProducts([]);
    }, []);

    const handlePageChange = useCallback((newPage) => {
        setFilters(prev => ({
            ...prev,
            page: newPage
        }));
    }, []);

    const handleLoadMore = useCallback((nextPage) => {
        setIsLoadingMore(true);
        setFilters(prev => ({
            ...prev,
            page: nextPage
        }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({
            search: '',
            division: '',
            page: 1,
            limit: 6
        });
        setAccumulatedProducts([]);
    }, []);

    // Determine which products to show
    const displayProducts = filters.page > 1 ? accumulatedProducts : (products || []);

    // Check if there are more items to load
    const hasMore = pagination ? (filters.page < pagination.totalPages) : false;

    return (
        <>
            <ProductBanner />

            {error && (
                <div className="margin my-10">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
                    </div>
                </div>
            )}

            <div className="margin spacing grid grid-cols-1 lg:grid-cols-10 gap-5">
                <div className="lg:col-span-2">
                    <aside className="lg:sticky lg:top-17 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
                        <Sidebar
                            divisions={divisionsData || []}
                            selectedDivision={filters.division}
                            onDivisionChange={handleDivisionChange}
                            onClearFilters={clearFilters}
                        />
                    </aside>
                </div>

                <div className="lg:col-span-8 space-y-5">
                    <div className="lg:sticky lg:top-17 lg:z-20">
                        <SearchBar
                            className="bg-white/80 dark:bg-black/80 backdrop-blur-sm"
                            value={filters.search}
                            onSearch={handleSearch}
                            searchTerm={filters.search}
                            searchStats={{
                                totalResults: pagination?.total || 0
                            }}
                        />
                    </div>

                    <CardProducts
                        products={displayProducts}
                        loading={loading && filters.page === 1}
                        mode="grid"
                        showTitle={false}
                        showArrows={false}
                        gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        useMargin={false}
                        verticalMargin=""
                        searchTerm={filters.search}
                    />

                    {pagination && (
                        <Pagination
                            mode="loadmore"
                            currentPage={filters.page}
                            totalPages={pagination.totalPages}
                            onLoadMore={handleLoadMore}
                            totalItems={pagination.total}
                            itemsPerPage={filters.limit}
                            isLoading={isLoadingMore || (loading && filters.page > 1)}
                            hasMore={hasMore}
                            showInfo={true}
                        />
                    )}
                </div>
            </div>

            {!loading && !error && (!products || products.length === 0) && (
                <div className="margin my-10">
                    <div className="bg-white dark:bg-darkColor rounded-lg shadow-sm p-6 text-center">
                        <p className="text-lg mb-2">Tidak ada produk yang sesuai dengan pencarian Anda.</p>
                        <button
                            onClick={clearFilters}
                            className="mt-4 text-sm text-mainColorLight dark:text-mainColorDark hover:underline"
                        >
                            Hapus semua filter
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}