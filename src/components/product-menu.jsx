"use client";

import Link from "next/link";
import { productDivisions } from "./system";
import { TbAsterisk, TbBlocks, TbChevronRight, TbSearch } from "react-icons/tb";
import { useState } from "react";
import Image from "next/image";
import { slugify } from "@/lib/slugify";
import { Button } from "./ui/button";

export const ProductMenu = ({ expandedId }) => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [searchQuery, setSearchQuery] = useState("");

    const expandAnimationClass = expandedId
        ? "scale-100 -translate-y-0 opacity-100 duration-500 ease-in-out"
        : "scale-[.90] -translate-y-12 opacity-0 duration-500 ease-in-out";

    const handleMouseEnter = (idx) => {
        setHoveredCard(idx);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    const handleMouseMove = (e, idx) => {
        if (hoveredCard === idx) {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    // Filter products based on search
    const filteredDivisions = productDivisions.map(division => ({
        ...division,
        services: division.services.filter(service =>
            service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(division => division.services.length > 0);

    const displayDivisions = searchQuery ? filteredDivisions : productDivisions;

    // Index for "All Products" card
    const allProductsIdx = displayDivisions.length;

    return (
        <main className="space-y-5">
            <div className="grid grid-cols-10 gap-4">
                <div className="col-span-8 flex items-center justify-between gap-4">
                    <p
                        className={`${expandAnimationClass} text-xs font-semibold uppercase pr-3 pl-2 py-1 bg-darkColor/10 dark:bg-lightColor/15 rounded-main w-fit flex items-center gap-1`}
                    >
                        <TbAsterisk className="spin-slow" />
                        Produk & Layanan Kami
                    </p>

                    <div className={`${expandAnimationClass} relative`}>
                        <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-darkColor/50 dark:text-lightColor/50" />
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-100 pl-9 pr-3 py-1.5 text-xs font-medium bg-darkColor/10 dark:bg-lightColor/15 rounded-main focus:outline-none focus:ring-2 focus:ring-mainColor/50 dark:focus:ring-mainColor/30 transition-all duration-300 placeholder:text-darkColor/40 dark:placeholder:text-lightColor/40"
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <p
                        className={`${expandAnimationClass} text-xs font-semibold uppercase pr-3 pl-2 py-1 bg-darkColor/10 dark:bg-lightColor/15 rounded-main w-fit flex items-center gap-1`}
                    >
                        <TbAsterisk className="spin-slow" />
                        Insight
                    </p>
                </div>
            </div>

            <section className="grid grid-cols-10 gap-4">
                {/* Products cards */}
                <div className="col-span-8 grid grid-cols-4 gap-3">
                    {displayDivisions.length > 0 ? (
                        displayDivisions.map((el, idx) => (
                            <Link
                                key={idx}
                                href={`/product/${slugify(el.division)}`}
                                className={`${expandAnimationClass} relative overflow-hidden rounded-main cursor-pointer block h-fit`}
                                style={{ transitionDelay: `${idx * 50}ms` }}
                                onMouseEnter={() => handleMouseEnter(idx)}
                                onMouseLeave={handleMouseLeave}
                                onMouseMove={(e) => handleMouseMove(e, idx)}
                            >
                                {/* === BACKGROUND INTERACTION EFFECTS === */}
                                <div
                                    className={`absolute inset-0 rounded-main transition-all duration-300 ease-out ${hoveredCard === idx ? "opacity-100" : "opacity-0"
                                        }`}
                                    style={{
                                        background:
                                            hoveredCard === idx
                                                ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--main-color-rgb, 59, 130, 246), 0.15), transparent 40%)`
                                                : "transparent",
                                    }}
                                />

                                <div
                                    className={`absolute w-32 h-32 bg-mainColor blur-md rounded-full transition-all duration-300 ease-in-out pointer-events-none ${hoveredCard === idx
                                        ? "scale-150 opacity-100"
                                        : "scale-0 opacity-0"
                                        }`}
                                    style={{
                                        left: `${mousePosition.x}px`,
                                        top: `${mousePosition.y}px`,
                                        transform: `translate(-50%, -50%) ${hoveredCard === idx ? "scale(2.5)" : "scale(0)"
                                            }`,
                                        transformOrigin: "center",
                                        zIndex: 10,
                                    }}
                                />

                                <div
                                    className={`absolute w-32 h-32 rounded-full transition-all duration-200 ease-out pointer-events-none ${hoveredCard === idx ? "opacity-50" : "opacity-0"
                                        }`}
                                    style={{
                                        left: `${mousePosition.x - 64}px`,
                                        top: `${mousePosition.y - 64}px`,
                                        background:
                                            "radial-gradient(circle, rgba(var(--main-color-rgb, 59, 130, 246), 0.3) 0%, rgba(var(--main-color-rgb, 59, 130, 246), 0.1) 30%, transparent 70%)",
                                        filter: "blur(20px)",
                                        transform: hoveredCard === idx ? "scale(1)" : "scale(0.8)",
                                        zIndex: 5,
                                    }}
                                />

                                {/* Card Border Glow */}
                                <div
                                    className={`absolute inset-0 rounded-main transition-all duration-300 ease-out pointer-events-none ${hoveredCard === idx ? "opacity-100" : "opacity-0"
                                        }`}
                                    style={{
                                        background:
                                            hoveredCard === idx
                                                ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--main-color-rgb, 59, 130, 246), 0.4), transparent 60%)`
                                                : "transparent",
                                        padding: "1px",
                                        zIndex: 15,
                                    }}
                                />

                                {/* === CARD CONTENT === */}
                                <div className="z-20 bg-otherColor/50 dark:bg-otherColorDark/30 absolute -bottom-30 -right-30 blur-3xl w-50 h-50"></div>

                                <div className={`relative z-30 p-5 rounded-main border h-[280px] flex flex-col transition-all duration-300 ease-out 
                                ${hoveredCard === idx
                                        ? "border-mainColor/30 dark:border-mainColor/40 bg-lightColor/95 dark:bg-darkColor/95 backdrop-blur-xl transform scale-[1.02] shadow-2xl"
                                        : "border-darkColor/10 dark:border-lightColor/10 bg-lightColor/80 dark:bg-darkColor/80"
                                    }`}
                                >
                                    {/* Division Icon & Name - Horizontal layout */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div
                                            className={`text-3xl p-2.5 rounded-lg transition-all duration-300 ${hoveredCard === idx
                                                ? "bg-mainColor/20 dark:bg-mainColor/30 transform scale-110"
                                                : "bg-darkColor/5 dark:bg-lightColor/5"
                                                }`}
                                        >
                                            <el.icon />
                                        </div>
                                        <h1
                                            className={`text-base font-bold transition-all duration-300 ${hoveredCard === idx ? "transform translate-x-1" : ""
                                                }`}
                                        >
                                            <span
                                                className={`text-transparent bg-clip-text transition-all duration-300 ${hoveredCard === idx
                                                    ? "bg-gradient-to-r from-mainColor via-other1 to-secondaryDark dark:from-purple-200 dark:via-other2 dark:to-secondaryLight"
                                                    : "bg-gradient-to-r from-other1 to-secondaryDark dark:from-other2 dark:to-secondaryLight"
                                                    }`}
                                            >
                                                {el.division}
                                            </span>
                                        </h1>
                                    </div>

                                    {/* Products List - Always show 4 */}
                                    <div className="space-y-1 flex-grow overflow-y-scroll scrollbar-hover">
                                        {el.services.map((service, id) => (
                                            <div
                                                onClick={() => window.location.href = service.dedicatedPath || `/product/${slugify(el.division)}/${service.slug}`}
                                                key={id}

                                            >
                                                <p
                                                    className={`text-sm font-medium transition-all duration-300 line-clamp-1 hover:text-mainColor hover:text-md hover:font-bold dark:hover:text-purple-300`}
                                                >
                                                    {service.name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer with count and arrow */}
                                    <div className={`mt-4 pt-3 border-t flex items-center justify-between transition-all duration-300 ${hoveredCard === idx
                                        ? "border-mainColor/20 dark:border-mainColor/30"
                                        : "border-darkColor/10 dark:border-lightColor/10"
                                        }`}>
                                        {el.services.length > 4 ? (
                                            <p className={`text-[10px] font-semibold transition-all duration-300 ${hoveredCard === idx
                                                ? "text-mainColor dark:text-purple-300"
                                                : "text-darkColor/60 dark:text-lightColor/60"
                                                }`}>
                                                +{el.services.length - 4} produk lainnya
                                            </p>
                                        ) : (
                                            <p className={`text-[10px] font-semibold transition-all duration-300 ${hoveredCard === idx
                                                ? "text-mainColor dark:text-purple-300"
                                                : "text-darkColor/60 dark:text-lightColor/60"
                                                }`}>
                                                {el.services.length} produk
                                            </p>
                                        )}
                                        <TbChevronRight className={`transition-all duration-300 ${hoveredCard === idx
                                            ? "text-mainColor dark:text-purple-300 transform translate-x-1"
                                            : "text-darkColor/40 dark:text-lightColor/40"
                                            }`} />
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className={`${expandAnimationClass} col-span-4 flex flex-col gap-2 items-center justify-center min-h-[280px] `}>
                            <p className="text-sm text-darkColor/60 dark:text-lightColor/60">
                                Produk tidak ditemukan
                            </p>
                            <a href=""
                                className="px-3 py-2 dark:bg-lightColor/20 bg-darkColor/10 hover:bg-mainColor/20 dark:hover:bg-secondaryColor/20 rounded-full duration-300"
                            >
                                Cek Semua Produk
                            </a>
                        </div>
                    )}

                    {/* All Products Button with same styling */}
                    {!searchQuery && (
                        <Link
                            href={'/product'}
                            className={`${expandAnimationClass} relative overflow-hidden rounded-main cursor-pointer block h-[280px]`}
                            style={{ transitionDelay: `${allProductsIdx * 50}ms` }}
                            onMouseEnter={() => handleMouseEnter(allProductsIdx)}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={(e) => handleMouseMove(e, allProductsIdx)}
                        >
                            {/* === BACKGROUND INTERACTION EFFECTS === */}
                            <div
                                className={`absolute inset-0 rounded-main transition-all duration-300 ease-out ${hoveredCard === allProductsIdx ? "opacity-100" : "opacity-0"
                                    }`}
                                style={{
                                    background:
                                        hoveredCard === allProductsIdx
                                            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--main-color-rgb, 59, 130, 246), 0.15), transparent 40%)`
                                            : "transparent",
                                }}
                            />

                            <div
                                className={`absolute w-32 h-32 bg-mainColor blur-md rounded-full transition-all duration-300 ease-in-out pointer-events-none ${hoveredCard === allProductsIdx
                                    ? "scale-150 opacity-100"
                                    : "scale-0 opacity-0"
                                    }`}
                                style={{
                                    left: `${mousePosition.x}px`,
                                    top: `${mousePosition.y}px`,
                                    transform: `translate(-50%, -50%) ${hoveredCard === allProductsIdx ? "scale(2.5)" : "scale(0)"
                                        }`,
                                    transformOrigin: "center",
                                    zIndex: 10,
                                }}
                            />

                            <div
                                className={`absolute w-32 h-32 rounded-full transition-all duration-200 ease-out pointer-events-none ${hoveredCard === allProductsIdx ? "opacity-50" : "opacity-0"
                                    }`}
                                style={{
                                    left: `${mousePosition.x - 64}px`,
                                    top: `${mousePosition.y - 64}px`,
                                    background:
                                        "radial-gradient(circle, rgba(var(--main-color-rgb, 59, 130, 246), 0.3) 0%, rgba(var(--main-color-rgb, 59, 130, 246), 0.1) 30%, transparent 70%)",
                                    filter: "blur(20px)",
                                    transform: hoveredCard === allProductsIdx ? "scale(1)" : "scale(0.8)",
                                    zIndex: 5,
                                }}
                            />

                            {/* Card Border Glow */}
                            <div
                                className={`absolute inset-0 rounded-main transition-all duration-300 ease-out pointer-events-none ${hoveredCard === allProductsIdx ? "opacity-100" : "opacity-0"
                                    }`}
                                style={{
                                    background:
                                        hoveredCard === allProductsIdx
                                            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--main-color-rgb, 59, 130, 246), 0.4), transparent 60%)`
                                            : "transparent",
                                    padding: "1px",
                                    zIndex: 15,
                                }}
                            />

                            {/* === CARD CONTENT === */}
                            <div className="z-20 bg-otherColor/50 dark:bg-otherColorDark/30 absolute -bottom-30 -right-30 blur-3xl w-50 h-50"></div>

                            <div className={`relative z-30 p-5 rounded-main border h-full flex flex-col items-center justify-center transition-all duration-300 ease-out 
                        ${hoveredCard === allProductsIdx
                                    ? "border-mainColor/30 dark:border-mainColor/40 bg-lightColor/95 dark:bg-darkColor/95 backdrop-blur-xl transform scale-[1.02] shadow-2xl"
                                    : "border-darkColor/10 dark:border-lightColor/10 bg-lightColor/80 dark:bg-darkColor/80"
                                }`}
                            >
                                <div
                                    className={`text-2xl p-2.5 rounded-lg transition-all duration-300 mb-2 ${hoveredCard === allProductsIdx
                                        ? "bg-mainColor/20 dark:bg-mainColor/30 transform scale-110"
                                        : "bg-darkColor/5 dark:bg-lightColor/5"
                                        }`}
                                >
                                    <TbBlocks
                                    />
                                </div>
                                <h2 className={`text-2xl font-bold text-center transition-all duration-300 ${hoveredCard === allProductsIdx ? "transform scale-110" : ""
                                    }`}>
                                    <span className={`text-transparent bg-clip-text transition-all duration-300 ${hoveredCard === allProductsIdx
                                        ? "bg-gradient-to-r from-mainColor via-other1 to-secondaryDark dark:from-purple-200 dark:via-other2 dark:to-secondaryLight"
                                        : "bg-gradient-to-r from-other1 to-secondaryDark dark:from-other2 dark:to-secondaryLight"
                                        }`}>
                                        All Products
                                    </span>
                                </h2>
                                <p className={`mt-2 text-sm text-center transition-all duration-300 ${hoveredCard === allProductsIdx
                                    ? "text-mainColor dark:text-purple-300"
                                    : "text-darkColor/60 dark:text-lightColor/60"
                                    }`}>
                                    Lihat semua produk kami
                                </p>
                            </div>
                        </Link>
                    )}
                </div>

                {/* === SIDE IMAGE === */}
                <div
                    className={`${expandAnimationClass} col-span-2 max-h-[45vh] h-[45vh] relative overflow-hidden rounded-main group cursor-pointer`}
                >
                    <Image
                        width={500}
                        height={500}
                        className="w-full h-full rounded-main object-cover"
                        src="https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=2070&auto=format&fit=crop"
                        alt="Our Latest Project"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-30 pointer-events-none linear-blur z-10" />
                    <div className="absolute bottom-3 left-3 right-3 z-20">
                        <div className="px-3 py-1 w-fit backdrop-blur-2xl bg-lightColor/50 dark:bg-darkColor/50 rounded-main">
                            <h1 className="text-lg font-semibold">Our Latest Project</h1>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};