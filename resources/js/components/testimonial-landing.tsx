import { Testimonial } from '@/components/ui/testimonial-card';
import { motion } from 'framer-motion';
import { useState } from 'react';

const testimonials = [
    {
        name: 'TB. UD. Barokah HS',
        rating: 5,
        image: 'https://i.pravatar.cc/150?u=sarah',
        testimonial:
            'The team at Teknindo Group has greatly supported my building material business with fast response, excellent service, and reliable assistance for loading and delivery operations.',
    },
    {
        name: 'PT. Advanced Agri Indonesia',
        rating: 5,
        image: 'https://i.pravatar.cc/150?u=john',
        testimonial:
            "I chose this product because of its great quality. The spare parts are easy to find, delivery time matches the estimate, and the service is very fast and responsive. I'm happy to recommend it to others.",
    },
    {
        name: 'PT Kayu Karet Cemerlang',
        company: 'Microsift',
        rating: 5,
        image: 'https://i.pravatar.cc/150?u=emily',
        testimonial:
            "The product is economical, the spare parts are easy to find, and it offers a win-win solution for both sides. It's been a smart choice for my business.",
    },
];

export function TestimonialLanding() {
    const [startIndex, setStartIndex] = useState(0);
    const total = testimonials.length;

    const getVisibleTestimonials = () => {
        return Array.from({ length: 3 }, (_, i) => testimonials[(startIndex + i) % total]);
    };

    const handleNext = () => {
        setStartIndex((prev) => (prev + 1) % total);
    };

    const handlePrev = () => {
        setStartIndex((prev) => (prev - 1 + total) % total);
    };

    const handleDragEnd = (_: any, info: any) => {
        if (info.offset.x < -50) {
            handleNext();
        } else if (info.offset.x > 50) {
            handlePrev();
        }
    };

    return (
        <div className="container flex flex-col items-center gap-8 overflow-hidden px-4">
            <motion.div
                key={startIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="grid w-full max-w-[76rem] cursor-grab gap-6 py-4 active:cursor-grabbing sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
                {getVisibleTestimonials().map((testimonial, idx) => (
                    <Testimonial key={idx} {...testimonial} />
                ))}
            </motion.div>
        </div>
    );
}
