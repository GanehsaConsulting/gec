"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ganvexMatData } from "@/lib/ganvexMatData";
import {
  PRODUCT_LOGO,
  heroCarouselImages,
  scrollToSection,
} from "./constants";

const { product } = ganvexMatData;
const CAROUSEL_INTERVAL = 5000;

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const regionRef = useRef(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroCarouselImages.length);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return undefined;
    const timer = setInterval(next, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, reduceMotion, next]);

  return (
    <>
      <div
        ref={regionRef}
        className="relative w-full h-[50lvh] overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!regionRef.current?.contains(e.relatedTarget)) {
            setPaused(false);
          }
        }}
      >
        {heroCarouselImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            className={`object-cover transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}

        <div className="absolute bottom-4 left-4 md:left-10 flex gap-2 z-10">
          {heroCarouselImages.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Slide ${index + 1}`}
              aria-current={current === index}
              onClick={() => setCurrent(index)}
              className={`h-1 rounded-full transition-[width,background-color] duration-300 ${
                current === index
                  ? "w-8 bg-white"
                  : "w-4 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      <section className="px-4 md:px-10 py-10 md:py-20 bg-darkColor dark:bg-lightColor">
        <div className="flex flex-col md:flex-row gap-5 justify-between">
          <div>
            <div className="relative w-20 h-20 md:w-28 md:h-28 mb-4 rounded-main overflow-hidden bg-black">
              <Image
                src={PRODUCT_LOGO}
                alt=""
                fill
                className="object-contain"
                sizes="112px"
              />
            </div>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 invert opacity-70">
              {product.category}
            </p>
            <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter text-balance invert">
              Ganvex
              <br />
              <span className="text-neutral-600 dark:text-neutral-400">
                Mat
              </span>
            </h1>
          </div>

          <div className="space-y-3 max-w-2xl">
            <p className="text-sm sm:text-base font-medium leading-5 md:leading-6 invert">
              {product.tagline}
            </p>
            <p className="text-sm sm:text-base font-semibold uppercase tracking-wide invert">
              {product.taglineSub}
            </p>
            <p className="text-sm sm:text-base leading-5 md:leading-6 invert">
              {product.heroDescription}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[10px] md:text-xs font-semibold uppercase tracking-wider opacity-80 invert">
              {product.heroHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button onClick={() => scrollToSection("contact-cta")}>
                Minta Penawaran
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("installation")}
              >
                Lihat Metode Instalasi
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
