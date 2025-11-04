'use client'

import { useState, useEffect, useRef } from 'react';

const StatCard = ({ finalValue, label, description, duration = 2000, delay = 0 }) => {
    const [displayValue, setDisplayValue] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const hasAnimated = useRef(false);

    // Fungsi untuk generate random value berdasarkan format
    const generateRandomValue = (template) => {
        if (template.includes('%')) {
            return `${Math.floor(Math.random() * 100)}%`;
        } else if (template.includes('K')) {
            return `${Math.floor(Math.random() * 999)}K`;
        } else if (template.includes('M')) {
            return `${Math.floor(Math.random() * 10)}M`;
        } else if (template.includes('+')) {
            return `${Math.floor(Math.random() * 99)}+`;
        }
        return template;
    };

    useEffect(() => {
        // Trigger animation saat component mount atau masuk viewport
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;

                        setTimeout(() => {
                            setIsAnimating(true);

                            // Random switching phase
                            const switchInterval = setInterval(() => {
                                setDisplayValue(generateRandomValue(finalValue));
                            }, 50);

                            // Stop dan tampilkan nilai final
                            setTimeout(() => {
                                clearInterval(switchInterval);
                                setDisplayValue(finalValue);
                                setIsAnimating(false);
                            }, duration);
                        }, delay);
                    }
                });
            },
            { threshold: 0.3 }
        );

        const element = document.getElementById(`stat-${label}`);
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, [finalValue, duration, delay, label]);

    return (
        <div
            id={`stat-${label}`}
            className="flex flex-col items-start px-4 md:px-10 py-8 relative group"
        >
            {/* Angka Besar */}
            <div className="mb-3">
                <span
                    className={`text-5xl md:text-6xl lg:text-7xl  transition-all duration-300 text-transparent bg-clip-text bg-gradient-to-bl from-other1 via-secondaryDark to-secondaryDark dark:from-other2 dark:via-secondaryLight dark:to-secondaryLight  ${isAnimating ? 'blur-[2px]' : 'blur-0'}`}
                >
                    {displayValue || finalValue}
                </span>
            </div>

            {/* Label */}
            <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {label}
            </h3>

            {/* Deskripsi */}
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xs">
                {description}
            </p>

        </div>
    );
};

export const StatsSection = () => {
    const stats = [
        {
            value: '120+',
            label: 'Proyek Infrastruktur',
            description: 'Proyek pembangunan jalan, jembatan, dan fasilitas publik di berbagai daerah Indonesia.'
        },
        {
            value: '15+',
            label: 'Mitra Nasional',
            description: 'Bermitra dengan perusahaan konstruksi dan BUMN seperti WIKA, PP, dan Brantas Abipraya.'
        },
        {
            value: '98%',
            label: 'Kepuasan Klien',
            description: 'Konsistensi mutu dan profesionalitas dalam setiap tahap pekerjaan di lapangan.'
        },
        {
            value: '80M+',
            label: 'Nilai Kontrak',
            description: 'Total nilai proyek yang dikerjakan dengan standar nasional dan internasional.'
        }
    ];

    return (
        <section className="rounded-main overflow-hidden  spacing">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-gray-200">
                {stats.map((stat, index) => (
                    <StatCard
                        key={stat.label}
                        finalValue={stat.value}
                        label={stat.label}
                        description={stat.description}
                        duration={1000}
                        delay={index * 200}
                    />
                ))}
            </div>
        </section>
    );
};