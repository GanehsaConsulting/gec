import { ReusableBanner } from "@/components/reusable-banner";
import { VisionMission } from "@/components/vm";
import { WhyUs } from "@/components/why-us";

export default function TentangKami() {
    return (
        <>
            <ReusableBanner
                imageSrc="https://images.unsplash.com/photo-1533378890784-b2a5b0a59d40?q=80&w=2037&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                imageAlt="Our Projects"
                title="Get To"
                titleHighlight="Know Us"
                description="GEC (Ganesha Engineering & Construction) adalah identitas brand dari PT
                            Ganesha Multi Kreatif yang dibentuk melalui sinergi strategis empat entitas
                            bisnis dengan spesialisasi berbeda dalam dunia rekayasa dan konstruksi. GEC
                            berkomitmen memberikan solusi holistik dan profesional untuk pembangunan
                            infrastruktur, pengadaan teknis, instalasi pabrik, dan reklamasi pasca
                            tambang. Dengan tim ahli berpengalaman dan jaringan kemitraan kuat, GEC
                            menjadi mitra terpercaya untuk proyek-proyek nasional dan internasional."
                sectionClassName="bg-darkColor dark:bg-lightColor h-[50lvh]"
                titleClassName="invert"
                descriptionClassName="invert"
            />
            <WhyUs />
            <VisionMission />
        </>
    )
}