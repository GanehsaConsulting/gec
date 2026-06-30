"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cementBlanketData } from "@/lib/cementBlanketData";
import { fadeUp, heroCarouselImages, scrollToSection } from "./constants";

const { product } = cementBlanketData;
const CAROUSEL_INTERVAL = 5000;

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroCarouselImages.length);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[480px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={heroCarouselImages[current].src}
            alt={heroCarouselImages[current].alt}
            fill
            className="object-cover"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30" />
      <div className="absolute bottom-0 left-0 right-0 h-[50lvh] linear-blur" />

      <div className="absolute top-1/2 right-0 -translate-y-1/2 margin flex flex-col gap-2 z-10">
        {heroCarouselImages.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrent(index)}
            className={`w-1 rounded-full transition-all duration-300 ${
              current === index
                ? "h-8 bg-otherColor"
                : "h-4 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>


      <div className="absolute bottom-0 left-0 right-0 margin pb-10 md:pb-16 z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-4xl"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider rounded-full bg-otherColor/90 text-otherColorDark">
            {product.category}
          </span>
          <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-2">
            {product.name}
          </h1>
          <p className="text-white/90 text-base md:text-lg font-medium mb-1">
            {product.tagline}
          </p>
          <p className="text-otherColor text-sm md:text-base font-semibold mb-4">
            {product.taglineSub}
          </p>
          <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-4xl mb-5">
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
              onClick={() => scrollToSection("installation")}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
            >
              Lihat Metode Instalasi
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
