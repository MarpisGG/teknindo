import { motion } from 'framer-motion';
import React, { useState } from 'react';
import excavator from '../../assets/image/excavator-services.png';

const services = [
    {
        title: 'Heavy Equipment & Truck Distribution',
        description: 'Supplying reliable heavy machinery and trucks to power your operations with trusted performance.',
        image: '🚛', // Truck
    },
    {
        title: 'Equipment Rental Services',
        description: 'Offering heavy equipment, dump trucks, and operational vehicles on flexible rental terms to keep projects running smoothly.',
        image: '📦', // Rental/Service
    },
    {
        title: 'Industrial Supplies',
        description: 'Delivering bulk industrial equipment, project hardware, and lubricants to meet the growing needs of diverse industries.',
        image: '⚙️', // Industrial gear
    },
    {
        title: 'Tire Manufacturing',
        description: 'Producing durable, high-performance tires designed specifically for heavy equipment and dump trucks.',
        image: '🔘', // Tire
    },
    {
        title: 'Agricultural & Compact Machinery',
        description: 'Providing versatile machines for agricultural productivity and smaller-scale industrial applications.',
        image: '🚜', // Tractor
    },
    {
        title: 'Mining Contractor Services',
        description: 'Supporting mining operations with professional hauling and contractor services, built on safety and efficiency.',
        image: '⛏️', // Mining
    },
];

const ITEMS_PER_PAGE = 3;

const ServiceIntroSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - ITEMS_PER_PAGE, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + ITEMS_PER_PAGE, services.length - ITEMS_PER_PAGE));
    };

    const visibleServices = services.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);

    return (
        <section className="bg-white px-6 py-8 dark:bg-[#ffff]">
            <div className="mx-auto flex max-w-6xl flex-col-reverse gap-12 lg:flex-row lg:items-center">
                {/* Left - Carousel */}
                <div className="flex flex-col lg:w-2/3">
                    <div className="ms-0 md:ms-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="mb-6 text-3xl font-bold text-gray-900 dark:text-white"
                        >
                            Your Equipment, Our Priority
                        </motion.h2>
                        <p className="mb-8 max-w-md text-gray-600 dark:text-gray-300">
                            Reliable service and expert care to keep your machines running at their best—so you can focus on what matters most.
                        </p>
                    </div>

                    <div className="relative flex flex-col gap-6">
                        {/* Carousel with side navigation */}
                        <div className="flex items-center gap-4">
                            {/* Previous Button */}
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className="group flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xl font-bold text-gray-700 shadow transition hover:bg-gray-100 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                            >
                                ←
                            </button>

                            {/* Carousel Grid */}
                            <div className="grid min-h-[220px] flex-1 grid-cols-1 gap-4 md:grid-cols-3">
                                {visibleServices.map((service, index) => (
                                    <motion.div
                                        key={service.title}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex h-full flex-col rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 p-5 shadow-lg ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-2xl dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 dark:ring-neutral-800"
                                    >
                                        <motion.div
                                            drag="x"
                                            dragConstraints={{ left: -50, right: 50 }}
                                            dragElastic={0.3}
                                            onDragEnd={(event, info) => {
                                                if (info.offset.x > 80 && currentIndex > 0) {
                                                    handlePrev();
                                                } else if (info.offset.x < -80 && currentIndex + ITEMS_PER_PAGE < services.length) {
                                                    handleNext();
                                                }
                                            }}
                                            className="mb-3 flex cursor-grab items-center justify-center active:cursor-grabbing"
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <span className="text-4xl">{service.image}</span>
                                        </motion.div>
                                        <p className="mb-2 text-center text-base font-semibold text-gray-900 dark:text-white">{service.title}</p>
                                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">{service.description}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={handleNext}
                                disabled={currentIndex + ITEMS_PER_PAGE >= services.length}
                                className="group flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xl font-bold text-gray-700 shadow transition hover:bg-gray-100 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right - Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="lg:w-1/3"
                >
                    <img
                        src={excavator}
                        alt="Excavator"
                        className="mx-auto h-auto w-full max-w-md transition-transform duration-300 hover:scale-105"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default ServiceIntroSection;
