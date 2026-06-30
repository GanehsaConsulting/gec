"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cementBlanketData } from "@/lib/cementBlanketData";
import { Title } from "@/components/title-text";

const { contactCTA, contact } = cementBlanketData;

export function ContactCtaSection() {
  const handleWhatsApp = () => {
    const message =
      "Halo, saya tertarik dengan produk Cement Blanket GEC. Mohon informasi lebih lanjut.";
    window.open(
      `https://api.whatsapp.com/send?phone=${contact.whatsapp}&text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <section id="contact-cta" className="margin spacing">
      <div className="rounded-main overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-300 p-8 md:p-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tighter text-white dark:text-black mb-3">
            {contactCTA.headline}
          </h2>
          <p className="text-white/70 dark:text-black/70 text-sm md:text-base leading-relaxed mb-8">
            {contactCTA.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              asChild
              className="bg-white text-black hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90"
            >
              <Link href="/contact">Minta Penawaran</Link>
            </Button>
            <Button
              variant="ghost"
              onClick={handleWhatsApp}
              className="border border-white/50 bg-transparent text-white hover:bg-white/15 hover:text-white dark:border-black/30 dark:text-black dark:hover:bg-black/10 dark:hover:text-black"
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
