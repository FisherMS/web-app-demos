import React, { useState, useEffect, useCallback } from 'react';

/**
 * ImageLightbox component summary:
 * An overlay gallery that displays high-resolution images of a project.
 * Supports keyboard navigation, touch swipes, and image preloading.
 */

interface ImageLightboxProps {
    isOpen: boolean;
    onClose: () => void;
    gallery: string[];
    initialIndex: number;
    title: string;
    description: string;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
    isOpen,
    onClose,
    gallery,
    initialIndex,
    title,
    description,
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isLoading, setIsLoading] = useState(true);

    // Sync index when initialIndex changes (when opening new project)
    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex, isOpen]);

    const updateContent = useCallback((index: number) => {
        if (!gallery[index]) return;
        setIsLoading(true);
        const tempImg = new Image();
        tempImg.onload = () => {
            setIsLoading(false);
        };
        tempImg.src = gallery[index];
        setCurrentIndex(index);
    }, [gallery]);

    const nextImage = useCallback(() => {
        if (gallery.length <= 1) return;
        const newIndex = (currentIndex + 1) % gallery.length;
        updateContent(newIndex);
    }, [currentIndex, gallery, updateContent]);

    const prevImage = useCallback(() => {
        if (gallery.length <= 1) return;
        const newIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        updateContent(newIndex);
    }, [currentIndex, gallery, updateContent]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, nextImage, prevImage]);

    // Body overflow control
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Swipe Logic
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            nextImage();
        } else if (isRightSwipe) {
            prevImage();
        }
        setTouchStart(null);
        setTouchEnd(null);
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 invisible"}`}
            aria-modal="true"
            role="dialog"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/95 backdrop-blur-md"
                onClick={onClose}
            ></div>

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Nav Buttons */}
            {gallery.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors hidden md:block"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors hidden md:block"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </>
            )}

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
                <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center pointer-events-auto">
                    {/* Image */}
                    <img
                        src={gallery[currentIndex]}
                        alt={title}
                        className={`max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl transition-all duration-300 transform ${isLoading ? "scale-95 opacity-50" : "scale-100 opacity-100"}`}
                    />

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* Description Box */}
                    <div className="mt-6 text-center max-w-2xl px-4">
                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{title}</h3>
                        <p className="text-white/80 text-sm leading-relaxed font-light">{description}</p>
                        {gallery.length > 1 && (
                            <div className="text-white/40 text-xs mt-2">
                                {currentIndex + 1} / {gallery.length}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageLightbox;
