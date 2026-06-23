"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cementBlanketData } from "@/lib/cementBlanketData";
import { fadeUp, HERO_IMAGE, scrollToSection } from "./constants";

const { product } = cementBlanketData;

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[480px] overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Cement Blanket installation"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30" />
      <div className="absolute bottom-0 left-0 right-0 h-[50lvh] linear-blur" />

      <div className="absolute bottom-0 left-0 right-0 margin pb-10 md:pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-4xl"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider rounded-full bg-otherColor/90 text-otherColorDark">
            {product.category}
          </span>
          <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            {product.name}
          </h1>
          <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
            {product.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact-cta")}
              className="bg-mainColor hover:bg-mainColor/90 text-white"
            >
              Minta Penawaran
              <ArrowRight className="ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("how-it-works")}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
            >
              Lihat Cara Kerja
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
