"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { FaPaperPlane } from "react-icons/fa"
import { Title } from "./title-text"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { TbMailFilled } from "react-icons/tb"
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri"
import { IoIosCall } from "react-icons/io"

const dataContact = [
    {
        label: "Email",
        icon: <TbMailFilled />,
        data: "info@ganeshaec.co.id",
        link: "mailto:info@gec.co.id"
    },
    {
        label: "Phone",
        icon: <IoIosCall />,
        data: "0887 151 0045",
        link: "tel:08871510045"
    },
    {
        label: "Instagram",
        icon: <RiInstagramFill />,
        data: "@ganeshaec.co.id",
        link: "https://www.instagram.com/ganeshaec.co.id"
    },
    {
        label: "WhatsApp",
        icon: <RiWhatsappFill />,
        data: "+62 888 712 7000",
        link: "https://api.whatsapp.com/send?phone=08871510045"
    },
];

export const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ loading: false, success: true, error: null });
                setFormData({ name: '', email: '', phone: '', message: '' });
                
                // Reset success message setelah 5 detik
                setTimeout(() => {
                    setStatus({ loading: false, success: false, error: null });
                }, 5000);
            } else {
                setStatus({ 
                    loading: false, 
                    success: false, 
                    error: data.error || 'Failed to send message' 
                });
            }
        } catch (error) {
            setStatus({ 
                loading: false, 
                success: false, 
                error: 'Network error. Please try again.' 
            });
        }
    };

    return (
        <section className="min-h-screen">
            <Image
                width={700}
                height={700}
                className="w-full h-[50lvh] max-h-screen object-cover"
                src="https://images.unsplash.com/photo-1599707254554-027aeb4deacd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742"
                alt="Contact us image"
            />

            <div className="margin flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 spacing gap-5">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter text-balance pb-1">
                        <span className="text-neutral-500 dark:text-neutral-300">
                            Get In
                        </span>
                        <br />
                        <span className="">
                            Touch
                        </span>
                    </h1>

                    <div className="space-y-5">
                        <p>
                            GEC selalu terbuka untuk komunikasi dan kolaborasi. Hubungi kami untuk berdiskusi tentang proyek, layanan, atau solusi teknik yang sesuai dengan kebutuhan Anda.
                        </p>
                        <Link href={dataContact[3].link}>
                            <Button>
                                <RiWhatsappFill className="text-lg" />
                                Contact Now
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Contact Cards */}
                <div className="flex flex-col gap-3 lg:hidden mb-3">
                    {dataContact.map((el, idx) => (
                        <Link
                            href={el.link}
                            key={idx}
                            className="flex items-center gap-4 p-4 bg-white shadow-secondary dark:bg-darkColor rounded-main hover:shadow-lg transition-shadow"
                        >
                            <div className="bg-radial from-transparent to-neutral-300 dark:to-secondaryDark w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0">
                                <span className="text-xl">{el.icon}</span>
                            </div>
                            <div className="flex flex-col items-start min-w-0">
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                                    {el.label}
                                </p>
                                <h3 className="text-sm sm:text-base font-semibold truncate w-full">
                                    {el.data}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Desktop Contact Cards */}
                <div className="hidden md:flex flex-wrap gap-3">
                    {dataContact.map((el, idx) => (
                        <Link
                            href={el.link}
                            key={idx}
                            className="grow flex flex-col justify-between p-5 rounded-3xl dark:bg-darkColor bg-neutral-200 hover:invert duration-300 ease-in-out hover:-translate-y-3 origin-bottom hover:shadow-mainShadow"
                        >
                            <div className="bg-radial from-transparent to-neutral-300 dark:to-secondaryDark w-fit h-fit p-3 rounded-full mb-6 xl:mb-10">
                                <span className="text-2xl">{el.icon}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="font-medium text-lg md:text-xl">
                                    {el.label}
                                </h1>
                                <h2 className="font-bold text-xl bg-gradient-to-br dark:from-other2 dark:via-neutral-200 dark:to-neutral-100 from-other2 via-darkColor to-darkColor bg-clip-text text-transparent">
                                    {el.data}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center margin mt-3">
                {/* Form */}
                <div className="bg-lightColor h-full flex justify-center items-start flex-col dark:bg-darkColor rounded-main w-full p-6">
                    <Title className="!text-xl sm:!text-2xl mb-3">
                        Send Us Message
                    </Title>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Ada pertanyaan, ide, atau kebutuhan kerja sama? Tulis pesan Anda di bawah, kami akan dengan senang hati menanggapinya secepat mungkin.
                    </p>

                    {/* Status Messages */}
                    {status.success && (
                        <div className="w-full mb-4 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-main">
                            Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
                        </div>
                    )}
                    
                    {status.error && (
                        <div className="w-full mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-main">
                            {status.error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-4 sm:mt-6 flex flex-col gap-3 sm:gap-4 w-full">
                        {/* Name Input */}
                        <div className="relative">
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                className="peer w-full pl-16 sm:pl-20 pr-3 py-2 sm:py-3 border border-darkColor/10 dark:border-lightColor/10 rounded-main bg-white dark:bg-black/95 focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                            />
                            <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                Name
                            </p>
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                className="peer w-full pl-16 sm:pl-20 pr-3 py-2 sm:py-3 border border-darkColor/10 dark:border-lightColor/10 rounded-main bg-white dark:bg-black/95 focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                            />
                            <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                Email
                            </p>
                        </div>

                        {/* Phone Input */}
                        <div className="relative">
                            <Input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full pl-16 sm:pl-20 pr-3 py-2 sm:py-3 border border-darkColor/10 dark:border-lightColor/10 rounded-main bg-white dark:bg-black/95 focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                            />
                            <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                Phone
                            </p>
                        </div>

                        {/* Message Textarea */}
                        <div className="relative">
                            <Textarea
                                rows="5"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                className="peer w-full pl-20 sm:pl-24 pr-3 py-2 sm:py-3 resize-none border border-darkColor/10 dark:border-lightColor/10 rounded-main bg-white dark:bg-black/95 focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                            />
                            <p className="absolute top-4 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                Message
                            </p>
                        </div>

                        {/* Submit Button */}
                        <Button 
                            type="submit"
                            disabled={status.loading}
                            className="w-full flex items-center justify-center gap-2 py-2 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status.loading ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <FaPaperPlane className="text-sm" />
                                    <span>Send Message</span>
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Map */}
                <div className="relative w-full h-[300px] md:h-[500px] rounded-parent overflow-hidden">
                    <div className="h-full roumded-main shadow-custom w-full overflow-hidden">
                        <div className="h-full rounded-main overflow-hidden">
                            <iframe
                                className="w-full h-full dark:invert dark:contrast-75"
                                src={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126905.92495660148!2d106.76783528258977!3d-6.288666645245213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3007a6e8e39%3A0xf83b477d03a6931f!2sGANESHA%20CONSULTING!5e0!3m2!1sid!2sid!4v1745989232101!5m2!1sid!2sid'}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}