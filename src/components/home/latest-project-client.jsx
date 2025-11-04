'use client'
import { useProjects } from "@/hooks/useProjects";
import { ProjectGridSkeleton } from "../project-card-skeleton";
import { Button } from "../ui/button";
import { CardPost } from "../card-post";

export const LatestProjectClient = () => {

    const { data: projects, loadingProject, errorProject } = useProjects({
        page: 1,
        limit: 12,
        published: true,
    });

    // Transform data ke format yang dibutuhkan CardPost
    const transformedProjects = projects?.map(project => ({
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
            {/* Loading State with Skeleton */}
            {loadingProject && (
                <ProjectGridSkeleton
                    count={6}
                    gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                />
            )}

            {!loadingProject && !errorProject && (
                <>
                    <CardPost
                        mode="carousel"
                        showTitle={true}
                        title="Latest Projects"
                        data={transformedProjects}
                        gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                        loading={loadingProject}
                    />
                </>
            )}

            {/* Error State */}
            {errorProject && (
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


        </>
    )
}