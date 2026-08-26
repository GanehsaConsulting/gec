"use client";

import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ganvexMatData } from "@/lib/ganvexMatData";
import { heroCarouselImages } from "./constants";

const { contactCTA, contact } = ganvexMatData;

export function ContactCtaSection() {
  const handleWhatsApp = () => {
    const message =
      "Halo, saya tertarik dengan produk Ganvex Mat GEC. Mohon informasi lebih lanjut.";
    window.open(
      `https://api.whatsapp.com/send?phone=${contact.whatsapp}&text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section id="contact-cta" className="margin spacing">
      <div className="relative rounded-main overflow-hidden min-h-[280px] md:min-h-[320px]">
        <Image
          src={heroCarouselImages[0].src}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-darkColor/80 dark:bg-secondaryDark/90" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 p-8 md:p-12">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-otherColor mb-4">
              Kontak
            </p>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tighter text-white mb-3 text-balance">
              {contactCTA.headline}
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              {contactCTA.subheadline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <Button
              asChild
              className="bg-otherColor text-otherColorDark hover:bg-otherColor/90"
            >
              <Link href="/contact">Minta Penawaran</Link>
            </Button>
            <Button
              variant="ghost"
              onClick={handleWhatsApp}
              className="border border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <FaWhatsapp />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
