// components/project-card-skeleton.jsx

import { Skeleton } from "./ui/skleton";

export function ProjectCardSkeleton() {
    return (
        <div className="group relative overflow-hidden rounded-main border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            {/* Image Skeleton */}
            <Skeleton className="h-[60lvh] w-full" />
            <div className="absolute bottom-0 left-0 right-0 space-y-2 bg-lightColor dark:bg-darkColor m-3 rounded-main p-4 bg-opacity-70 backdrop-blur-sm">
                <Skeleton className="h-6 w-3/4 invert opacity-10 rounded-md" />
                <Skeleton className="h-4 w-full invert opacity-10 rounded-md" />
                <Skeleton className="h-4 w-5/6 invert opacity-10 rounded-md" />
            </div>


        </div>
    );
}

// Grid Skeleton for multiple cards
export function ProjectGridSkeleton({ count = 12, gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" }) {
    return (
        <section className="margin py-10">
            <div className={`grid ${gridCols} gap-3`}>
                {Array.from({ length: count }).map((_, index) => (
                    <ProjectCardSkeleton key={index} />
                ))}
            </div>
        </section>
    );
}