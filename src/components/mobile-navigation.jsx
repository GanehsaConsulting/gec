'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiDotsHorizontal, HiHome, HiMenu, HiX } from "react-icons/hi";
import { HiMiniSquares2X2, HiMiniStar, HiPhone } from "react-icons/hi2";
import {
    TbBuildingWarehouse,
    TbCircuitResistor,
    TbBuildingFactory,
    TbPick,
    TbBuildingBridge,
    TbDroplet,
    TbPlant2,
    TbWall,
    TbInfoCircle,
    TbBoxMultiple,
    TbBriefcase,
    TbNews,
    TbStar,
    TbPhone
} from 'react-icons/tb';
import ThemeSwitch from "./theme";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export const MobileNavigation = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigation = [
        {
            label: "Home",
            link: "/",
            icon: <HiHome />,
        },
        {
            label: "Products",
            link: "/product",
            icon: <HiMiniSquares2X2 />,
        },
        {
            label: "Projects",
            link: "/project",
            icon: <HiMiniStar />,
        },
        {
            label: "Contact",
            link: "/contact",
            icon: <HiPhone />,
        },
    ];

    const megaMenuItems = {
        company: [
            { label: 'About Us', href: '/about-us', icon: <TbInfoCircle /> },
            { label: 'Our Projects', href: '/project', icon: <TbStar /> },
            { label: 'All Products', href: '/product', icon: <TbBoxMultiple /> },
            { label: 'Contact Us', href: '/contact', icon: <TbPhone /> },
            { label: 'News & Blog', href: '/news', icon: <TbNews /> },
        ],
        services: [
            { label: 'Infrastructure Development', href: '/services/infrastructure', icon: <TbBuildingWarehouse /> },
            { label: 'Mechanical & Electrical', href: '/services/mechanical-electrical', icon: <TbCircuitResistor /> },
            { label: 'Factory Installation', href: '/services/factory-installation', icon: <TbBuildingFactory /> },
            { label: 'Post-Mining Reclamation', href: '/services/reclamation', icon: <TbPick /> },
        ],
        products: [
            { label: 'Infrastructure Products', href: '/product?division=Infrastruktur', icon: <TbBuildingBridge /> },
            { label: 'Hydraulic Works', href: '/product?division=Hydraulic Works', icon: <TbDroplet /> },
            { label: 'Erosion Control', href: '/product?division=Erosion Control', icon: <TbPlant2 /> },
            { label: 'Retaining Walls', href: '/product?division=Retaining Walls And Soil Reinforcement', icon: <TbWall /> },
        ],
    };

    const isActive = (link) => {
        if (link === "/") {
            return pathname === link;
        }
        return pathname.startsWith(link);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* Mega Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-lg z-886 animate-in fade-in duration-200"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mega Menu Content */}
            <div
                className={`md:hidden fixed left-3 right-3 z-887 transition-all duration-300 ease-in-out ${isMenuOpen
                    ? 'bottom-[72px] opacity-100 translate-y-0'
                    : 'bottom-[-100%] opacity-0 translate-y-8 pointer-events-none'
                    }`}
                style={{ maxHeight: "calc(100vh - 8rem)" }}
            >
                <div className="bg-lightColor/30 dark:bg-darkColor/30 rounded-3xl border border-darkColor/15 dark:border-lightColor/15 shadow-2xl h-full overflow-y-auto no-scrollbar">
                    {/* Header */}
                    <div className="sticky top-0 p-1.5 z-10">
                        <div className="bg-lightColor/50 dark:bg-darkColor/50 backdrop-blur-sm px-4 sm:px-5 py-3 sm:py-4 border-b border-darkColor/10 dark:border-lightColor/10 flex items-center justify-between rounded-[18px] border">
                            <h3 className="font-semibold text-base sm:text-lg">Menu</h3>
                            <div className="flex items-center gap-2 sm:gap-4">
                                <Link
                                    href="https://www.instagram.com/ganeshamultikreatif"
                                    target="_blank"
                                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-darkColor/10 dark:hover:bg-lightColor/10 transition-colors"
                                >
                                    <FaInstagram className="text-lg sm:text-xl" />
                                </Link>
                                <Link
                                    href="https://api.whatsapp.com/send?phone=628887127000"
                                    target="_blank"
                                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-darkColor/10 dark:hover:bg-lightColor/10 transition-colors"
                                >
                                    <FaWhatsapp className="text-lg sm:text-xl" />
                                </Link>
                                <ThemeSwitch />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
                        {/* Company Section */}
                        <div>
                            <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 sm:mb-3 px-2">
                                Company
                            </h4>
                            <div className="space-y-1">
                                {megaMenuItems.company.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        onClick={handleLinkClick}
                                        className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl transition-all ${isActive(item.href)
                                            ? 'bg-darkColor/10 dark:bg-lightColor/10'
                                            : 'hover:bg-darkColor/5 dark:hover:bg-lightColor/5'
                                            }`}
                                    >
                                        <div className={`text-lg sm:text-xl flex-shrink-0 ${isActive(item.href)
                                            ? ''
                                            : 'text-neutral-600 dark:text-neutral-400'
                                            }`}>
                                            {item.icon}
                                        </div>
                                        <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Products Section */}
                        <div className="pb-2">
                            <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 sm:mb-3 px-2">
                                Products
                            </h4>
                            <div className="space-y-1">
                                {megaMenuItems.products.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        onClick={handleLinkClick}
                                        className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl transition-all ${isActive(item.href)
                                            ? 'bg-darkColor/10 dark:bg-lightColor/10'
                                            : 'hover:bg-darkColor/5 dark:hover:bg-lightColor/5'
                                            }`}
                                    >
                                        <div className={`text-lg sm:text-xl flex-shrink-0 ${isActive(item.href)
                                            ? ''
                                            : 'text-neutral-600 dark:text-neutral-400'
                                            }`}>
                                            {item.icon}
                                        </div>
                                        <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="md:hidden fixed bottom-3 left-4 right-4 z-888 flex items-center justify-between gap-1.5 sm:gap-2">
                {/* Navigation Items Container */}
                <div className="flex flex-1 items-center justify-around bg-lightColor/40 dark:bg-darkColor/20 backdrop-blur-sm px-[4px] sm:px-[4px] py-[4px] rounded-full border border-darkColor/15 dark:border-lightColor/15 overflow-hidden">
                    {navigation.map((el, idx) => (
                        <Link
                            key={idx}
                            href={el.link}
                            onClick={handleLinkClick}
                            className={`flex flex-col items-center justify-center relative transition-all duration-200 py-1 rounded-full flex-1 min-w-0 ${isActive(el.link)
                                ? "bg-white/10 dark:bg-white/10 text-darkColor dark:text-lightColor"
                                : "text-darkColor/50 dark:text-lightColor/50"
                                }`}
                        >
                            <div className="w-fit text-[20px] sm:text-[24px] relative">
                                {el.icon}
                            </div>
                            <p className={`text-[8px] sm:text-[9px] font-medium transition-all truncate px-1 max-w-full ${isActive(el.link) ? "font-bold" : ""
                                }`}>
                                {el.label}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Menu Toggle Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex-shrink-0"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    <div className={`flex items-center justify-center text-[24px] sm:text-[28px] bg-lightColor/40 dark:bg-darkColor/20 backdrop-blur-sm p-2.5 sm:p-3 aspect-square rounded-full border border-darkColor/15 dark:border-lightColor/15 transition-all ${isMenuOpen
                        ? 'bg-mainColorLight/20 dark:bg-mainColorDark/20'
                        : 'text-darkColor/60 dark:text-lightColor/60 hover:scale-105'
                        }`}>
                        <HiDotsHorizontal className={`transition-transform duration-300 ${!isMenuOpen ? 'block' : 'hidden'}`} />
                        <HiX className={`${isMenuOpen ? 'block rotate-90' : 'hidden'}`} />
                    </div>
                </button>
            </div>

            {/* Bottom Blur Effect */}
            <div className="md:hidden z-885 fixed -bottom-2 left-0 right-0 linear-blur-to-t w-full h-[15lvh] bg-darkColor/25 pointer-events-none"></div>
        </>
    );
};