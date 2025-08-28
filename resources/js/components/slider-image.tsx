import React, { useEffect, useRef, useState } from 'react';

// Gunakan path public langsung (tanpa import)
const images = ['/image/1.jpg', '/image/2.jpg', '/image/3.jpg', '/image/4.jpg', '/image/5.jpg', '/image/6.jpg'];

const SLIDE_INTERVAL = 3000; // 3 seconds

const SliderImage: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [imageLoaded, setImageLoaded] = useState<boolean[]>(new Array(images.length).fill(false));
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, SLIDE_INTERVAL);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current]);

    const handleImageLoad = (index: number) => {
        setImageLoaded((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleImageError = (index: number) => {
        console.warn(`Failed to load image: ${images[index]}`);
    };

    return (
        <div className="relative flex h-[40vh] w-full max-w-full justify-center overflow-hidden rounded-xl md:h-[40vh] lg:h-[50vh]">
            {images.map((imgSrc, idx) => (
                <div key={idx} className="absolute inset-0">
                    <img
                        src={imgSrc}
                        alt={`Slide ${idx + 1}`}
                        className={`h-full w-full object-cover transition-opacity duration-500 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => handleImageLoad(idx)}
                        onError={() => handleImageError(idx)}
                        loading={idx === 0 ? 'eager' : 'lazy'} // Load first image immediately
                    />
                    {/* Loading placeholder */}
                    {!imageLoaded[idx] && (
                        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-200">
                            <div className="text-gray-400">Loading...</div>
                        </div>
                    )}
                </div>
            ))}

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrent(idx)}
                        className={`h-2 w-2 rounded-full border border-gray-700 transition-all duration-200 focus:outline-none ${
                            idx === current ? 'scale-125 cursor-default bg-white shadow-lg' : 'cursor-pointer bg-gray-400 hover:bg-gray-300'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                        tabIndex={0}
                    />
                ))}
            </div>

            {/* Navigation arrows (optional) */}
            <button
                type="button"
                onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 focus:ring-2 focus:ring-white focus:outline-none"
                aria-label="Previous slide"
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                type="button"
                onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
                className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 focus:ring-2 focus:ring-white focus:outline-none"
                aria-label="Next slide"
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default SliderImage;
