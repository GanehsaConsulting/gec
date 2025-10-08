"use client"
import { useProductsByDivision } from "@/hooks/useProducts";
import { CardProducts } from "@/components/card-product";
import { ProductBanner } from "@/components/product-banner";

export default function ProdukPage() {
    const { data: divisions, loading, error } = useProductsByDivision({
        published: true
    });

    return (
        <>
            <ProductBanner />

            {/* Error State */}
            {error && (
                <div className="margin my-10">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="margin my-10">
                    <div className="text-center py-10">
                        <p className="text-neutral-600 dark:text-neutral-400">Loading products...</p>
                    </div>
                </div>
            )}

            {/* Render Each Division with its Products */}
            {!loading && !error && divisions && divisions.map((divisionData, index) => (
                <CardProducts
                    key={divisionData.division || index}
                    products={divisionData.products || []}
                    loading={false}
                    title={divisionData.division}
                    mode="carousel"
                    showTitle={true}
                    showArrows={true}
                    viewAllLink={`/product/${divisionData.division.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
                />
            ))}

            {/* Empty State */}
            {!loading && !error && (!divisions || divisions.length === 0) && (
                <div className="margin my-10">
                    <div className="bg-white dark:bg-darkColor rounded-lg shadow-sm p-6 text-center">
                        <p>Tidak ada produk tersedia saat ini.</p>
                    </div>
                </div>
            )}
        </>
    );
}