"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { slugify } from "@/lib/slugify";
import { HighlightText } from "./highlight-text";

// Skeleton Loading Component for Card
const CardSkeleton = () => (
    <div className="min-w-80 w-80 h-full animate-pulse">
        <div className="w-80 h-80 bg-gray-200 dark:bg-gray-700 rounded-main"></div>
        <div className="mt-2 space-y-2">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
    </div>
);

// Skeleton untuk Grid Mode
const GridCardSkeleton = () => (
    <div className="w-full h-full animate-pulse">
        <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-main"></div>
        <div className="mt-2 space-y-2">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
    </div>
);

// Skeleton untuk Family Mode
const FamilyCardSkeleton = () => (
    <div className="w-full h-full animate-pulse">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-main p-4 h-full">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
            <div className="grid grid-cols-2 gap-2">
                {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="aspect-square bg-gray-300 dark:bg-gray-600 rounded"></div>
                ))}
            </div>
        </div>
    </div>
);

export const CardProducts = ({
    products = [],
    loading = false,
    title = "Best Selling!",
    viewAllLink,
    mode = "carousel",
    showTitle = true,
    showArrows = true,
    showDesc = true,
    gridCols = "md:grid-cols-4",
    sourcePath = "",
    useMargin = true,
    verticalMargin = "my-10",
    searchTerm = ""
}) => {
    const [carouselRef, setCarouselRef] = useState(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const effectiveMode = (!loading && products?.length < 5 && mode !== "family") ? "grid" : mode;

    const updateCarouselPosition = () => {
        if (carouselRef) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef;
            setIsAtStart(scrollLeft <= 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
        }
    };

    if (!loading && (!products || products.length === 0)) {
        return (
            <section className={verticalMargin}>
                <div className={useMargin ? "margin" : ""}>
                    {showTitle && (
                        <div className="text-2xl md:text-3xl font-medium mb-5">
                            {title}
                        </div>
                    )}
                    <div className="bg-white dark:bg-darkColor rounded-lg shadow-sm p-6 text-center">
                        <p>Tidak ada produk tersedia saat ini.</p>
                    </div>
                </div>
            </section>
        );
    }

    // FAMILY MODE - For categorized products with variants
    if (effectiveMode === "family") {
        return (
            <section className={verticalMargin}>
                <div className={useMargin ? "margin" : ""}>
                    {showTitle && (
                        <div className="flex items-center justify-between mb-5">
                            <h1 className="text-2xl md:text-3xl font-medium">
                                {title}
                            </h1>
                            {viewAllLink && (
                                <a
                                    href={viewAllLink}
                                    className="text-xs flex items-center gap-1 mt-1 hover:text-mainColorLight dark:hover:text-mainColorDark"
                                >
                                    <Button size={"sm"}>
                                        <HiChevronRight /> Lihat semua
                                    </Button>
                                </a>
                            )}
                        </div>
                    )}

                    <div className={`grid gap-4 ${gridCols}`}>
                        {loading ? (
                            <>
                                {[...Array(6)].map((_, idx) => (
                                    <FamilyCardSkeleton key={idx} />
                                ))}
                            </>
                        ) : (

                            products.map((product, idx) => {
                                const productNameIdx0 = product.variants[0].productName
                                const productSlug = slugify(productNameIdx0);
                                const productPath = slugify(product.division) || sourcePath?.replace("/", "") || "";
                                const productUrl = `/product/${productPath}/${productSlug}`;
                                const hasVariants = product.variants && product.variants.length > 0;
                                const displayVariants = hasVariants ? product.variants.slice(0, 4) : [];

                                return (
                                    <Link
                                        key={product.id || idx}
                                        href={productUrl}
                                        className="group"
                                    >
                                        <div className="bg-lightColor dark:bg-darkColor rounded-main p-2.5 border border-darkColor/10 dark:border-lightColor/10 hover:border-mainColorLight dark:hover:border-mainColorDark transition-all duration-300 h-full">
                                            {/* Category/Product Name */}
                                            <div className="mb-3">
                                                <p className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    <HighlightText
                                                        text={product.division}
                                                        searchTerm={searchTerm}
                                                    />
                                                </p>
                                            </div>

                                            {/* Grid of variant images */}
                                            <div className="grid grid-cols-2 gap-1">
                                                {displayVariants.map((variant, vIdx) => (
                                                    <div
                                                        key={variant.id || vIdx}
                                                        className="relative aspect-square rounded overflow-hidden bg-gray-100 dark:bg-gray-800"
                                                    >
                                                        <Image
                                                            width={200}
                                                            height={200}
                                                            src={variant.imageUrl || variant.image || "/cb.png"}
                                                            alt={variant.productName || variant.name || "Variant"}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>
                                                ))}
                                                {/* Add blank squares if less than 4 variants */}
                                                {Array.from({ length: 4 - displayVariants.length }).map((_, idx) => (
                                                    <div
                                                        key={`blank-${idx}`}
                                                        className="aspect-square rounded overflow-hidden bg-white dark:bg-black border-darkColor/10 dark:border-lightColor/10"
                                                    />
                                                ))}
                                            </div>

                                            <div className="mt-3">
                                                <h2 className="text-sm font-medium line-clamp-2 group-hover:text-mainColorLight dark:group-hover:text-mainColorDark transition-colors">
                                                    <HighlightText
                                                        text={product.productCategory || product.productName || product.name}
                                                        searchTerm={searchTerm}
                                                    />
                                                </h2>
                                            </div>

                                            {/* Variant count badge */}
                                            {hasVariants && (
                                                <div className="mt-3 flex items-center justify-between text-neutral-500">
                                                    <span className="text-xs">
                                                        {product.variants.length} {product.variants.length === 1 ? 'Variant' : 'Variants'}
                                                    </span>
                                                    <p className="flex items-center gap-1 text-xs text-mainColorLight dark:text-mainColorDark group-hover:text-darkColor dark:group-hover:text-lightColor group-hover:opacity-100 duration-300">
                                                        More Detail <HiChevronRight className="size-3" />
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>
            </section>
        );
    }

    // CAROUSEL MODE
    if (effectiveMode === "carousel") {
        return (
            <main className={verticalMargin}>
                <div className={`${useMargin ? "margin" : ""} flex items-center justify-between mb-4`}>
                    {showTitle && (
                        <div>
                            <h1 className="text-3xl font-medium">
                                {title}
                            </h1>
                            {viewAllLink && (
                                <a
                                    href={viewAllLink}
                                    className="text-xs flex items-center gap-1 mt-1 hover:text-mainColorLight dark:hover:text-mainColorDark"
                                >
                                    <HiChevronRight /> Lihat semua
                                </a>
                            )}
                        </div>
                    )}
                    {showArrows && (
                        <div className="hidden md:block space-x-2">
                            <Button
                                size="icon"
                                onClick={() => carouselRef?.scrollBy({ left: -700, behavior: "smooth" })}
                                className={`transition-opacity duration-300 ${isAtStart ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                                disabled={isAtStart}
                            >
                                <HiChevronLeft />
                            </Button>
                            <Button
                                size="icon"
                                onClick={() => carouselRef?.scrollBy({ left: 700, behavior: "smooth" })}
                                className={`transition-opacity duration-300 ${isAtEnd ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                                disabled={isAtEnd}
                            >
                                <HiChevronRight />
                            </Button>
                        </div>
                    )}
                </div>

                <section
                    ref={ref => setCarouselRef(ref)}
                    onScroll={updateCarouselPosition}
                    className="carousel w-full gap-3"
                >
                    {loading ? (
                        <>
                            {[...Array(5)].map((_, idx) => (
                                <div key={idx} className={`${idx === 0 && "md:ml-10 ml-4"}`}>
                                    <CardSkeleton />
                                </div>
                            ))}
                        </>
                    ) : (
                        products.map((product, idx) => {
                            const productSlug = product.slug || slugify(product.productName || product.name || '');
                            const productPath = slugify(product.division) || sourcePath?.replace("/", "") || "";
                            const productUrl = `/product/${productPath}/${productSlug}`;
                            const imgUrl = product.imageUrl || product.image || "/cb.png";

                            return (
                                <Link
                                    key={product.productId || product.id || idx}
                                    className={`${idx === 0 && "md:ml-10 ml-4"} ${idx === products.length - 1 && "md:mr-10 mr-4"} min-w-80 h-full z-10`}
                                    href={productUrl}
                                >
                                    <div className="w-80 h-80 overflow-hidden rounded-main relative group">
                                        <Image
                                            width={500}
                                            height={500}
                                            src={imgUrl}
                                            alt={product.productName || product.name || "Product"}
                                            className="w-80 h-80 duration-300 ease-in-out group-hover:scale-110 aspect-square rounded-main object-cover"
                                        />
                                        <div className="absolute top-2 left-2 group-hover:-translate-y-100 translate-y-0 duration-500">
                                            <p className="px-2 py-1 text-xs rounded-full bg-darkColor/10 dark:bg-darkColor/10 text-darkColor lightColor font-semibold backdrop-blur-lg">
                                                {product.division || product.category || product.productCategory || "Product"}
                                            </p>
                                        </div>
                                        <div className="z-10 flex items-center justify-center absolute inset-0 backdrop-blur-[2px] bg-lightColor/40 dark:bg-darkColor/30 group-hover:opacity-100 opacity-0 duration-300"></div>
                                        <div className="z-20 group flex items-center justify-center absolute inset-0 bg-lightColor/50 dark:bg-darkColor/30 group-hover:opacity-100 opacity-0 duration-300">
                                            <div className="-translate-y-10 group-hover:translate-y-0 scale-90 group-hover:scale-100 ease-in-out duration-300 flex items-center gap-2">
                                                <Button
                                                    className="bg-green-600/50 dark:bg-green-200/70"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const whatsappLink = product.ctaLink ||
                                                            product.whatsappLink ||
                                                            product.link ||
                                                            `https://wa.me/6281234567890?text=Halo, saya tertarik dengan ${encodeURIComponent(product.productName || product.name)}`;
                                                        window.open(whatsappLink, '_blank');
                                                    }}
                                                >
                                                    <FaWhatsapp /> Contact
                                                </Button>
                                                <Button variant="glass">
                                                    Detail
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 space-y-2">
                                        <h1 className="font-medium line-clamp-2">
                                            <HighlightText
                                                text={product.productName || product.name}
                                                searchTerm={searchTerm}
                                            />
                                        </h1>
                                        {product.descriptions && showDesc === true && (
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                                <HighlightText
                                                    text={product.descriptions}
                                                    searchTerm={searchTerm}
                                                />
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </section>
            </main>
        );
    }

    // GRID MODE
    return (
        <section className={verticalMargin}>
            <div className={useMargin ? "margin" : ""}>
                {showTitle && (
                    <div className="flex items-center justify-between mb-5">
                        <h1 className="text-2xl md:text-3xl font-medium">
                            {title}
                        </h1>
                        {viewAllLink && (
                            <a
                                href={viewAllLink}
                                className="text-xs flex items-center gap-1 mt-1 hover:text-mainColorLight dark:hover:text-mainColorDark"
                            >
                                <Button size={"sm"}>
                                    <HiChevronRight /> Lihat semua
                                </Button>
                            </a>
                        )}
                    </div>
                )}

                <div className={`grid gap-y-7 ${gridCols} gap-3`}>
                    {loading ? (
                        <>
                            {[...Array(8)].map((_, idx) => (
                                <GridCardSkeleton key={idx} />
                            ))}
                        </>
                    ) : (
                        products.map((product, idx) => {
                            const productSlug = product.slug || slugify(product.productName || product.name || '');
                            const productPath = slugify(product.division) || sourcePath?.replace("/", "") || "";
                            const productUrl = `/product/${productPath}/${productSlug}`;
                            const imgUrl = product.imageUrl || product.image || "/cb.png";

                            return (
                                <Link
                                    key={product.productId || product.id || idx}
                                    className="w-full h-full z-10"
                                    href={productUrl}
                                >
                                    <div className="w-full aspect-square overflow-hidden rounded-main relative group">
                                        <Image
                                            width={500}
                                            height={500}
                                            src={imgUrl}
                                            alt={product.productName || product.name || "Product"}
                                            className="w-full h-full duration-300 ease-in-out group-hover:scale-110 aspect-square rounded-main object-cover"
                                        />
                                        <div className="absolute top-2 left-2 group-hover:-translate-y-100 translate-y-0 duration-500">
                                            <p className="px-2 py-1 text-xs rounded-full bg-lightColor/50 text-darkColor font-semibold backdrop-blur-lg">
                                                <HighlightText
                                                    text={product.division || product.category || product.productCategory || "Product"}
                                                    searchTerm={searchTerm}
                                                />
                                            </p>
                                        </div>
                                        <div className="z-10 flex items-center justify-center absolute inset-0 backdrop-blur-[2px] bg-lightColor/40 dark:bg-darkColor/30 group-hover:opacity-100 opacity-0 duration-300"></div>
                                        <div className="z-20 group flex items-center justify-center absolute inset-0 bg-lightColor/50 dark:bg-darkColor/30 group-hover:opacity-100 opacity-0 duration-300">
                                            <div className="-translate-y-10 group-hover:translate-y-0 scale-90 group-hover:scale-100 ease-in-out duration-300 flex items-center gap-2">
                                                <Button
                                                    className="bg-green-600/50 dark:bg-green-200/70"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const whatsappLink = product.ctaLink ||
                                                            product.whatsappLink ||
                                                            product.link ||
                                                            `https://wa.me/6281234567890?text=Halo, saya tertarik dengan ${encodeURIComponent(product.productName || product.name)}`;
                                                        window.open(whatsappLink, '_blank');
                                                    }}
                                                >
                                                    <FaWhatsapp /> Contact
                                                </Button>
                                                <Button variant="glass">
                                                    Detail
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 space-y-2">
                                        <h1 className="font-medium line-clamp-2">
                                            <HighlightText
                                                text={product.productName || product.name}
                                                searchTerm={searchTerm}
                                            />
                                        </h1>
                                        {product.descriptions && showDesc === true && (
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                                <HighlightText
                                                    text={product.descriptions}
                                                    searchTerm={searchTerm}
                                                />
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
};