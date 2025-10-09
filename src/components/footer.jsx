"use client"
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
      { label: 'About Us', href: '/about' },
      { label: 'Why Choose Us', href: '/why-us' },
      { label: 'Our Projects', href: '/projects' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog & News', href: '/blog' },
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
      { label: 'Request Quote', href: '/quote' },
      { label: 'Technical Support', href: '/support' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Product Catalog', href: '/catalog' },
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
      href: 'https://wa.me/6281234567890', 
      label: 'WhatsApp', 
      color: 'hover:text-green-500',
      bgHover: 'hover:bg-green-500/10'
    },
    { 
      icon: FaInstagram, 
      href: 'https://instagram.com/gec_official', 
      label: 'Instagram', 
      color: 'hover:text-pink-500',
      bgHover: 'hover:bg-pink-500/10'
    },
    { 
      icon: FaLinkedin, 
      href: 'https://linkedin.com/company/gec', 
      label: 'LinkedIn', 
      color: 'hover:text-blue-500',
      bgHover: 'hover:bg-blue-500/10'
    },
    { 
      icon: FaFacebook, 
      href: 'https://facebook.com/gec.official', 
      label: 'Facebook', 
      color: 'hover:text-blue-600',
      bgHover: 'hover:bg-blue-600/10'
    },
  ];

  const contactInfo = [
    { icon: FaPhone, text: '+62 812-3456-7890', href: 'tel:+6281234567890' },
    { icon: FaEnvelope, text: 'info@gec.co.id', href: 'mailto:info@gec.co.id' },
    { icon: FaMapMarkerAlt, text: 'Jakarta, Indonesia', href: 'https://maps.google.com' },
  ];

  return (
    <footer className="bg-neutral-900 dark:bg-black text-neutral-300 pt-16 pb-6">
      <div className="margin">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Company Info - Spans 4 columns */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                {/* Logo */}
                <div className="w-12 h-12 bg-gradient-to-br from-mainColorLight to-mainColorDark rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">G</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl leading-tight">GEC</span>
                  <span className="text-xs text-neutral-400">Ganesha Engineering</span>
                </div>
              </div>
            </Link>
            
            <p className="text-sm leading-relaxed mb-4 text-neutral-400">
              GEC (Ganesha Engineering & Construction) adalah brand dari PT Ganesha Multi Kreatif yang menyediakan solusi holistik untuk pembangunan infrastruktur, pengadaan teknis, instalasi pabrik, dan reklamasi pasca tambang.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-lg bg-neutral-800 dark:bg-neutral-900 flex items-center justify-center transition-all ${social.color} ${social.bgHover}`}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="space-y-2.5">
              {contactInfo.map((contact, idx) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={idx}
                    href={contact.href}
                    className="flex items-center gap-3 text-sm text-neutral-400 hover:text-mainColorLight dark:hover:text-mainColorDark transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-neutral-800 dark:bg-neutral-900 flex items-center justify-center group-hover:bg-mainColorLight/10 dark:group-hover:bg-mainColorDark/10 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span>{contact.text}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-mainColorLight dark:hover:text-mainColorDark transition-colors flex items-center gap-1 group"
                  >
                    <HiChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-mainColorLight dark:hover:text-mainColorDark transition-colors flex items-center gap-2 group"
                    >
                      {Icon && <Icon className="h-4 w-4 opacity-50 group-hover:opacity-100" />}
                      <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Products Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Products</h3>
            <ul className="space-y-2.5">
              {footerLinks.products.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-mainColorLight dark:hover:text-mainColorDark transition-colors flex items-center gap-2 group"
                    >
                      {Icon && <Icon className="h-4 w-4 opacity-50 group-hover:opacity-100" />}
                      <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-mainColorLight dark:hover:text-mainColorDark transition-colors flex items-center gap-1 group"
                  >
                    <HiChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-neutral-800 dark:border-neutral-900 pt-10 pb-10">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-white font-bold text-xl mb-2">Stay Connected with GEC</h3>
            <p className="text-sm text-neutral-400 mb-6">
              Subscribe to our newsletter for the latest product updates, project insights, and industry news.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-lg bg-neutral-800 dark:bg-neutral-900 border border-neutral-700 dark:border-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-mainColorLight dark:focus:ring-mainColorDark focus:border-transparent transition-all"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-mainColorLight to-mainColorDark text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 dark:border-neutral-900 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-neutral-400">
                © {currentYear} <span className="text-white font-semibold">GEC - Ganesha Engineering & Construction</span>. All rights reserved.
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                A brand of PT Ganesha Multi Kreatif
              </p>
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500">
              {legalLinks.map((link, idx) => (
                <span key={link.label} className="flex items-center gap-4">
                  <Link 
                    href={link.href}
                    className="hover:text-mainColorLight dark:hover:text-mainColorDark transition-colors"
                  >
                    {link.label}
                  </Link>
                  {idx < legalLinks.length - 1 && (
                    <span className="text-neutral-700">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Made with love */}
            <div className="text-sm text-neutral-500">
              <span>Made with </span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span> in Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};