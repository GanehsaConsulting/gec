'use client'
import { use, useState, useRef } from 'react';
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useProjectDetail } from "@/hooks/useProjects"
import { HiArrowLeft, HiCalendar, HiMapPin, HiChevronLeft, HiChevronRight, HiMagnifyingGlassPlus } from "react-icons/hi2"
import { CardPost } from "@/components/card-post"
import { ImageGalleryModal } from "@/components/image-gallery-modal"
import { FaMagnifyingGlassPlus } from 'react-icons/fa6';

export default function ProjectDetail({ params }) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const { slug } = resolvedParams;

    const { data: project, related, loading, error } = useProjectDetail(slug);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const carouselRef = useRef(null);

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center margin">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Project Not Found</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">{error}</p>
                    <Link href="/project">
                        <Button>
                            <HiArrowLeft className="mr-2" />
                            Back to Projects
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (!project) {
        return null;
    }

    // Transform related projects to CardPost format
    const transformedRelated = related?.map(rel => ({
        id: rel.id,
        slug: rel.slug,
        title: rel.title,
        category: rel.category,
        location: rel.location,
        year: rel.date?.split('/')[2] || '',
        description: rel.title,
        image: rel.thumbnail || 'https://images.unsplash.com/photo-1519143009590-e3800b9df468',
    })) || [];

    // Carousel navigation
    const scrollLeft = () => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.offsetWidth * 0.8;
            carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.offsetWidth * 0.8;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const openModal = (index) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="h-[60vh] relative overflow-hidden">
                <Image
                    fill
                    src={project.primaryImage || project.thumbnail}
                    alt={project.title}
                    className="h-[60vh] w-full object-cover"
                    priority
                />
                <div className="absolute bottom-0 linear-blur w-full h-[60lvh] bg-white/70 dark:bg-black/50" />

                {/* Back Button */}
                <div className="absolute top-4 left-4 md:top-8 md:left-8">
                    <Link href="/project">
                        <Button variant="outline" size="sm" className="backdrop-blur-sm bg-white/80 dark:bg-black/60">
                            <HiArrowLeft className="mr-2" />
                            Back to Projects
                        </Button>
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <div className="mb-8 flex justify-center">
                        <div className="space-y-3 w-full mx-62">
                            {/* Category Badge */}
                            <span className="px-3 py-1 rounded-full border border-secondaryColor text-secondaryColor dark:brightness-150 w-fit text-sm inline-block">
                                {project.category}
                            </span>

                            {/* Date & Location */}
                            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                                <div className="flex items-center gap-1">
                                    <HiCalendar className="w-4 h-4" />
                                    <span>{project.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <HiMapPin className="w-4 h-4" />
                                    <span>{project.location}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl tracking-tighter text-balance pb-1 font-bold">
                                {project.title}
                            </h1>
                        </div>

                        {/* <div className="flex flex-col justify-center gap-3">
                            <p className="line-clamp-3 text-sm md:text-base">
                                {project.content?.replace(/<[^>]*>/g, '').substring(0, 200) || project.title}
                            </p>
                            <Button
                                size="sm"
                                className="!text-xs w-fit"
                                onClick={() => {
                                    document.getElementById('content-section')?.scrollIntoView({ 
                                        behavior: 'smooth' 
                                    });
                                }}
                            >
                                Lanjutkan Membaca
                            </Button>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section id="content-section" className="py-8 md:py-12 flex justify-center">
                <div className="mx-62">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Project Overview</h2>
                    <div
                        className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: project.content }}
                    />
                </div>
            </section>

            {/* Image Gallery Carousel */}
            {project.images && project.images.length > 0 && (
                <section className="py-8 md:py-12">
                    <div className="mb-6 flex items-center justify-between mx-62">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold">Project Gallery</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {project.images.length} {project.images.length === 1 ? 'Image' : 'Images'} • Click to view larger
                            </p>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-2">
                            <Button
                                size="icon"
                                onClick={scrollLeft}
                                aria-label="Previous"
                            >
                                <HiChevronLeft className="h-5 w-5" />
                            </Button>
                            <Button
                                size="icon"
                                onClick={scrollRight}
                                aria-label="Next"
                            >
                                <HiChevronRight className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>


                    {/* Carousel */}
                    <div className="relative">
                        <div
                            ref={carouselRef}
                            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar px-4 md:px-10"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {project.images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`relative flex-shrink-0 rounded-lg overflow-hidden group cursor-pointer 
                                        ${index === 0 ? 'ml-4 md:ml-53' : ''}
                                        ${index === project.images.length - 1 ? 'mr-4 md:mr-53' : ''}
                                         `}
                                    style={{ width: '500px', height: '350px' }}
                                    onClick={() => openModal(index)}
                                >
                                    <Image
                                        src={image.url}
                                        alt={image.caption || `${project.title} - Image ${index + 1}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 group-hover:backdrop-blur-xs transition-colors duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-white/0 dark:bg-black/0 rounded-full p-3">
                                                <FaMagnifyingGlassPlus className="w-8 h-8 text-gray-900 dark:text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image Type Badge */}
                                    {image.type === 'thumbnail' && (
                                        <span className="absolute top-2 right-2 bg-darkColor/40 text-white text-xs px-2 py-1 rounded-full">
                                            Thumbnail
                                        </span>
                                    )}

                                    {/* Image Caption */}
                                    {image.caption && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 group-hover:from-transparent">
                                            <p className="text-white text-sm line-clamp-2">
                                                {image.caption}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Projects */}
            {transformedRelated.length > 0 && (
                <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="margin">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Projects</h2>
                        <CardPost
                            mode="grid"
                            data={transformedRelated}
                            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                        />
                    </div>
                </section>
            )}

            {/* Image Gallery Modal */}
            <ImageGalleryModal
                images={project.images || []}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialIndex={selectedImageIndex}
            />
        </>
    );
}