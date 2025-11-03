'use client'
import { useState } from 'react';
import Image from 'next/image';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { Button } from './ui/button';
import { X } from 'lucide-react';

export function ImageGalleryModal({ images, isOpen, onClose, initialIndex = 0 }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    if (!isOpen || !images || images.length === 0) return null;

    const currentImage = images[currentIndex];

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
    };

    return (
        <div
            className="fixed inset-0 z-999 bg-black/35 backdrop-blur-sm flex items-center justify-center"
            onClick={handleBackdropClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close"
            >
                <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Buttons */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous"
            >
                <HiChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
                onClick={goToNext}
                className="absolute right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next"
            >
                <HiChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4 flex flex-col items-center justify-center">
                <div className="relative w-full h-[75vh]">
                    <Image
                        src={currentImage.url}
                        alt={currentImage.caption || 'Gallery Image'}
                        fill
                        className="object-contain"
                        quality={100}
                        priority
                    />
                </div>
            </div>

                {/* Image Caption */}
                {currentImage.caption && (
                    <div className="absolute top-5 text-center">
                        <p className="text-white md:text-base px-4 py-2 bg-lightColor/20 rounded-full text-xs">
                            {currentImage.caption}
                        </p>
                    </div>
                )}

            {/* Counter */}
            <div className="absolute bottom-5 right-5 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-white text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                </p>
            </div>

            {/* Thumbnail Strip (Optional) */}
            <div className="absolute bottom-5 left-5 overflow-x-auto">
                <div className="flex gap-2 justify-center">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${index === currentIndex
                                    ? 'border-white'
                                    : 'border-transparent opacity-50 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={image.url}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}