import { motion } from 'framer-motion';
import React, { useState } from 'react';
import excavator from '../../assets/image/excavator-services.png';
import periodic from '../../assets/image/service/2.png';
import inspection from '../../assets/image/service/3.png';
import troubleshooting from '../../assets/image/service/4.png';
import overhaul from '../../assets/image/service/5.png';
import sparePart from '../../assets/image/service/6.png';
import serviceContract from '../../assets/image/service/service-contract-svgrepo-com.png';

const services = [
    {
        title: 'Service Contract',
        description: 'Keep your machine protected longer with our extended warranty and repair services.',
        image: serviceContract,
    },
    {
        title: 'Periodic Service',
        description: 'Regular service to keep your equipment in top condition and ready for work anytime.',
        image: periodic,
    },
    {
        title: 'Inspection Unit',
        description: 'Thorough checks to make sure your machines are safe and free from hidden issues.',
        image: inspection,
    },
    {
        title: 'Trouble shooting',
        description: 'Fast and accurate solutions to fix any problem with your machine.',
        image: troubleshooting,
    },
    {
        title: 'Overhaul Engine',
        description: "Restore your engine's power and performance to make it feel like new.",
        image: overhaul,
    },
    {
        title: 'Spare Part Installation',
        description: 'We install spare parts properly to keep your machine strong and reliable.',
        image: sparePart,
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
                                            <img src={service.image} alt={service.title} className="h-20 w-20 object-contain" />
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
