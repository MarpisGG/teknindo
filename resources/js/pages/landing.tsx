import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import LandingBlog from '@/components/landing-blog';
import LocationMap from '@/components/location-map';
import Navbar from '@/components/navbar';
import ServiceCard from '@/components/service-card';
import SliderImage from '@/components/slider-image';
import Statistic from '@/components/statistic';
import { TestimonialLanding } from '@/components/testimonial-landing';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import HorizontalScrollCarouselDemo from './demo';

interface Types {
    id?: number;
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Welcome() {
    const [types, setTypes] = useState<Types[]>([]);
    useEffect(() => {
        axios
            .get('/api/types')
            .then((response) => setTypes(response.data))
            .catch((error) => console.error('Error fetching types:', error));
    }, []);

    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome" />
            <Navbar />
            <div className="relative min-h-screen overflow-hidden text-[#1b1b18]">
                <div
                    className="absolute top-0 left-0 z-0 h-full w-full"
                    style={{
                        perspective: '1px',
                        overflow: 'hidden',
                        height: '100%',
                    }}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        className="absolute top-0 left-0 h-full w-full object-cover"
                        src="/videos/videolanding.mp4"
                        style={{
                            transform: 'translateZ(-1px) scale(2)',
                            minHeight: '100vh',
                            minWidth: '100vw',
                        }}
                    />
                </div>
                <motion.div
                    className="absolute inset-0 z-10 bg-black/50"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 2, duration: 0.5 }}
                />
                <motion.div
                    className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <motion.h1
                        className="mx-auto max-w-xl text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 2.5, duration: 0.5 }}
                    >
                        Your Best Partner Of
                        <br />
                        <h1 className="block text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">Heavy Equipment and Spare Parts</h1>
                    </motion.h1>
                </motion.div>
            </div>
            <div className="relative z-30 flex w-full items-center justify-center bg-[#d9d9d9]">
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-4 py-8 md:grid-cols-2">
                    <div className="flex max-w-full items-center justify-center overflow-hidden border-gray-300 px-4 text-center md:border-r">
                        <div className="flex h-full w-full items-center justify-center">
                            <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl">
                                <SliderImage />
                            </div>
                        </div>
                    </div>
                    <div className="px-6 md:px-6">
                        <p className="text-lg">
                            Teknindo Group is a group of companies providing heavy equipment, spare parts, and services for the mining, construction,
                            and industrial sectors. Established in 2018 through its parent company PT. Mitra Teknindo Sejati (MTS), the Group has now
                            expanded into seven member companies. With continuous growth and innovation, Teknindo Group is committed to becoming a
                            competent and integrated enterprise, contributing to national development and creating more job opportunities in
                            Indonesia.
                        </p>
                        <motion.div
                            className="mt-4 flex"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Link href="/about" className="mr-4">
                                <InteractiveHoverButton text="About Us" className="w-40" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <HorizontalScrollCarouselDemo />
            </div>
            <div className="w-full bg-[#FCC200] px-0">
                <div className="py-8 text-center">
                    <h1 className="text-4xl font-bold">Our Products</h1>
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-wrap justify-center">
                        {types.map((type, idx) => {
                            const isGray = idx % 4 === 1 || idx % 4 === 2; // 1 dan 2 dari 0-based
                            return (
                                <motion.div
                                    key={type.id}
                                    className={`flex w-full flex-col py-4 md:w-[50%] ${isGray ? 'bg-[#d9d9d9]' : 'bg-white'}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                    viewport={{ once: true }}
                                >
                                    <img
                                        src={`/storage/${type.image}`}
                                        alt={type.name}
                                        className="h-64 w-full object-contain transition-transform duration-300 hover:scale-105"
                                    />
                                    <div className="mx-auto flex max-w-md flex-col gap-4 p-6">
                                        <h2 className="-900 text-2xl font-bold">{type.name}</h2>
                                        <p className="-700 text-base">{type.description}</p>
                                        <div className="flex justify-center">
                                            <Link href={`/products/${type.slug ?? type.id}`}>
                                                <InteractiveHoverButton className={`w-48 py-2 text-base font-medium ${isGray ? '' : 'bg-[#d9d9d9]'}`}>
                                                    Learn More
                                                </InteractiveHoverButton>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Statistic />
            <motion.section
                className="bg-[#181818] px-6 pb-8 text-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="mx-auto max-w-6xl text-center">
                    <motion.div className="py-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <h1 className="mb-4 text-4xl font-bold">Why Choose Us?</h1>
                        <p className="mx-auto mb-4 max-w-2xl text-lg">
                            We provide a comprehensive range of services to meet all your heavy equipment needs, from procurement to support.
                        </p>
                    </motion.div>

                    <motion.div className="pb-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <ServiceCard />
                    </motion.div>
                </div>
            </motion.section>
            <motion.section className="py-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <motion.div className="mx-auto max-w-6xl px-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h1 className="-900 mb-4 text-center text-3xl font-bold">What Our Clients Say</h1>
                    <p className="-600 mx-auto mb-4 max-w-2xl text-center text-lg">
                        Hear from our satisfied clients about their experiences with our services and how we have helped them achieve their project
                        goals.
                    </p>
                    <TestimonialLanding />
                </motion.div>
            </motion.section>
            <div className="flex flex-col items-center bg-black text-white lg:justify-center lg:p-8">
                <div className="mt-8 flex flex-col items-center justify-center">
                    <h1 className="text-center text-4xl font-bold text-white">Branch Locations & Service Points</h1>
                    <p className="my-4 max-w-2xl px-4 text-center text-lg text-white md:px-0">
                        With multiple branches and service centers, we ensure faster response times, seamless support, and better accessibility
                        wherever you are.
                    </p>
                </div>
            </div>
            <LocationMap />
            <div className="flex w-full items-center justify-center bg-[#d9d9d9]">
                <div className="mx-auto px-4">
                    <LandingBlog />
                </div>
            </div>
            <motion.div className="" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <motion.div
                    className="mx-auto w-[80%] max-w-6xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h1 className="-900 mb-4 pt-8 text-center text-3xl font-bold">Let’s Work Together</h1>
                    <p className="-600 mx-auto max-w-xl pb-8 text-lg md:text-center">
                        Interested in partnering with us?
                        <Link href="/contact" className="-800 mx-1 font-bold hover:text-[#FCC200] hover:underline">
                            Contact Us
                        </Link>
                        to start a conversation about collaboration or procurement.
                    </p>
                </motion.div>
            </motion.div>

            <FloatingQuickActions />
            <Footer7 />
        </>
    );
}
