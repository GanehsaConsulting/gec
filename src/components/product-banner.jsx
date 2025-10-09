import Image from "next/image";
import Link from "next/link";
import { productDivisions } from "./system";
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
            <main className="pt-16 md:pt-24 margin">
                {/* Changed from grid-cols-2 to responsive layout */}
                <div className="space-y-5 md:grid md:grid-cols-2 items-center gap-6 md:gap-10">
                    {/* Text Section - Full width on mobile */}
                    <div className="w-full md:max-w-xl space-y-4 md:space-y-5">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter text-balance pb-1">
                            Engineered
                            {" "} Materials for a Stronger Future
                        </h1>
                        <p className="text-sm sm:text-base leading-5 md:leading-6 max-w-xl">
                            Ganesha Enginnering & Constructions adalah mitra rekayasa teknik yang mengintegrasikan teknologi, pengalaman, dan presisi dalam setiap proyek—dari tanah hingga teknologi.
                        </p>
                    </div>

                    {/* Product Browse Section - Full width on mobile */}
                    <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 gap-4 md:gap-5 rounded-main bg-darkColor/50 overflow-hidden h-full  relative">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tighter text-balance pb-1 text-white relative z-10">
                            Browse Our Products
                        </h1>

                        {/* Product categories - Responsive grid */}
                        <div className="flex flex-wrap gap-2 relative z-10">
                            {productDivisions.map((el, idx) => (
                                <Link
                                    key={idx}
                                    href={"/product/" + slugify(el.division)}
                                    className="flex items-center gap-1 line-clamp-1 px-3 py-1 bg-white/70 dark:bg-black/60 backdrop-blur-xs rounded-full text-xs font-medium duration-300 hover:text-base hover:invert"
                                >
                                    <el.icon />
                                    {el.division}
                                </Link>
                            ))}
                        </div>

                        {/* Background Image */}
                        <Image
                            fill
                            src="https://images.unsplash.com/photo-1689560042881-95f2398e69f0?q=80&w=966&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Background"
                            className="absolute inset-0 -z-10 object-cover"
                            priority
                        />

                        {/* Overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent -z-[5]" />
                    </div>
                </div>
            </main>

            {/* Error State - Responsive padding */}
            {error && (
                <div className="margin my-6 md:my-10">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 md:p-6 text-center">
                        <p className="text-sm md:text-base text-red-600 dark:text-red-400">Error: {error}</p>
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