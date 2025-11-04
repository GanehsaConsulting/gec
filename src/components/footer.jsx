"use client"
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaLinkedin, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { HiChevronRight } from 'react-icons/hi2';
import {
    TbBuildingWarehouse,
    TbCircuitResistor,
    TbBuildingFactory,
    TbPick,
    TbBuildingBridge,
    TbDroplet,
    TbPlant2,
    TbWall
} from 'react-icons/tb';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { label: 'About Us', href: '/about-us' },
            { label: 'Our Projects', href: '/project' },
            { label: 'All Products', href: '/product', },
            { label: 'Contact Us', href: '/contact' },
        ],
        services: [
            { label: 'Infrastructure Development', href: '/services/infrastructure', icon: TbBuildingWarehouse },
            { label: 'Mechanical & Electrical', href: '/services/mechanical-electrical', icon: TbCircuitResistor },
            { label: 'Factory Installation', href: '/services/factory-installation', icon: TbBuildingFactory },
            { label: 'Post-Mining Reclamation', href: '/services/reclamation', icon: TbPick },
        ],
        products: [
            { label: 'Infrastructure Products', href: '/product?division=Infrastruktur', icon: TbBuildingBridge },
            { label: 'Hydraulic Works', href: '/product?division=Hydraulic Works', icon: TbDroplet },
            { label: 'Erosion Control', href: '/product?division=Erosion Control', icon: TbPlant2 },
            { label: 'Retaining Walls', href: '/product?division=Retaining Walls And Soil Reinforcement', icon: TbWall },
            { label: 'All Products', href: '/product' },
        ],
        support: [
            { label: 'Contact Us', href: '/contact' },
            { label: 'Documentation', href: '/project' },
            { label: 'Product Catalog', href: '/product' },
        ],
    };

    const legalLinks = [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Disclaimer', href: '/disclaimer' },
    ];

    const socialLinks = [
        {
            icon: FaWhatsapp,
            href: 'https://wa.me/08871510045',
            label: 'WhatsApp',
            color: 'dark:hover:text-green-500 hover:text-green-500',
            bgHover: 'dark:hover:bg-green-300/20 hover:bg-green-500/10'
        },
        {
            icon: FaInstagram,
            href: 'https://instagram.com/gec_official',
            label: 'Instagram',
            color: 'dark:hover:text-pink-500 hover:text-pink-500',
            bgHover: 'dark:hover:bg-pink-300/20 hover:bg-pink-500/10'
        },
        {
            icon: FaLinkedin,
            href: 'https://linkedin.com/company/gec',
            label: 'LinkedIn',
            color: 'dark:hover:text-blue-500 hover:text-blue-500',
            bgHover: 'dark:hover:bg-blue-300/20 hover:bg-blue-500/10'
        },
        {
            icon: FaFacebook,
            href: 'https://facebook.com/ganeshaec.co.id',
            label: 'Facebook',
            color: 'dark:hover:text-blue-500 hover:text-blue-600',
            bgHover: 'dark:hover:bg-blue-300/20 hover:bg-blue-600/10'
        },
    ];

    const contactInfo = [
        { icon: FaPhone, text: '0887 1510 045', href: 'tel:08871510045' },
        { icon: FaEnvelope, text: 'info@gec.co.id', href: 'mailto:info@gec.co.id' },
        { icon: FaMapMarkerAlt, text: 'Jakarta, Indonesia', href: 'https://maps.google.com' },
    ];

    return (
        <footer className="pt-12 md:pt-16 pb-20">
            <div className="margin px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-12">
                    {/* Company Info - Full width on mobile, 4 columns on large screens */}
                    <div className="sm:col-span-2 lg:col-span-4">
                        <Link href="/" className="inline-block mb-4">
                            <div className="flex items-center gap-2">
                                {/* Logo */}
                                <Image
                                    width={200}
                                    height={100}
                                    className='w-12 h-12 sm:w-15 sm:h-15 object-cover -ml-1 dark:block hidden'
                                    src="/gec-white.png"
                                    alt="GEC Logo"
                                />
                                <Image
                                    width={200}
                                    height={100}
                                    className='w-12 h-12 sm:w-15 sm:h-15 object-cover -ml-1 dark:hidden block'
                                    src="/gec-black.png"
                                    alt="GEC Logo"
                                />

                                <div className="flex flex-col">
                                    <span className="font-bold text-xl sm:text-2xl leading-tight">Ganesha</span>
                                    <span className="text-xs sm:text-sm">Engineering & Consturctions</span>
                                </div>
                            </div>
                        </Link>

                        {/* Contact Info */}
                        <div className="space-y-2.5 mt-6">
                            {contactInfo.map((contact, idx) => {
                                const Icon = contact.icon;
                                return (
                                    <Link
                                        key={idx}
                                        href={contact.href}
                                        className="flex items-center gap-3 text-sm hover:text-mainColorLight dark:hover:text-mainColorDark transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-lightColor/70 dark:bg-darkColor/70 flex items-center justify-center group-hover:bg-mainColorLight/10 dark:group-hover:bg-mainColorDark/10 transition-colors flex-shrink-0">
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <span className="break-words">{contact.text}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links Grid - Responsive layout */}
                    <div className='sm:col-span-2 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>

                        {/* Company Links */}
                        <div>
                            <h3 className="text-neutral-500/90 dark:text-neutral-400 font-base mb-3 sm:mb-4 text-sm capitalize tracking-tight">
                                Company
                            </h3>
                            <ul className="space-y-2.5 group">
                                {footerLinks.company.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="flex items-center gap-1 text-sm text-black dark:text-white transition-all group-hover:[&:not(:hover)]:text-gray-400 hover:text-mainColorLight dark:hover:text-mainColorDark"
                                        >
                                            <span>{link.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Products Links */}
                        <div>
                            <h3 className="text-neutral-500/90 dark:text-neutral-400 font-base mb-3 sm:mb-4 text-sm capitalize tracking-tight">
                                Products
                            </h3>
                            <ul className="space-y-2.5 group">
                                {footerLinks.products.map((link) => {
                                    return (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="flex items-center gap-1 text-sm text-black dark:text-white transition-all group-hover:[&:not(:hover)]:text-gray-400 hover:text-mainColorLight dark:hover:text-mainColorDark"
                                            >
                                                <span className="transition-transform">{link.label}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div>
                            <h3 className="text-neutral-500/90 dark:text-neutral-400 font-base mb-3 sm:mb-4 text-sm capitalize tracking-tight">
                                Support
                            </h3>
                            <ul className="space-y-2.5 group">
                                {footerLinks.support.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="flex items-center gap-1 text-sm text-black dark:text-white transition-all group-hover:[&:not(:hover)]:text-gray-400 hover:text-mainColorLight dark:hover:text-mainColorDark"
                                        >
                                            <span>{link.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-neutral-200 dark:border-neutral-800 mb-8"></div>

                {/* Bottom Bar */}
                <div>
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        {/* Copyright */}
                        <div className="text-center lg:text-left uppercase opacity-60 order-2 lg:order-1">
                            <p className="text-xs sm:text-sm">
                                © {currentYear} GEC All rights reserved.
                            </p>
                            <p className="text-xs mt-1">
                                By PT Ganesha Multi Kreatif
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-2 opacity-50 order-1 lg:order-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all text-neutral-900 dark:text-neutral-100 ${social.color} ${social.bgHover}`}
                                        aria-label={social.label}
                                    >
                                        <Icon className="h-5 w-5 dark:group-" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};