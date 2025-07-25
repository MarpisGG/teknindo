import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import ServiceCard from '@/components/service-card';
import ServiceIntroSection from '@/components/service-intro';
import Statistic from '@/components/statistic';
import { TestimonialService } from '@/components/testimonial-services';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React from 'react';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Service = () => {
    const CountUp = ({ end, duration }: { end: number; duration: number }) => {
        const [count, setCount] = React.useState(0);
        const [isVisible, setIsVisible] = React.useState(false);
        const countRef = React.useRef<HTMLSpanElement>(null);

        React.useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                },
                { threshold: 0.1 },
            );

            if (countRef.current) {
                observer.observe(countRef.current);
            }

            return () => observer.disconnect();
        }, []);

        React.useEffect(() => {
            if (!isVisible) return;

            if (count < end) {
                const incrementTime = (duration * 1000) / end;
                const timer = setTimeout(() => {
                    setCount((prevCount) => Math.min(prevCount + 1, end));
                }, incrementTime);

                return () => clearTimeout(timer);
            }
        }, [count, end, duration, isVisible]);

        return <span ref={countRef}>{count}</span>;
    };

    return (
        <>
            <Head title="Our Services" />
            <Navbar />
            <motion.div
                className="mt-16 bg-[#FCC200] p-8 pb-8 text-center shadow-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="mx-auto hidden max-w-6xl md:block">
                    <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
                        <ol className="list-reset flex">
                            <li>
                                <Link href="/" className="text-gray-700 hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <span className="mx-2"> &gt; </span>
                            </li>
                            <li className="font-semibold text-gray-900">Service</li>
                        </ol>
                    </nav>
                </div>
                <h1 className="relative mb-4 inline-block text-5xl font-extrabold tracking-tight text-slate-800 md:text-5xl">
                    <span className="relative z-10 text-5xl">Services</span>
                    <span
                        className="absolute top-0 left-0 z-0 translate-x-1 translate-y-1 text-5xl text-slate-800 opacity-30 blur-sm"
                        aria-hidden="true"
                    >
                        Services
                    </span>
                </h1>
                <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
                    We are committed to delivering the best heavy equipment solutions for your projects.
                </p>
            </motion.div>

            <ServiceIntroSection />

            <motion.section
                className="bg-[#FCC200] px-6 py-8 dark:bg-[#0a0a0a]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="mx-auto max-w-6xl text-center">
                    <motion.div className="py-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Why Choose Us?</h1>
                        <p className="mx-auto mb-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                            We provide a comprehensive range of services to meet all your heavy equipment needs, from procurement to support.
                        </p>
                    </motion.div>

                    <motion.div className="pb-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <ServiceCard />
                    </motion.div>
                </div>
            </motion.section>

            <Statistic />

            <motion.section
                className="bg-[#FCC200] py-10 dark:bg-gray-900"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <motion.div className="mx-auto max-w-6xl px-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">Service Testimonials</h1>
                    <p className="mx-auto mb-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">
                        Discover what our clients say about the quality and impact of our specialized services. Their feedback highlights our
                        commitment to excellence in every project we undertake.
                    </p>
                    <TestimonialService />
                </motion.div>
            </motion.section>

            <motion.div className="dark:bg-[#0a0a0a]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <motion.div
                    className="mx-auto w-[80%] max-w-6xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h1 className="mb-4 pt-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Let’s Work Together</h1>
                    <p className="mx-auto max-w-xl pb-8 text-justify text-lg text-gray-600 md:text-center dark:text-gray-400">
                        Interested in partnering with us?
                        <Link href="/contact" className="mx-1 font-bold text-gray-800 hover:text-[#FCC200] hover:underline dark:text-white">
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
};

export default Service;
