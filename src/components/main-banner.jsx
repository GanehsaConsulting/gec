"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { FaPlay } from "react-icons/fa";

export const MainBanner = () => {
    const [blurOpacity, setBlurOpacity] = useState(100) // Start with blur active

    useEffect(() => {
        const animateBlur = () => {
            // Start with blur active (covers video start)
            setBlurOpacity(100)

            // Fade out blur after 1.5 seconds 
            setTimeout(() => {
                setBlurOpacity(0)
            }, 1500)

            // Fade in blur at 6 seconds (2 seconds before video ends)
            setTimeout(() => {
                setBlurOpacity(100)
            }, 6000)
        }

        // Start first cycle immediately
        animateBlur()

        // Repeat every 8 seconds (sync with video duration)
        const interval = setInterval(animateBlur, 8000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <main className="h-screen relative">
            <div className="relative w-full h-screen overflow-hidden">
                <video
                    className="
                        w-full h-full object-cover
                        transform-gpu
                        will-change-transform
                        backface-hidden
                        subpixel-antialiased
                        contrast-110
                        saturate-110
                        brightness-105
                    "
                    src="/bann.mp4"
                    // autoPlay
                    // loop
                    muted
                    playsInline
                    preload="auto"
                />

                {/* Blur Layer */}
                <div
                    className="absolute inset-0 backdrop-blur-xl transition-opacity duration-[800ms] ease-in-out"
                    style={{
                        opacity: blurOpacity / 100,
                        backgroundColor: `rgba(255, 255, 255, ${blurOpacity * 0.1 / 100})` // Subtle white overlay
                    }}
                />
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-black backdrop-blur-xl py-7 md:py-0 md:h-[40vh] flex items-center px-4 md:px-10">
                <div className="md:max-w-4xl md:space-y-5 space-y-3">
                    <div className="hidden md:block px-3 py-2 rounded-main border border-main/10 bg-thirdColor/5 w-fit">
                        <div className="">
                            <p className="font-bold text-xs uppercase text-secondaryColor">
                                Infrastruktur · Teknologi Industri · Reklamasi · Inovasi Mekanikal
                            </p>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl tracking-tighter text-balance">
                        Shaping the Future of Engineering
                    </h1>
                    <p className="leading-5">
                        Ganesha Enginnering & Constructions adalah mitra rekayasa teknik yang mengintegrasikan teknologi, pengalaman, dan presisi dalam setiap proyek—dari tanah hingga teknologi.
                    </p>

                    <div className="space-x-2">
                        <Button>
                            <FaPlay className="size-3" />
                            Explore
                        </Button>
                        <Button variant="outline">
                            Contact Us
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}