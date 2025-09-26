import Image from "next/image"
import { FaPlay } from "react-icons/fa"
import { Title } from "./title"


export const About = () => {
    return (
        <>
            <main className="grid grid-cols-1 md:grid-cols-2">
                <section className="bg-darkColor dark:bg-secondaryLight py-20 md:py-30 px-10 flex flex-col justify-between">
                    <Title
                    className={"text-lightColor dark:text-darkColor"}
                    >
                        Get To Know Us
                    </Title>

                    <div className="mt-6 max-w-4xl">
                        <p className="text-secondaryLight dark:text-secondaryDark text-base md:text-lg leading-relaxed tracking-normal text-justify">
                            GEC (Ganesha Engineering & Construction) adalah identitas brand dari PT
                            Ganesha Multi Kreatif yang dibentuk melalui sinergi strategis empat entitas
                            bisnis dengan spesialisasi berbeda dalam dunia rekayasa dan konstruksi. GEC
                            berkomitmen memberikan solusi holistik dan profesional untuk pembangunan
                            infrastruktur, pengadaan teknis, instalasi pabrik, dan reklamasi pasca
                            tambang. Dengan tim ahli berpengalaman dan jaringan kemitraan kuat, GEC
                            menjadi mitra terpercaya untuk proyek-proyek nasional dan internasional.
                        </p>
                    </div>
                </section>
                <section>
                    <Image
                        width={2037}
                        height={1358}
                        className="object-cover w-full h-[60vh] md:h-screen"
                        src="https://images.unsplash.com/photo-1533378890784-b2a5b0a59d40?q=80&w=2037&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="" />
                </section>
            </main>
        </>
    )
}