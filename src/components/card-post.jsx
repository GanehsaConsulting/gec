"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Button } from "./ui/button";
import { Title } from "./title-text";
import { slugify } from "@/lib/slugify";

// Separate Card Component for better reusability
const ProjectCard = ({ project, className = "" }) => {
    // Use slug if available, fallback to id
    const href = project.slug
        ? `/project/${project.slug}`
        : project.title
            ? `/project/${slugify(project.title)}`
            : `/project/${project.id}`;

    return (
        <Link href={href}>
            <div className={`relative h-[50lvh] md:h-[60lvh] rounded-main overflow-hidden group ${className}`}>
                <Image
                    width={500}
                    height={500}
                    src={project.image}
                    className="h-[60lvh] w-full object-cover rounded-main group-hover:scale-105 duration-300"
                    alt={project.title}
                />

                {/* Gradient Overlay */}
                <div className="absolute bottom-0 linear-blur-to-t w-full h-[30vh] bg-gradient-to-r from-darkColor/40 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2 group-hover:-translate-y-100 translate-y-0 duration-500">
                    <span className="px-2 py-1 text-xs rounded-full bg-lightColor/70 dark:bg-darkColor/70 lightColor font-semibold backdrop-blur-lg">
                        {project.category}
                    </span>
                </div>

                {/* Content Card */}
                <div className="absolute left-0 bottom-0 right-0 mt-3 space-y-2">
                    <div className="bg-white/70 dark:bg-darkColor/60 min-h-[15lvh] border border-lightColor/10 backdrop-blur-sm backdrop-brightness-125 m-1.5 rounded-secondary p-4">
                        <h3 className="text-lg font-medium line-clamp-2">
                            {project.title}
                        </h3>

                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1 mt-1">
                            {project.description}
                        </p>

                        {/* Optional metadata */}
                        {(project.location || project.year) && (
                            <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                                {project.location && <span>{project.location}</span>}
                                {project.location && project.year && <span>•</span>}
                                {project.year && <span>{project.year}</span>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

// Carousel Card with specific width constraints
const CarouselProjectCard = ({ project, isFirst, isLast }) => {
    return (
        <div className={`${isFirst && "ml-4 md:ml-10"} ${isLast && "mr-4 md:mr-10"}`}>
            <ProjectCard
                project={project}
                className="min-w-[40lvh] max-w-[40lvh]"
            />
        </div>
    );
};

// Main Component
export const CardPost = ({
    mode = "grid",
    data = [],
    title = "Our Latest Project & Activity",
    showTitle = false,
    className = "",
    gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    loading = false,
}) => {
    const carouselRef = useRef(null);

    // Scroll functions for carousel navigation
    const scrollLeft = () => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.offsetWidth * 0.7;
            carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.offsetWidth * 0.7;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Empty state
    if (!loading && (!data || data.length === 0)) {
        return (
            <div className="margin py-20 text-center">
                <p className="text-neutral-500 dark:text-neutral-400">
                    No projects available at the moment.
                </p>
            </div>
        );
    }

    return (
        <>
            {mode === "grid" && (
                <div className={className}>
                    <div className={`grid ${gridCols} gap-3 md:gap-4 margin`}>
                        {data.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            )}

            {mode === "carousel" && (
                <div className={`py-12 md:py-20 ${className}`}>
                    {/* Title and Navigation Buttons */}
                    {showTitle && (
                        <div className="margin mb-5 flex items-center justify-between gap-4">
                            <Title className="!text-2xl !mb-0">
                                {title}
                            </Title>

                            {/* Navigation Buttons */}
                            <div className={`${data.length < 4 ? "!hidden" : "block"} md:flex items-center gap-2 hidden`}>
                                <Button
                                    size={"icon"}
                                    onClick={scrollLeft}
                                    aria-label="Previous"
                                >
                                    <HiChevronLeft className="h-6 w-6 group-hover:text-mainColorLight dark:group-hover:text-mainColorDark transition-colors" />
                                </Button>
                                <Button
                                    size={"icon"}
                                    onClick={scrollRight}
                                    aria-label="Next"
                                >
                                    <HiChevronRight className="h-6 w-6 group-hover:text-mainColorLight dark:group-hover:text-mainColorDark transition-colors" />
                                </Button>
                            </div>
                        </div>
                    )}

                    <div
                        ref={carouselRef}
                        className="carousel w-full gap-3 md:gap-4 scroll-smooth"
                    >
                        {data.map((project, idx) => (
                            <CarouselProjectCard
                                key={project.id}
                                project={project}
                                isFirst={idx === 0}
                                isLast={idx === data.length - 1}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

// Export individual components for more flexibility
export { ProjectCard, CarouselProjectCard };