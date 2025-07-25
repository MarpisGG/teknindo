import { Testimonial } from '@/components/ui/testimonial-card';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Product Manager',
        company: 'Amazun',
        rating: 5,
        image: 'https://i.pravatar.cc/150?u=sarah',
        testimonial: 'This library has completely transformed how we build our UI components. Highly recommended!',
    },
    {
        name: 'John Doe',
        role: 'Software Engineer',
        company: 'Goggle',
        rating: 4,
        image: 'https://i.pravatar.cc/150?u=john',
        testimonial: "The components are well documented and easy to customize. I'm very happy with my purchase.",
    },
    {
        name: 'Emily Chen',
        role: 'UX Designer',
        company: 'Microsift',
        rating: 5,
        image: 'https://i.pravatar.cc/150?u=emily',
        testimonial: 'The accessibility features and design system consistency are impressive.',
    },
    {
        name: 'Michael Smith',
        role: 'CTO',
        company: 'Startapp',
        rating: 5,
        image: 'https://i.pravatar.cc/150?u=michael',
        testimonial: 'Outstanding library. Great support and very developer-friendly.',
    },
    {
        name: 'Linda Brown',
        role: 'Frontend Developer',
        company: 'Frontendify',
        rating: 4,
        image: 'https://i.pravatar.cc/150?u=linda',
        testimonial: 'Clean components and great for accessibility.',
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
                className="grid w-full max-w-[76rem] cursor-grab gap-6 active:cursor-grabbing sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
                {getVisibleTestimonials().map((testimonial, idx) => (
                    <Testimonial key={idx} {...testimonial} />
                ))}
            </motion.div>

            <div className="flex gap-4">
                <button onClick={handlePrev} className="rounded-full border p-2 transition hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <ChevronLeft />
                </button>
                <button onClick={handleNext} className="rounded-full border p-2 transition hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}
