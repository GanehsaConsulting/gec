import Image from "next/image"

export const MainBanner = () => {
    return (
        <main className="h-screen relative">
            <div className="relative w-full h-screen overflow-hidden">
                <video
                    className="
                        w-full h-full object-cover
                        transform-gpu
                        will-change-transform
                        backface-hidden
                        subpixel-antialiased
                        contrast-110
                        saturate-110
                        brightness-105
                    "
                    src="/bann.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-black backdrop-blur-xl h-[40vh] flex items-center px-10">
                <div className="max-w-4xl space-y-5">
                    <div className="px-3 py-2 rounded-main border border-main/10 bg-thirdColor/5 w-fit">
                        <p className="font-bold text-xs uppercase text-secondaryColor">
                            Infrastruktur · Teknologi Industri · Reklamasi · Inovasi Mekanikal
                        </p>
                    </div>
                    <h1 className="text-6xl tracking-tighter text-balance">
                        Shaping the Future of Engineering
                    </h1>
                    <p className="leading-5">
                        Ganesha Enginnering & Constructions adalah mitra rekayasa teknik yang mengintegrasikan teknologi, pengalaman, dan presisi dalam setiap proyek—dari tanah hingga teknologi.
                    </p>
                </div>
            </div>
        </main>
    )
}