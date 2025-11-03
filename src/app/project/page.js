'use client'
import { CardPost } from "@/components/card-post";
import { Button } from "@/components/ui/button";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useProjects } from '@/hooks/useProjects';

export default function ProjectArticlePage() {
    const { data, loading, error, pagination } = useProjects({
        page: 1,
        limit: 12,
    });

    // Transform data ke format yang dibutuhkan CardPost
    const transformedProjects = data?.map(project => ({
        id: project.id,
        title: project.title,
        category: project.category,
        location: project.location,
        year: project.date?.split('/')[2] || '', // Extract year from DD/MM/YYYY
        description: project.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' || '', // Strip HTML and truncate
        image: project.thumbnail || project.imageUrl[0] || 'https://images.unsplash.com/photo-1519143009590-e3800b9df468',
    })) || [];

    return (
        <>
            <img
                src="https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1758"
                alt="Under Construction"
                className="object-cover w-full max-h-[50vh] h-[50lvh] md:h-full"
            />
            <section className="margin py-10 md:py-20">
                <div className="flex flex-col md:flex-row gap-5 justify-between">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter text-balance pb-1">
                        Our Project  <br />
                        <span className="text-neutral-600 dark:text-neutral-400">
                            & Activity
                        </span>
                    </h1>
                    <div className="space-y-3">
                        <p className="text-sm sm:text-base leading-5 md:leading-6 max-w-2xl">
                            Menampilkan berbagai proyek dan aktifitas yang telah GEC selesaikan dengan standar mutu tinggi, presisi teknik, dan dedikasi penuh terhadap kepuasan mitra.
                        </p>
                        <Button>
                            Explore <MdOutlineArrowOutward className="rotate-90" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Loading State */}
            {loading && (
                <div className="margin py-20 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="margin py-10">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <p className="text-red-800 dark:text-red-200">
                            Failed to load projects: {error}
                        </p>
                        <Button
                            onClick={() => window.location.reload()}
                            className="mt-4"
                            variant="outline"
                        >
                            Retry
                        </Button>
                    </div>
                </div>
            )}

            {/* Projects Grid */}
            {!loading && !error && (
                <>
                    <CardPost
                        mode="grid"
                        data={transformedProjects}
                        gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                    />

                    {/* Pagination Info */}
                    {pagination && (
                        <div className="margin py-10 flex flex-col items-center gap-4">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Showing {transformedProjects.length} of {pagination.total} projects
                            </p>

                            {pagination.totalPages > 1 && (
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        disabled={!pagination.hasPrev}
                                        onClick={() => {
                                            // Implement pagination logic here
                                            console.log('Previous page');
                                        }}
                                    >
                                        Previous
                                    </Button>
                                    <span className="px-4 py-2 text-sm">
                                        Page {pagination.page} of {pagination.totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        disabled={!pagination.hasNext}
                                        onClick={() => {
                                            // Implement pagination logic here
                                            console.log('Next page');
                                        }}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
}