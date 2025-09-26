'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import ThemeSwitch from './theme';
import { MegaMenuNavbar } from './mega-menu';
import { HiSquares2X2 } from 'react-icons/hi2';
import { ServicesMenu } from './services-menu';

export const Navbar = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [expandedId, setExpandedId] = useState(null);
    const path = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {isScrolled && (
                <>
                    <div className="fixed top-0 left-0 right-0 h-27 z-40 w-auto pointer-events-none linear-blur-navbar bg-gradient-to-b from-lightColor/15 dark:from-darkColor/20 to-transparent" />
                </>
            )}
            <div className={`${isScrolled ? "" : "mt-0"} navbar fixed 2xl:px-80 md:px-24 w-full z-[100] ease-in-out duration-300 text-[14px] md:flex justify-center gap-2 hidden `}>
                <li className='relative flex flex-col items-center group'>
                    <Link
                        href={'/'}
                        className={`shadow-custom border border-darkColor/10 dark:border-lightColor/10 bg-secondaryLight/65 dark:bg-darkColor/50 backdrop-blur-xs z-[555] flex items-center -ml-[11px] p-[5px] pr-2 text-gray-800 dark:text-white rounded-main hover:bg-darkColor/5 dark:hover:bg-lightColor/5 duration-200 ease-in-out`}
                        aria-current="page"
                    >
                        <Image
                            width={30}
                            height={30}
                            className="dark:invert"
                            src="/gec-black.png"
                            alt="GEC Logo"
                        />
                        <div className='w-[1px] h-6 bg-black dark:bg-white rounded-secondary mx-1'></div>
                        <div className='pl-1 -space-y-1 mr-1 dark:contrast-80 dark:brightness-125'>
                            <h1 className='font-montserrat font-semibold bg-gradient-to-br from-black via-darkColor to-black dark:from-white dark:via-lightColor dark:to-secondaryLight w-fit text-transparent bg-clip-text'>
                                Ganesha
                            </h1>
                            <p className='font-montserrat text-[10px] text-secondaryDark dark:text-lightColor'>
                                Engineering & Consturctions
                            </p>
                        </div>

                    </Link>
                    <span className={`${path === '/' ? 'scale-100' : 'scale-0'} -ml-[11px] absolute bottom-[3px] w-[3px] h-[3px] ease-in-out duration-300 group-hover:scale-100 scale-0 dark:bg-lightColor bg-darkColor rounded-secondary`}></span>
                </li>
                <div className="px-1 relative navbar-center hidden lg:flex">

                    {/* Wrapper */}
                    <div className={`absolute backdrop-blur-xs border border-darkColor/10 dark:border-lightColor/10 px-24 py-5 dark:bg-secondaryDark/50 bg-secondaryLight/65 rounded-main w-full h-[35px] -z-[100] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-custom`}></div>

                    <ul className="flex items-center flex-col ml-[1px] p-4 md:p-0 mt-4 font-medium md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 text-[14px]">
                        {/* Menu */}
                        <MegaMenuNavbar
                            id="produk"
                            title="Produk & Layanan"
                            expandedId={expandedId}
                            setExpandedId={setExpandedId}
                        >
                            <ServicesMenu expandedId={expandedId} />
                        </MegaMenuNavbar>

                        <li className='relative flex flex-col items-center group'>
                            <Link
                                href={'/post'}
                                className={`z-[555] block py-[6px] px-3 items-center text-gray-800 dark:text-white rounded-secondary hover:bg-darkColor/5 dark:hover:bg-lightColor/5 duration-200 ease-in-out`}
                                aria-current="page"
                            >
                                Aktifitas & Artikel
                            </Link>
                            <span className={`${path.startsWith('/activity') ? 'scale-100' : 'scale-0'} absolute bottom-[4px] w-[15px] h-[2px] ease-in-out duration-300 group-hover:scale-100 scale-0 dark:bg-lightColor bg-darkColor rounded-secondary`}></span>
                        </li>
                        <li className='relative flex flex-col items-center group'>
                            <Link
                                href={'/tentang-kami'}
                                className={`z-[555] block py-[6px] px-3 items-center text-gray-800 dark:text-white rounded-secondary hover:bg-darkColor/5 dark:hover:bg-lightColor/5 duration-200 ease-in-out`}
                                aria-current="page"
                            >
                                Tentang Kami
                            </Link>
                            <span className={`${path.startsWith('/activity') ? 'scale-100' : 'scale-0'} absolute bottom-[4px] w-[15px] h-[2px] ease-in-out duration-300 group-hover:scale-100 scale-0 dark:bg-lightColor bg-darkColor rounded-secondary`}></span>
                        </li>
                    </ul>
                    <div className='ml-1 flex items-center gap-3 py-1.5 px-1.5 mr-[1.5px] bg-darkColor/5 dark:bg-lightColor/10 rounded-secondary'>
                        <ThemeSwitch />
                    </div>
                </div>
                <div className="flex items-center gap-2 space-x-2">
                    <Link
                        href='/contact'
                        className={`flex items-center `}
                    >
                        <span className='border border-darkColor/10 dark:border-lightColor/10 md:block hidden font-semibold text-neutral-800 dark:text-white bg-secondaryLight/65 dark:bg-secondaryDark/50 backdrop-blur-xs shadow-custom hover:bg-mainColor hover:text-white ease-in-out duration-300 dark:hover:bg-secondaryColor px-4 py-2 rounded-main'>
                            Kontak
                        </span>
                    </Link>
                </div>
            </div>
            {/* Background Layer & Effect */}
            < div className={`hidden md:block fixed top-0 z-[80] ${expandedId ? "opacity-100 backdrop-blur-xl md:backdrop-blur-[10px] w-screen h-screen" : "opacity-0"} noBar bg-lightColor/60 dark:bg-darkColor/80 transition-opacity duration-300`} />
            < div className={`${expandedId ? "md:scale-105" : ""} noBar overflow-hidden md:transform md:origin-top md:transition-transform md:duration-500 md:ease-in-out`}>
                {children}
            </div >
        </>

    );
};
