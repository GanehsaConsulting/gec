import Link from "next/link"
import Image from "next/image"
import { FaPaperPlane } from "react-icons/fa"
import { Title } from "./title-text"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { TbMail, TbMailFilled } from "react-icons/tb";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
import { IoIosCall } from "react-icons/io";

const dataContact = [
    {
        label: "Email",
        icon: <TbMailFilled />,
        data: "ganeshamultikreatif@gmail.com",
        link: "mailto:ganeshamultikreatif@gmail.com"
    },
    {
        label: "Email",
        icon: <TbMail />,
        data: "commercial@ganeshaconsulting.co.id",
        link: "mailto:commercial@ganeshaconsulting.co.id"
    },
    {
        label: "Phone",
        icon: <IoIosCall />,
        data: "+62 888 712 7000",
        link: "tel:628887127000"
    },
    {
        label: "Instagram",
        icon: <RiInstagramFill />,
        data: "@ganeshamultikreatif",
        link: "https://www.instagram.com/ganeshamultikreatif?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    },
    {
        label: "WhatsApp",
        icon: <RiWhatsappFill />,
        data: "+62 888 712 7000",
        link: "https://api.whatsapp.com/send?phone=628887127000&text=Halo%20Ganesha%20Consulting"
    },
];

export const ContactForm = () => {
    return (
        <section className="min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Section - Contact Info */}
                <div className="order-2 lg:order-1 px-4 sm:px-6 md:px-8 lg:margin pt-10 lg:pt-20 flex flex-col justify-between pb-10 lg:pb-20">
                    <div className="mb-8 lg:mb-0">
                        <Title className="!text-2xl sm:!text-3xl mb-6">
                            Get in Touch
                        </Title>
                        
                        {/* Mobile Contact Cards - Vertical Stack */}
                        <div className="flex flex-col gap-3 lg:hidden mb-6">
                            {dataContact.map((el, idx) => (
                                <Link
                                    href={el.link}
                                    key={idx}
                                    className="flex items-center gap-4 p-4 bg-white shadow-secondary dark:bg-darkColor rounded-main hover:shadow-lg transition-shadow"
                                >
                                    <div className="bg-radial from-transparent to-neutral-300 dark:to-secondaryDark w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0">
                                        <span className="text-xl">
                                            {el.icon}
                                        </span>
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
                    </div>
                    
                    {/* Desktop Contact Cards - Grid */}
                    <div className="hidden lg:flex flex-wrap gap-3">
                        {dataContact.map((el, idx) => (
                            <Link
                                href={el.link}
                                key={idx}
                                className="flex flex-col p-4 xl:p-5 bg-white shadow-secondary dark:bg-darkColor rounded-main gap-3 flex-1 min-w-[180px] hover:shadow-lg transition-shadow"
                            >
                                <div className="bg-radial from-transparent to-neutral-300 dark:to-secondaryDark w-fit h-fit p-3 rounded-full mb-6 xl:mb-10">
                                    <span className="text-2xl">
                                        {el.icon}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                                        {el.label}
                                    </p>
                                    <h3 className="text-base xl:text-lg font-semibold break-words">
                                        {el.data}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Section - Form with Background Image */}
                <div className="order-1 lg:order-2 relative min-h-[500px] sm:min-h-[600px] lg:min-h-screen">
                    <Image
                        width={700}
                        height={700}
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1599707254554-027aeb4deacd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742"
                        alt="Contact us image"
                    />
                    
                    {/* Form Overlay */}
                    <div className="absolute inset-0 bg-darkColor/30 flex items-center justify-center p-4 sm:p-6">
                        <div className="bg-white/50 dark:bg-black/40 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-main shadow-custom w-full max-w-md">
                            <Title className="!text-xl sm:!text-2xl">
                                Send Us Message
                            </Title>
                            
                            <form className="mt-4 sm:mt-6 flex flex-col gap-3 sm:gap-4">
                                {/* Name Input */}
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder=" "
                                        className="peer w-full pl-16 sm:pl-20 pr-3 py-2 sm:py-3 border border-darkColor/10 dark:border-lightColor/10 rounded-main bg-white dark:bg-darkColor/95 focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                                    />
                                    <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                        Name
                                    </p>
                                </div>

                                {/* Email Input */}
                                <div className="relative">
                                    <Input
                                        type="email"
                                        placeholder=" "
                                        className="peer w-full pl-16 sm:pl-20 pr-3 py-2 sm:py-3 border border-darkColor/10 dark:border-lightColor/10 rounded-main bg-white dark:bg-darkColor/95 focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                                    />
                                    <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                        Email
                                    </p>
                                </div>

                                {/* Phone Input */}
                                <div className="relative">
                                    <Input
                                        type="tel"
                                        placeholder=" "
                                        className="peer w-full pl-16 sm:pl-20 pr-3 py-2 sm:py-3 border border-darkColor/10 dark:border-lightColor/10 rounded-main bg-white dark:bg-darkColor/95 focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                                    />
                                    <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                        Phone
                                    </p>
                                </div>

                                {/* Message Textarea */}
                                <div className="relative">
                                    <Textarea
                                        rows="5"
                                        placeholder=" "
                                        className="peer w-full pl-20 sm:pl-24 pr-3 py-2 sm:py-3 resize-none border border-darkColor/10 dark:border-lightColor/10 rounded-main bg-white dark:bg-darkColor/95 focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                                    />
                                    <p className="absolute top-4 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                        Message
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <Button className="w-full flex items-center justify-center gap-2 py-2 sm:py-3">
                                    <FaPaperPlane className="text-sm" />
                                    <span>Send Message</span>
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}