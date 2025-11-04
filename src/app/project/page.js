'use client'
import { CardPost } from "@/components/card-post";
import { Button } from "@/components/ui/button";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useProjects } from '@/hooks/useProjects';
import { ProjectGridSkeleton } from '@/components/project-card-skeleton';
import { ReusableBanner } from "@/components/reusable-banner";

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
        year: project.date?.split('/')[2] || '',
        description: project.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' || '',
        image: project.thumbnail || project.imageUrl[0] || 'https://images.unsplash.com/photo-1519143009590-e3800b9df468',
    })) || [];

    return (
        <>
            <ReusableBanner
                imageSrc="https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d"
                imageAlt="Our Projects"
                title="Our Project"
                titleHighlight="& Activity"
                description="Menampilkan berbagai proyek dan aktifitas yang telah GEC selesaikan dengan standar mutu tinggi, presisi teknik, dan dedikasi penuh terhadap kepuasan mitra."
                buttonText="Explore"
                buttonIcon={<MdOutlineArrowOutward className="rotate-90" />}
            />

            {/* Loading State with Skeleton */}
            {loading && (
                <ProjectGridSkeleton
                    count={6}
                    gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                />
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