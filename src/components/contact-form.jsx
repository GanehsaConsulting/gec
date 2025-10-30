import { FaPaperPlane } from "react-icons/fa"
import { Title } from "./title"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import Image from "next/image"
import { TbMail, TbMailFilled } from "react-icons/tb";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
import { IoIosCall } from "react-icons/io";
import Link from "next/link"

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
        <>
            <section className="">
                <div className="grid grid-cols-2 min-h-screen">
                    <div className="margin pt-20 flex flex-col justify-between pb-20">
                        <Title className="!text-3xl">
                            Get in Touch
                        </Title>
                        <div className="flex flex-wrap gap-2">
                            {dataContact.map((el, idx) => (
                                <div key={idx} className="hidden md:flex flex-col p-4 bg-white shadow-secondary dark:bg-darkColor rounded-main gap-3 flex-1">
                                    <div className="bg-radial from-transparent to-neutral-300 dark:to-secondaryDark w-fit h-fit p-3 rounded-full mb-10">
                                        {el.icon}
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <h3 className="text-lg font-semibold mb-2">
                                            {el.data}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Image
                            width={700}
                            height={700}
                            className="w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1599707254554-027aeb4deacd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742"
                            alt="Contact us image"
                        />
                    </div>


                </div>

            </section>
        </>
        // <section className="dark:bg-darkColor bg-lightColor/0 md:px-10 px-4">
        //         <div className="py-15 md:py-20 flex flex-col justify-between">
        //             <h1 className="text-5xl mb-5">
        //                 Contact Us
        //             </h1>

        //             <div className="flex flex-wrap gap-5">
        //             {[...dataContact.mail, ...dataContact.phone, ...dataContact.media].map((el, idx) => (
        //                 <Link
        //                     href={el.link}
        //                     key={idx}
        //                     className="grow flex flex-col justify-between p-5 rounded-3xl dark:bg-darkColor bg-neutral-200 hover:invert duration-300 ease-in-out hover:-translate-y-3 origin-bottom hover:shadow-mainShadow"
        //                 >
        //                     <div className="text-3xl md:text-5xl mb-10">
        //                         {el.icon}
        //                     </div>
        //                     <div className="flex flex-col gap-1">
        //                         <h1 className="font-medium text-lg md:text-xl">
        //                             {el.label}
        //                         </h1>
        //                         <h2 className="font-bold text-xl bg-gradient-to-bl dark:from-secondaryColor dark:to-neutral-100 from-mainColor to-darkColor bg-clip-text text-transparent">
        //                             {el.data}
        //                         </h2>
        //                     </div>
        //                 </Link>
        //             ))}
        //         </div>
        //     <div className="grid grid-cols-2">
        //         </div>
        //         <div className="my-15 md:my-20 flex items-center justify-end">
        //             <div className=" bg-white p-5 rounded-main shadow-custom w-full max-w-sm">
        //                 <Title>
        //                     Send Us Message
        //                 </Title>
        //                 <form className="mt-6 max-w-2xl flex flex-col gap-4">
        //                     <div className="relative">
        //                         <Input
        //                             type="text"
        //                             className=" indent-20 p-3 border border-darkColor/10 dark:border-lightColor/10 rounded-main bg-white dark:bg-darkColor/95 focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
        //                         />
        //                         <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-sm opacity-60">
        //                             Name
        //                         </p>
        //                     </div>
        //                     <div className="relative">
        //                         <Input
        //                             type="email"
        //                             className=" indent-20 p-3 border border-darkColor/10 dark:border-lightColor/10 rounded-main bg-white dark:bg-darkColor/95 focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
        //                         />
        //                         <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-sm opacity-60">
        //                             Email
        //                         </p>
        //                     </div>
        //                     <div className="relative">
        //                         <Input
        //                             type="number"
        //                             className=" indent-20 p-3 border border-darkColor/10 dark:border-lightColor/10 rounded-main bg-white dark:bg-darkColor/95 focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
        //                         />
        //                         <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-sm opacity-60">
        //                             Phone
        //                         </p>
        //                     </div>


        //                     <div className="relative">
        //                         <Textarea
        //                             rows="7"
        //                             className="indent-25 resize-none p-3 border border-darkColor/10 dark:border-lightColor/10 rounded-main bg-white dark:bg-darkColor/95 focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
        //                         />
        //                         <p className="absolute top-[23px] transform -translate-y-1/2 left-3 text-sm opacity-60">
        //                             Message
        //                         </p>
        //                     </div>

        //                     <Button>
        //                         <FaPaperPlane />  Send Message
        //                     </Button>

        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </section>
    )
}