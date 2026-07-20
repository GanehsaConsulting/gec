"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBanner } from "@/hooks/useBanner";

const CAROUSEL_INTERVAL = 5000;

function isExternalUrl(url) {
  return /^(https?:|whatsapp:|mailto:|tel:)/i.test(url || "");
}

function isSafeInternalPath(url) {
  return typeof url === "string" && url.startsWith("/") && !url.startsWith("//");
}

function BannerSlide({ src, alt, priority }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 40vw, 20vw"
      priority={priority}
    />
  );
}

/**
 * CMS placement banner for product mega menu (`key=mega-menu`).
 * Hidden when inactive / missing / no images.
 */
export function MegaMenuBanner({
  placementKey = "mega-menu",
  className = "",
  expandAnimationClass = "",
}) {
  const { data: banner, loading } = useBanner(placementKey);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const regionRef = useRef(null);

  const images = banner?.images || [];
  const hasCarousel = images.length > 1;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    setCurrent(0);
  }, [banner?.id]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!hasCarousel || paused || reduceMotion) return undefined;
    const timer = setInterval(next, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, [hasCarousel, paused, reduceMotion, next]);

  if (loading || !banner || images.length === 0) {
    return null;
  }

  const href = banner.redirectUrl || "";
  const label = banner.name || "Featured";
  const content = (
    <>
      {images.map((src, index) => (
        <div
          key={`${banner.id}-${src}-${index}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <BannerSlide
            src={src}
            alt={`${label} — ${index + 1}`}
            priority={index === 0}
          />
        </div>
      ))}

      <div className="absolute bottom-0 left-0 right-0 h-30 pointer-events-none linear-blur z-10" />

      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-end justify-between gap-2">
        <div className="px-3 py-1 w-fit backdrop-blur-2xl bg-lightColor/50 dark:bg-darkColor/50 rounded-main">
          <h1 className="text-lg font-semibold line-clamp-2">{label}</h1>
        </div>

        {hasCarousel && (
          <div className="flex gap-1.5 pb-1">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Slide ${index + 1}`}
                aria-current={current === index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrent(index);
                }}
                className={`h-1 rounded-full transition-[width,background-color] duration-300 ${
                  current === index
                    ? "w-5 bg-otherColor"
                    : "w-2.5 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );

  const shellClass = `${expandAnimationClass} ${className} relative overflow-hidden rounded-main group`;

  if (!href) {
    return (
      <div
        ref={regionRef}
        className={shellClass}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {content}
      </div>
    );
  }

  if (isExternalUrl(href)) {
    return (
      <a
        ref={regionRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${shellClass} cursor-pointer block`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {content}
      </a>
    );
  }

  if (!isSafeInternalPath(href)) {
    return (
      <div
        ref={regionRef}
        className={shellClass}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      ref={regionRef}
      href={href}
      className={`${shellClass} cursor-pointer block`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {content}
    </Link>
  );
}
