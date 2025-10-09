import Image from "next/image";
import { productDivisions } from "./system";
import { SearchBar } from "./search-bar";
import { useProducts } from "@/hooks/useProducts";
import { CardProducts } from "./card-product";
import { slugify } from "@/lib/slugify";


export const ProductBanner = () => {
    const { data: products, loading, error } = useProducts({
        priority: true,
        published: true
    });

    return (
        <>
            <main className="pt-24 margin">
                <div className="space-y-5 grid grid-cols-2 items-center gap-10">
                    <div className="max-w-xl space-y-5">
                        <h1 className="text-4xl md:text-6xl tracking-tighter text-balance pb-1">
                            Engineered

                            {" "} Materials for a Stronger Future
                        </h1>
                        <p className="leading-5 max-w-xl">
                            Ganesha Enginnering & Constructions adalah mitra rekayasa teknik yang mengintegrasikan teknologi, pengalaman, dan presisi dalam setiap proyek—dari tanah hingga teknologi.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center p-10 gap-5 rounded-main bg-darkColor/50 overflow-hidden h-full relative">
                        <h1 className="text-2xl md:text-4xl tracking-tighter text-balance pb-1 text-white">
                            Browse Our Products
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            {productDivisions.map((el, idx) => (
                                <a
                                    key={idx}
                                    href={"/product/" + slugify(el.division)}
                                    className="flex items-center gap-1 line-clamp-1 px-3 py-1 bg-white/70 dark:bg-black/60 backdrop-blur-xs rounded-full text-xs font-medium duration-300 hover:text-base hover:invert"
                                >
                                    <el.icon />
                                    {el.division}
                                </a>
                            ))}
                        </div>
                        <Image
                            fill
                            src="https://images.unsplash.com/photo-1689560042881-95f2398e69f0?q=80&w=966&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="absolute inset-0 -z-10 object-cover"
                        />
                    </div>
                </div>
            </main>

            {/* Error State */}
            {error && (
                <div className="margin my-10">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
                    </div>
                </div>
            )}
            {/* Mode Carousel - Best Selling */}
            <CardProducts
                products={products}
                loading={loading}
                title="Best Selling Products"
                mode="carousel"
                showTitle={true}
                showDesc={false}
                showArrows={true}
            />
        </>
    )
}