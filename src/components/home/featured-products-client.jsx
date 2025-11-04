"use client";

import { useProducts } from "@/hooks/useProducts";
import { CardProducts } from "../card-product";

export const FeaturedProductsClient = () => {
    const { data: products, loading, error } = useProducts({
        priority: true,
        published: true
    });
    return (
        <>
            {error && (
                <div className="margin my-6 md:my-10">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 md:p-6 text-center">
                        <p className="text-sm md:text-base text-red-600 dark:text-red-400">Error: {error}</p>
                    </div>
                </div>
            )}
            <CardProducts
                products={products}
                loading={loading}
                title="Featured Products"
                mode="carousel"
                showTitle={true}
                showDesc={false}
                showArrows={true}
            />
        </>
    )
}