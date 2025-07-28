import CardCareerCulture from '@/components/card-career-culture';
import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import SliderImage from '@/components/slider-image';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { TestimonialCareer } from '@/components/ui/testimonial-career';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import bg from '../../assets/image/career.png';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

const zoomIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.6 },
    },
};

const bounceIn = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, type: 'spring' as const, stiffness: 120 },
    },
};

function Career() {
    return (
        <>
            <div className="pb-16">
                <Navbar />
            </div>

            {/* HERO SECTION */}
            <motion.div
                className="relative flex w-full items-center justify-center px-4 py-8"
                style={{
                    height: 'calc(100vh - 64px)',
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="absolute top-8 left-4 z-10 flex items-center text-white md:left-48">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex space-x-2 text-sm">
                            <li>
                                <a href="/" className="font-medium hover:underline">
                                    Home
                                </a>
                            </li>
                            <li>
                                <span className="mx-2">›</span>
                            </li>
                            <li className="font-semibold">Career</li>
                        </ol>
                    </nav>
                </div>

                <motion.div
                    className="absolute bottom-12 left-4 z-10 mx-auto flex w-full max-w-xs flex-col items-start justify-end text-white md:left-48 md:max-w-6xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <motion.p className="mb-2 max-w-xl text-5xl font-bold" variants={fadeInUp}>
                        Grow With Us at Teknindo Group
                    </motion.p>
                    <motion.p className="max-w-xl" variants={fadeInUp}>
                        Explore opportunities to build a future in the heavy equipment industry with one of Indonesia's leading authorized dealers.
                    </motion.p>
                </motion.div>
            </motion.div>

            {/* IMAGE & WHY JOIN */}
            <motion.div className="relative z-30 flex w-full items-center justify-center" variants={fadeInUp}>
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-4 py-8 md:grid-cols-2">
                    <motion.div
                        className="flex max-w-full items-center justify-center overflow-hidden px-4 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={zoomIn}
                    >
                        <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl">
                            <SliderImage />
                        </div>
                    </motion.div>

                    <motion.div className="px-6 md:px-6" variants={fadeInUp}>
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Why Join Us?</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            At Teknindo Group, we believe that our people are the driving force behind our success. We offer not just a job, but a
                            place where your ideas matter, your growth is prioritized, and your achievements are recognized. If you’re looking for a
                            place to learn, lead, and grow—this is it.
                        </p>

                        <motion.div className="mt-4 flex" initial="hidden" whileInView="visible" variants={bounceIn} viewport={{ once: true }}>
                            <a href="/career/jobs" className="mr-4">
                                <InteractiveHoverButton text="View All Jobs" className="w-52" style={{ background: '#d9d9d9' }} />
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* CULTURE */}
            <motion.div className="bg-[#d9d9d9]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <CardCareerCulture />
            </motion.div>

            {/* TESTIMONIAL */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <TestimonialCareer />
            </motion.div>

            {/* CTA SECTION */}
            <motion.div
                className="bg-[#FCC200] dark:bg-[#0a0a0a]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <motion.div className="mx-auto w-[80%] max-w-7xl" variants={fadeInUp}>
                    <h1 className="mb-4 pt-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Join Our Team</h1>
                    <p className="mx-auto max-w-5xl pb-8 text-justify text-lg text-gray-600 md:text-center dark:text-gray-400">
                        Are you passionate, driven, and ready to grow?
                        <br />
                        <Link href="/career/jobs" className="mx-1 text-xl font-bold text-gray-800 hover:underline dark:text-white">
                            Explore our open positions
                        </Link>
                        <br />
                        and become part of a dynamic team where your ideas matter and your contributions make an impact.
                    </p>
                </motion.div>
            </motion.div>

            <FloatingQuickActions />
            <Footer7 />
        </>
    );
}

export default Career;
