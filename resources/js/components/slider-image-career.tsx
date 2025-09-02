import React, { useEffect, useRef, useState } from 'react';
import slider1 from '../../assets/image/career1 (1).jpg';
import slider2 from '../../assets/image/career2 (1).jpg';
import slider3 from '../../assets/image/career3 (1).jpg';
import slider4 from '../../assets/image/career4 (1).jpg';
import slider5 from '../../assets/image/career5 (1).jpg';

const images = [slider1, slider2, slider3, slider4, slider5];
const SLIDE_INTERVAL = 3000; // 3 seconds

const SliderImageCareer: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, SLIDE_INTERVAL);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current]);

    return (
        <div className="relative flex h-[40vh] w-full max-w-full justify-center overflow-hidden rounded-xl md:h-[40vh] lg:h-[50vh]">
            {images.map((img, idx) => (
                <img
                    key={idx}
                    src={img}
                    alt={`Slide ${idx + 1}`}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                        idx === current ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            ))}

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrent(idx)}
                        className={`h-2 w-2 rounded-full border border-gray-700 transition-all duration-200 focus:outline-none ${
                            idx === current ? 'scale-125 cursor-default bg-white shadow-lg' : 'cursor-pointer bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                        tabIndex={0}
                    />
                ))}
            </div>
        </div>
    );
};

export default SliderImageCareer;
