"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { slugify } from "@/lib/slugify";

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

export const CardProducts = ({
    products = [], // Array of products data
    loading = false, // Loading state
    title = "Best Selling!",
    viewAllLink,
    mode = "carousel", // "carousel" atau "grid"
    showTitle = true,
    showArrows = true, // Hanya untuk mode carousel
    showDesc = true,
    gridCols = "md:grid-cols-4", // Konfigurasi grid columns
    sourcePath = "" // Base path untuk product URL
}) => {
    const [carouselRef, setCarouselRef] = useState(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    // Auto switch ke grid jika products kurang dari 5
    const effectiveMode = (!loading && products?.length < 5) ? "grid" : mode;

    const updateCarouselPosition = () => {
        if (carouselRef) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef;
            setIsAtStart(scrollLeft <= 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
        }
    };

    // Handle empty state
    if (!loading && (!products || products.length === 0)) {
        return (
            <section className="my-10">
                <div className="margin">
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

    // CAROUSEL MODE
    if (effectiveMode === "carousel") {
        return (
            <main className="mt-10">
                <div className="margin flex items-center justify-between mb-4">
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
                        <div className="space-x-2">
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
                            {[...Array(3)].map((_, idx) => (
                                <div key={idx} className={`${idx === 0 && "md:ml-10 ml-4"}`}>
                                    <CardSkeleton />
                                </div>
                            ))}
                        </>
                    ) : (
                        products.map((product, idx) => {
                            const productSlug = product.slug || slugify(product.productName || product.name || '');
                            const productPath = slugify(product.division) || sourcePath?.replace("/", "") || "";
                            const productUrl = `/${productPath}/${productSlug}`;
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
                                            {product.productName || product.name}
                                        </h1>
                                        {product.descriptions && showDesc === true && (
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                                {product.descriptions}
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
        <section className="my-10">
            <div className="margin">
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
                            const productUrl = `/${productPath}/${productSlug}`;
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
                                            <p className="px-2 py-1 text-xs rounded-full bg-darkColor/10 text-darkColor font-semibold backdrop-blur-lg">
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
                                            {product.productName || product.name}
                                        </h1>
                                        {product.descriptions && showDesc === true && (
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                                {product.descriptions}
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