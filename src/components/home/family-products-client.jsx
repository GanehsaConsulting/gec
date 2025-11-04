"use client";
import { useCategorizedProducts } from "@/hooks/useProducts";
import { CardProducts } from "../card-product";

export const FamilyProductsClient = () => {
    const { data: familyProducts, loading } = useCategorizedProducts({
        published: true,
        hasVariants: true,
    });
    return (
        <>
            <CardProducts
                products={familyProducts}
                loading={loading}
                title="Family Products"
                mode="family"
                showTitle={true}
                showDesc={false}
                showArrows={true}
                gridCols="grid-cols-2 md:grid-cols-6"
            />
        </>
    )
}