import Image from "next/image"
import { Title } from "./title"

export const Branding = () => {
    return (
        <>
            <div className="bg-lightColor/50 dark:bg-darkColor/50 rounded-t-main">
                <main className="margin spacing">
                    <div className="grid md:grid-cols-2 gap-5">
                        <Title className="!text-4xl h-fit">
                            About Us
                        </Title>

                        <div>
                            <p className="dark:text-secondaryLight text-secondaryDark text-base md:text-base leading-relaxed tracking-normal text-justify">
                                GEC (Ganesha Engineering & Construction) adalah identitas brand dari PT
                                Ganesha Multi Kreatif yang dibentuk melalui sinergi strategis empat entitas
                                bisnis dengan spesialisasi berbeda dalam dunia rekayasa dan konstruksi. GEC
                                berkomitmen memberikan solusi holistik dan profesional untuk pembangunan
                                infrastruktur, pengadaan teknis, instalasi pabrik, dan reklamasi pasca
                                tambang. Dengan tim ahli berpengalaman dan jaringan kemitraan kuat, GEC
                                menjadi mitra terpercaya untuk proyek-proyek nasional dan internasional.
                            </p>
                        </div>
                    </div>
                </main>
                <Image
                    className="w-full h-[40lvh] object-cover mt-10 rounded-0"
                    width={1000}
                    height={1000}
                    src="https://images.unsplash.com/photo-1533378890784-b2a5b0a59d40?q=80&w=2037&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="About Us Image"
                />
            </div>
        </>
    )
}