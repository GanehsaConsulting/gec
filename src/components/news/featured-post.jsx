"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatNewsDate } from "@/lib/newsData";

const CAROUSEL_INTERVAL = 6000;

function FeaturedSlide({ post, isActive }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className={`group absolute inset-0 block rounded-main overflow-hidden transition-opacity duration-700 ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
      }`}
      tabIndex={isActive ? 0 : -1}
      aria-hidden={!isActive}
    >
      <Image
        src={post.coverImage}
        alt={post.coverAlt || post.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        sizes="100vw"
        priority={isActive}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-darkColor via-darkColor/55 to-darkColor/15" />

      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-secondary bg-otherColor text-otherColorDark">
            Most Read
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
            {post.category}
          </span>
          <time
            dateTime={post.date}
            className="text-[11px] uppercase tracking-wider text-white/50"
          >
            {formatNewsDate(post.date)}
          </time>
        </div>

        <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white text-balance max-w-3xl mb-3">
          {post.title}
        </h2>
        <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

export function FeaturedCarousel({ posts = [] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const regionRef = useRef(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  useEffect(() => {
    setCurrent(0);
  }, [posts]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (posts.length <= 1 || paused || reduceMotion) return undefined;
    const timer = setInterval(next, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, [posts.length, paused, reduceMotion, next]);

  if (!posts.length) return null;

  return (
    <div
      ref={regionRef}
      className="relative rounded-main overflow-hidden min-h-[320px] md:min-h-[400px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!regionRef.current?.contains(e.relatedTarget)) {
          setPaused(false);
        }
      }}
      aria-roledescription="carousel"
      aria-label="Most Read articles"
    >
      {posts.map((post, index) => (
        <FeaturedSlide
          key={post.id}
          post={post}
          isActive={index === current}
        />
      ))}

      {posts.length > 1 && (
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-2 z-20">
          {posts.map((post, index) => (
            <button
              key={post.id}
              type="button"
              aria-label={`Slide ${index + 1}: ${post.title}`}
              aria-current={current === index}
              onClick={() => setCurrent(index)}
              className={`h-1 rounded-full transition-[width,background-color] duration-300 ${
                current === index
                  ? "w-8 bg-otherColor"
                  : "w-4 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
