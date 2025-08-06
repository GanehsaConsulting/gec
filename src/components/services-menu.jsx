import Link from "next/link"
import { servicesMenu } from "./system"
import { TbAsterisk } from "react-icons/tb";
import { useState } from "react";
import Image from "next/image";

export const ServicesMenu = ({ expandedId }) => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const expandAnimationClass = expandedId ? "scale-100 -translate-y-0 opacity-100 duration-500 ease-in-out" : "scale-[.90] -translate-y-12 opacity-0 duration-500 ease-in-out";

    const handleMouseEnter = (idx) => {
        setHoveredCard(idx);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    const handleMouseMove = (e, idx) => {
        if (hoveredCard === idx) {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    return (
        <main className="space-y-5">
            <div className="grid grid-cols-10 gap-4">
                <div className="col-span-7">
                    <p className={`${expandAnimationClass} text-xs font-semibold uppercase pr-3 pl-2 py-1 bg-darkColor/10 dark:bg-lightColor/15 rounded-main w-fit flex items-center gap-1`}>
                        <TbAsterisk className="spin-slow" />
                        Produk & Layanan Kami
                    </p>
                </div>
                <div className="col-span-3">
                    <p className={`${expandAnimationClass} text-xs font-semibold uppercase px-3 py-1 bg-darkColor/10 dark:bg-lightColor/15 rounded-main w-fit flex items-center gap-1`}>
                        Insight
                    </p>
                </div>
            </div>
            <section className="grid grid-cols-10 gap-4">
                <div className="col-span-7 grid grid-cols-4 gap-2">
                    {servicesMenu.map((el, idx) => (
                        <Link
                            key={idx}
                            href=""
                            className={`${expandAnimationClass} relative overflow-hidden rounded-main group cursor-pointer`}
                            style={{ transitionDelay: `${idx * 50}ms` }}
                            onMouseEnter={() => handleMouseEnter(idx)}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={(e) => handleMouseMove(e, idx)}
                        >
                            {/* Animated background that follows mouse */}
                            <div
                                className={`absolute inset-0 rounded-main transition-all duration-300 ease-out ${hoveredCard === idx ? 'opacity-100' : 'opacity-0'
                                    }`}
                                style={{
                                    background: hoveredCard === idx
                                        ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--main-color-rgb, 59, 130, 246), 0.15), transparent 40%)`
                                        : 'transparent'
                                }}
                            />

                            {/* Scaling background yang mengikuti mouse pointer */}
                            <div
                                className={`absolute w-32 h-32 bg-mainColor blur-md rounded-full transition-all duration-300 ease-in-out pointer-events-none ${hoveredCard === idx ? 'scale-150 opacity-100' : 'scale-0 opacity-0'
                                    }`}
                                style={{
                                    left: `${mousePosition.x - 0}px`,
                                    top: `${mousePosition.y - 0}px`,
                                    transform: `translate(-50%, -50%) ${hoveredCard === idx ? 'scale(2.5)' : 'scale(0)'}`,
                                    transformOrigin: 'center',
                                    zIndex: 10
                                }}
                            />

                            {/* Pointer following glow effect */}
                            <div
                                className={`absolute w-32 h-32 rounded-full transition-all duration-200 ease-out pointer-events-none ${hoveredCard === idx ? 'opacity-50' : 'opacity-0'
                                    }`}
                                style={{
                                    left: `${mousePosition.x - 64}px`,
                                    top: `${mousePosition.y - 64}px`,
                                    background: 'radial-gradient(circle, rgba(var(--main-color-rgb, 59, 130, 246), 0.3) 0%, rgba(var(--main-color-rgb, 59, 130, 246), 0.1) 30%, transparent 70%)',
                                    filter: 'blur(20px)',
                                    transform: hoveredCard === idx ? 'scale(1)' : 'scale(0.8)',
                                    zIndex: 5
                                }}
                            />

                            {/* Subtle border glow that follows pointer */}
                            <div
                                className={`absolute inset-0 rounded-main transition-all duration-300 ease-out pointer-events-none ${hoveredCard === idx ? 'opacity-100' : 'opacity-0'
                                    }`}
                                style={{
                                    background: hoveredCard === idx
                                        ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--main-color-rgb, 59, 130, 246), 0.4), transparent 60%)`
                                        : 'transparent',
                                    mask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
                                    maskComposite: 'xor',
                                    WebkitMask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
                                    WebkitMaskComposite: 'xor',
                                    padding: '1px',
                                    zIndex: 15
                                }}
                            />

                            <div className="z-20 bg-otherColor/50 dark:bg-otherColorDark/30 absolute -bottom-30 -right-30 blur-3xl w-50 h-50"></div>

                            <div className={`relative z-30 p-4 rounded-main border h-full transition-all duration-300 ease-out ${hoveredCard === idx
                                ? 'border-mainColor/30 dark:border-mainColor/40 bg-lightColor/90 dark:bg-darkColor/90 transform scale-[1.02]'
                                : 'border-darkColor/10 dark:border-lightColor/10 bg-lightColor/80 dark:bg-darkColor/80'
                                }`}>
                                <h1 className={`mb-20 text-4xl w-fit p-3 rounded-full transition-all duration-300 ${hoveredCard === idx
                                    ? 'bg-radial from-mainColor/20 to-neutral-300 dark:to-secondaryDark transform scale-110'
                                    : 'bg-radial from-transparent to-neutral-300 dark:to-secondaryDark'
                                    }`}>
                                    {el.icon}
                                </h1>

                                <h1 className={`mb-5 text-lg font-semibold transition-all duration-300 ${hoveredCard === idx ? 'transform translate-y-[-2px]' : ''
                                    }`}>
                                    <span className={`text-transparent bg-clip-text transition-all duration-300 ${hoveredCard === idx
                                        ? 'bg-gradient-to-br from-mainColor via-other1 to-secondaryDark dark:from-purple-200 dark:via-other2 dark:to-secondaryLight'
                                        : 'bg-gradient-to-bl from-other1 to-secondaryDark dark:from-other2 dark:to-secondaryLight'
                                        }`}>
                                        {el.division}
                                    </span>
                                </h1>

                                <div className="flex flex-wrap gap-1">
                                    {el.services.slice(0, 3).map((e, id) => (
                                        <p key={id} className={`px-2 py-1 rounded-secondary w-fit text-[11px] font-semibold transition-all duration-300 ${hoveredCard === idx
                                            ? 'bg-mainColor/20 dark:bg-mainColor/30 text-mainColor dark:text-purple-200 transform scale-105'
                                            : 'bg-secondaryLight dark:bg-darkColor'
                                            }`}>
                                            {e}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div
                    className={`${expandAnimationClass} col-span-3 max-h-[45vh] h-[45vh] relative overflow-hidden rounded-main group cursor-pointer`}
                >
                    <Image
                        width={500}
                        height={500}
                        className="w-full h-full rounded-main object-cover"
                        src="https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-30 pointer-events-none linear-blur z-10" />
                    <div className="absolute bottom-3 left-3 right-3 z-20">
                        <div className="px-3 py-1 w-fit backdrop-blur-2xl bg-lightColor/50 dark:bg-darkColor/50 rounded-main">
                            <h1 className="text-lg font-semibold">
                                Our Latest Project
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}