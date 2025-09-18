import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const images = [
    '/image/product/6.png',
    '/image/product/7.png',
    '/image/product/8.png',
    '/image/product/9.png',
    '/image/product/10.png',
    '/image/product/11.png',
    '/image/product/12.png',
    '/image/product/13.png',
    '/image/product/14.png',
    '/image/product/15.png',
    '/image/product/16.png',
];
const SLIDE_INTERVAL = 3000;

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
    }),
};

const SliderImageProduct: React.FC = () => {
    const [[current, direction], setCurrent] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrent(([prev]) => [(prev + 1) % images.length, 1]);
        }, SLIDE_INTERVAL);

        return () => clearTimeout(timeout);
    }, [current]);

    const handleDragEnd = (_: any, info: any) => {
        if (info.offset.x < -50) {
            setCurrent(([prev]) => [(prev + 1) % images.length, 1]);
        } else if (info.offset.x > 50) {
            setCurrent(([prev]) => [(prev - 1 + images.length) % images.length, -1]);
        }
    };

    return (
        <div className="relative flex min-h-[200px] w-full max-w-full justify-center overflow-hidden md:min-h-[100vh]">
            <motion.div
                className="absolute inset-0 h-full w-full"
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={handleDragEnd}
                style={{ touchAction: 'pan-y' }}
            >
                <img
                    src={images[current]}
                    alt={`Slide ${current + 1}`}
                    className="h-full w-full object-fill"
                    draggable={false}
                    style={{ maxHeight: '100%', width: '100%' }}
                />
            </motion.div>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-4">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrent([idx, idx > current ? 1 : -1])}
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

export default SliderImageProduct;
