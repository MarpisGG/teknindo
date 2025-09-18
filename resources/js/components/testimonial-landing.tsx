import { Testimonial } from '@/components/ui/testimonial-card';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Testimoni {
    id: number;
    name: string;
    testimonial: string;
    rating: number;
}

export function TestimonialLanding() {
    const [startIndex, setStartIndex] = useState(0);
    const [testimoni, setTestimoni] = useState<Testimoni[]>([]);

    useEffect(() => {
        axios
            .get('/api/testimonis')
            .then((response) => setTestimoni(response.data))
            .catch((error) => console.error('Error fetching testimonials:', error));
    }, []);

    const testimonials = testimoni;
    const total = testimonials.length;

    if (total === 0) {
        return <p className="text-center text-2xl font-semibold text-red-500">No testimonials available.</p>;
    }

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
                {getVisibleTestimonials().map((testimonial) => (
                    <Testimonial key={testimonial.id} {...testimonial} id={testimonial.id.toString()} />
                ))}
            </motion.div>
        </div>
    );
}
