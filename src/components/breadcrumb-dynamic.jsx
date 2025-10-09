"use client"
import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { slugify } from '@/lib/slugify';

export const BreadcrumbDynamic = ({ 
    className = ""
}) => {
    const path = usePathname();

    const pathnames = path
        .split('/')
        .filter((x) => x)
        .map((segment) => segment.replace(/-/g, ' '));

    return (
        <div className={className}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">
                                Home
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {pathnames.map((value, index) => {
                        const slug = slugify(value);
                        const to = `/${pathnames
                            .slice(0, index + 1)
                            .map(slugify)
                            .join('/')}`;
                        const isLast = index === pathnames.length - 1;
                        return (
                            <React.Fragment key={to}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage className="capitalize font-medium">
                                            {value.charAt(0).toUpperCase() + value.slice(1)}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link href={to} className='capitalize'>
                                                {value.charAt(0).toUpperCase() + value.slice(1)}
                                            </Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};