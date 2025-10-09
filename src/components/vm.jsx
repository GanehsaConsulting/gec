import Image from "next/image"
import { Title } from "./title"

export const VisionMission = () => {
    return (
        <main className="spacing">
            <div className="relative">
                <Image
                    width={600}
                    height={400}
                    className="w-full h-[80vh] md:h-[60vh] object-cover object-center -z-10"
                    src="https://images.unsplash.com/photo-1652291959481-0a15ad2e795b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="VM Background"
                />

                <div className="absolute inset-0 w-full h-[40lvh] md:h-full">
                    <div className="space-y-5 h-full bg-darkColor dark:bg-lightColor p-4 md:p-10 rounded-none text-white dark:text-black max-w-lg flex flex-col justify-between">
                        <Title>
                            Vission
                        </Title>

                        <p className="text-2xl md:leading-relaxed uppercase tracking-wide font-medium max-w-sm">
                            Menjadi penyedia solusi engineering terbaik di Indonesia yang terpercaya dalam menghadirkan infrastruktur berkelanjutan
                        </p>
                    </div>
                </div>
            </div>




            <div className=" flex items-center flex-col space-y-5 text-left">
                <div className="grid md:grid-cols-5 gap-0 rounded-0 overflow-hidden">

                    <div className="md:pl-10 md:aspect-square p-4 uppercase font-semibold tracking-wide dark:bg-darkColor bg-lightColor">
                        <Title>
                            Mission
                        </Title>
                    </div>
                    <p className="md:aspect-square p-4 uppercase font-semibold text-xl tracking-wide text-white dark:bg-lightColor dark:text-black bg-darkColor">

                        Menyediakan layanan engineering dan konstruksi yang inovatif, efisien, dan berkualitas tinggi.
                    </p>
                    <p className="md:aspect-square p-4 uppercase font-semibold text-xl tracking-wide text-white dark:bg-lightColor/80 dark:text-black bg-darkColor/80">

                        Menjaga standar keselamatan kerja dan mutu proyek berdasarkan regulasi serta standar internasional.
                    </p>
                    <p className="md:aspect-square p-4 uppercase font-semibold text-xl tracking-wide text-white dark:bg-lightColor/60 dark:text-black bg-darkColor/60">

                        Menjalin kemitraan strategis yang berkelanjutan dengan para pemangku kepentingan.
                    </p>
                    <p className="pr-10 md:aspect-square p-4 uppercase font-semibold text-xl tracking-wide text-white dark:bg-lightColor/50 dark:text-black bg-darkColor/50">
                        Berperan aktif dalam pembangunan infrastruktur berkelanjutan yang berdampak sosial dan lingkungan positif
                    </p>
                </div>
            </div>
        </main>
    )
}