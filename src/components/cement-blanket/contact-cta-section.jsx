"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cementBlanketData } from "@/lib/cementBlanketData";

const { contactCTA } = cementBlanketData;

export function ContactCtaSection() {
  const handleWhatsApp = () => {
    const message =
      "Halo, saya tertarik dengan produk Cement Blanket. Mohon informasi lebih lanjut.";
    window.open(
      `https://api.whatsapp.com/send?phone=628871510045&text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section id="contact-cta" className="margin spacing">
      <div className="relative overflow-hidden rounded-main bg-gradient-to-br from-mainColor via-mainColor/90 to-secondaryColor p-8 md:p-12 text-center text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-otherColor rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-other2 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            {contactCTA.headline}
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            {contactCTA.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-otherColor hover:bg-otherColor/90 text-otherColorDark font-semibold"
            >
              <Link href="/contact">
                Minta Penawaran Harga
                <ArrowRight className="ml-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/40 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">
                <Download className="mr-1" />
                Download Brosur Teknis
              </Link>
            </Button>
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <FaWhatsapp className="mr-1" />
              Hubungi via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
