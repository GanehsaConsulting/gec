import Image from "next/image";
import { Droplets, Zap, Coins, Leaf } from "lucide-react";
import { cementBlanketData } from "@/lib/cementBlanketData";
import { SectionHeader } from "./section-header";
import { heroCarouselImages } from "./constants";

const { characteristics } = cementBlanketData;
const icons = [Droplets, Zap, Coins, Leaf];

export function CharacteristicsSection() {
  return (
    <section id="characteristics" className="margin spacing">
      <SectionHeader
        label="Karakteristik"
        title="Karakteristik Utama"
        description="Solusi beton fleksibel dengan performa tinggi untuk berbagai kebutuhan infrastruktur."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative md:col-span-2 lg:col-span-2 min-h-[220px] md:min-h-[280px] rounded-main overflow-hidden">
          <Image
            src={heroCarouselImages[2].src}
            alt={heroCarouselImages[2].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-darkColor/85 via-darkColor/40 to-mainColor/30" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-otherColor mb-2">
              Performa Lapangan
            </p>
            <p className="text-white text-xl md:text-2xl font-semibold tracking-tight max-w-sm">
              Empat keunggulan yang membuat Cement Blanket unggul di proyek sipil.
            </p>
          </div>
        </div>

        {characteristics.map((item, index) => {
          const Icon = icons[index] || Droplets;
          return (
            <div
              key={item.title}
              className="flex flex-col p-5 rounded-main bg-lightColor dark:bg-secondaryDark border border-transparent dark:border-white/5 gap-4 min-h-[200px]"
            >
              <div className="w-11 h-11 rounded-full bg-mainColor/10 dark:bg-otherColor/15 flex items-center justify-center">
                <Icon className="h-5 w-5 text-mainColor dark:text-otherColor" />
              </div>
              <div className="mt-auto">
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
