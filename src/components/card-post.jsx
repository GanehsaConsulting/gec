import Image from "next/image"
import Link from "next/link"

export const CardPost = () => {
    const data = [
        {
            id: 1,
            title: "Pembangunan Gedung Serbaguna Pemerintah Daerah",
            category: "Infrastruktur",
            location: "Majalengka, Jawa Barat",
            year: 2024,
            description:
                "Proyek konstruksi gedung serbaguna dengan sistem struktur beton bertulang dan desain berstandar nasional untuk kegiatan masyarakat dan pemerintahan.",
            image:
                "https://images.unsplash.com/photo-1519143009590-e3800b9df468?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1568",
        },
        {
            id: 2,
            title: "Instalasi Sistem Mekanikal Pabrik Tekstil",
            category: "Instalasi Pabrik",
            location: "Bandung, Jawa Barat",
            year: 2023,
            description:
                "Pekerjaan instalasi sistem mekanikal dan kelistrikan untuk fasilitas produksi tekstil, termasuk ducting, panel distribusi, dan sistem kontrol otomatis.",
            image:
                "https://images.unsplash.com/photo-1508356730910-16e7e7f024f1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1796",
        },
        {
            id: 3,
            title: "Pengadaan Perangkat Elektronik untuk Fasilitas Pelabuhan",
            category: "Pengadaan Elektronik & Mekanik",
            location: "Tanjung Priok, DKI Jakarta",
            year: 2024,
            description:
                "Penyediaan dan pemasangan perangkat elektronik pelabuhan seperti sistem CCTV, panel kontrol, serta perangkat keamanan berbasis IoT.",
            image:
                "https://images.unsplash.com/photo-1641219996730-b21ca5b26d26?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2062",
        },
        {
            id: 4,
            title: "Reklamasi Pasca Tambang Nikel",
            category: "Reklamasi Pasca Tambang",
            location: "Kolaka, Sulawesi Tenggara",
            year: 2023,
            description:
                "Proyek reklamasi lahan bekas tambang nikel melalui proses pemulihan tanah, penanaman vegetasi lokal, dan sistem pengendalian erosi.",
            image:
                "https://images.unsplash.com/photo-1603556830536-0e80dcc8e85f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=930",
        },
        {
            id: 5,
            title: "Pembangunan Drainase dan Jalan Akses Industri",
            category: "Infrastruktur",
            location: "Cikarang, Bekasi",
            year: 2022,
            description:
                "Pekerjaan konstruksi drainase dan jalan akses menuju kawasan industri dengan sistem perkerasan beton dan saluran tertutup.",
            image:
                "https://images.unsplash.com/photo-1630297777866-e2d178f29376?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
        },
        {
            id: 6,
            title: "Sistem Otomasi Produksi Pabrik Makanan",
            category: "Instalasi Pabrik",
            location: "Karawang, Jawa Barat",
            year: 2024,
            description:
                "Integrasi sistem otomasi untuk lini produksi pabrik makanan menggunakan sensor, aktuator, dan PLC untuk efisiensi maksimal.",
            image:
                "https://images.unsplash.com/photo-1600897529572-88c1636fc7f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
        },
    ];

    return (
        <>
            <div className="grid grid-cols-4 gap-3 margin">
                {data.map((el, idx) => (
                    <Link
                        key={idx}
                        href=""
                    >
                        <div className="relative h-[60lvh] rounded-main overflow-hidden group">
                            <Image
                                width={500}
                                height={500}
                                src={el.image}
                                className={`h-[60lvh] object-cover rounded-main group-hover:scale-105 duration-300`}
                                alt={el.title}
                            />

                            <div className="absolute bottom-0 linear-blur-to-t w-full h-[30vh] bg-gradient-to-r from-darkColor/40 to-transparent"></div>

                            <div className="absolute top-2 left-2 group-hover:-translate-y-100 translate-y-0 duration-500">
                                <p className="px-2 py-1 text-xs rounded-full bg-lightColor/70 dark:bg-darkColor/70 lightColor font-semibold backdrop-blur-lg">
                                    {el.category}
                                </p>
                            </div>

                            <div className="absolute left-0 bottom-0 right-0 mt-3 space-y-2">
                                <div className="bg-white/70 dark:bg-darkColor/60 min-h-[15lvh] border border-lightColor/10 backdrop-blur-sm backdrop-brightness-125 m-1.5 rounded-secondary p-4">
                                    <h1 className="text-lg font-medium line-clamp-2">
                                        {el.title}
                                    </h1>

                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
                                        {el.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </Link>
                ))}
            </div>
        </>
    )
}