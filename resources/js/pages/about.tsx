import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import Timeline_02 from '@/components/timeline-02';
import { AutoScroll } from '@/components/ui/auto-scroll';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Teknindo from '../../assets/image/Teknindo Awal.png';
import ListPerusahaan from '../../assets/image/perusahaan.jpeg';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
    return (
        <>
            <Head title="About" />
            <div className="mb-16">
                <Navbar />
            </div>

            {/* <ScrollExpansion /> */}

            <div className="bg-[#d9d9d9]/60 dark:bg-[#0a0a0a]">
                <motion.div
                    className="mx-auto w-[80%] max-w-6xl py-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="mx-auto my-6 hidden md:block">
                        <nav className="flex items-center space-x-2 text-sm dark:text-gray-400">
                            <Link href="/" className="text-gray-800 hover:underline dark:text-white">
                                Home
                            </Link>
                            <span>{'>'}</span>
                            <p className="font-bold">About</p>
                        </nav>
                    </div>
                    <div className="mb-8">
                        <img src={Teknindo} alt="Teknindo Logo" className="mx-auto mb-4 h-auto md:w-[60%]" />
                        <div className="mx-auto max-w-6xl space-y-6 text-lg md:text-start dark:text-gray-400">
                            <p>
                                Teknindo Group is a corporate group engaged in the provision of equipment and services for the mining, construction,
                                and industrial sectors. At present, Teknindo Group comprises seven member companies. The parent entity of the group is{' '}
                                <strong>PT. Mitra Teknindo Sejati (MTS)</strong>, a heavy equipment distributor established in 2018. Since its
                                establishment, MTS has consistently expanded and invested in various business lines, which led to the creation of
                                several subsidiaries and the formation of Teknindo Group as a whole.
                            </p>

                            <div>
                                <p className="mb-2 font-semibold">The member companies under Teknindo Group include:</p>
                                <ul className="list-inside list-disc space-y-1">
                                    <li>Mitra Teknindo Sejati (MTS)</li>
                                    <li>Mitra Suplaindo Sejati (MSS)</li>
                                    <li>Teknindo Super Haul (TSH)</li>
                                    <li>LGCM Laigong Indonesia (LI)</li>
                                    <li>Teknindo Adhya Pane (TAP)</li>
                                    <li>Tenrich Tyre Indonesia (TTI)</li>
                                    <li>Wenzhou Yunding International (WYI)</li>
                                </ul>
                            </div>

                            <p>
                                In line with its vision and mission, Teknindo Group continues to pursue innovation, growth, and excellence in order to
                                become a highly competent and integrated enterprise. Moving forward, the Group is committed to broadening its business
                                network, enhancing its contribution to Indonesia’s national development, and creating more job opportunities in
                                Indonesia.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                <motion.div
                    className="mx-auto mt-8 w-[80%] max-w-6xl pb-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="mb-8">
                        <h1 className="pt-8 pb-4 text-center">Our Vision & Mission</h1>
                        <p className="SliderImage ext-lg mx-auto max-w-xl text-gray-600 md:text-center dark:text-gray-400">
                            Our vision and mission guide us in delivering exceptional service and value to our customers.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                        <div className="">
                            <h2 className="mb-4 text-center">Vision</h2>
                            <p className="SliderImage text-lg text-black md:text-start dark:text-gray-400">
                                becoming a leading, reliable, and integrated group of companies in providing equipment and services for the mining,
                                construction, and industrial sectors.
                            </p>
                        </div>
                        <div className="md:border-l md:pl-8">
                            <h2 className="mb-4 text-center">Mission</h2>
                            <ul className="SliderImage list-disc space-y-4 pl-6 text-black dark:text-gray-400">
                                <li>
                                    Providing complete heavy equipment solutions, including units, spare parts, and after-sales services, to support
                                    operations in mining, construction, and industry.
                                </li>
                                <li>
                                    Delivering professional and safe mining contractor services, focused on achieving the best results with high
                                    efficiency, strong operational standards, and prioritizing team safety.
                                </li>
                                <li>
                                    Offering full-service solutions for various internal needs that support worksite operations in mining,
                                    construction, and industry.
                                </li>
                                <li>
                                    Developing innovative and efficient systems in company activities, building a positive work environment, and
                                    creating competent, honest, well-mannered, and high-integrity human resources to support long-term company growth.
                                </li>
                                <li>
                                    Practicing good, fair, and transparent corporate governance in order to achieve optimal results for all
                                    shareholders and stakeholders.
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="bg-[#d9d9d9]/60 dark:bg-[#0a0a0a]">
                <motion.div
                    className="mx-auto w-[80%] max-w-6xl py-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    {/* What We Do */}
                    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_2fr]">
                        <div className="self-start border-gray-300 pr-8 text-center md:sticky md:top-20 md:border-r dark:border-gray-700">
                            <p
                                className="text-4xl font-bold text-gray-900 md:text-5xl dark:text-white"
                                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
                            >
                                What We Do
                            </p>
                        </div>
                        <div className="SliderImage space-y-6">
                            {[
                                {
                                    title: 'Heavy Equipment & Parts',
                                    content:
                                        'We specialize in the sale of high-quality heavy equipment and dump truck from leading brands. Our extensive inventory includes excavators, dump truck, wheel loader, shuttle bus, and more, ensuring that we have the right equipment for every job.',
                                },
                                {
                                    title: 'Construction Equipment',
                                    content:
                                        'Our construction equipment solutions are designed to meet the demands of any project, from small-scale renovations to large infrastructure developments.',
                                },
                                {
                                    title: 'Mining Transportation',
                                    content:
                                        'We offer specialized transportation solutions for mining operations, ensuring that your minerals and materials are delivered safely and efficiently.',
                                },
                                {
                                    title: 'Mining Contractor',
                                    content:
                                        'As a mining contractor, we provide comprehensive services including site preparation, excavation, and material handling.',
                                },
                                {
                                    title: 'Mining Services',
                                    content: 'Our mining services cover everything from exploration and development to production and reclamation.',
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    className="md:text-start"
                                >
                                    <p className="my-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">{item.title}</p>
                                    <p className="text-lg text-gray-600 dark:text-gray-400">{item.content}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="dark:bg-[#0a0a0a]">
                <motion.div
                    className="mx-auto w-[80%] max-w-6xl py-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h1 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">Part of the Teknindo Group</h1>
                    <p className="mb-4 text-center text-lg dark:text-gray-400">Meet the businesses that drive our collective success.</p>
                    <AutoScroll />
                </motion.div>
            </div>
            {/* <StickyScrollRevealComponent /> */}
            <Timeline_02 />
            <div className="dark:bg-[#0a0a0a]">
                <motion.div
                    className="mx-auto w-[80%] max-w-6xl py-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h1 className="py-4 text-center text-3xl font-bold text-gray-900 dark:text-white">Our Loyal Customer</h1>
                    <p className="mx-auto mb-4 max-w-2xl text-center text-lg dark:text-gray-400">
                        We are proud to serve loyal customers who have been part of our journey. Your trust is a testament to the quality of our
                        products and services.
                    </p>
                </motion.div>
                <img src={ListPerusahaan} alt="List of Companies" className="mx-auto max-h-screen w-full max-w-6xl" />
            </div>
            <div className="bg-[#FCC200] dark:bg-[#0a0a0a]">
                <motion.div
                    className="mx-auto w-[80%] max-w-6xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h1 className="mb-4 pt-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Let’s Work Together</h1>
                    <p className="SliderImage mx-auto max-w-xl pb-8 text-center text-lg text-gray-600 dark:text-gray-400">
                        Interested in partnering with us?
                        <Link href="/contact" className="mx-1 font-bold text-gray-800 hover:underline dark:text-white dark:hover:text-[#FCC200]">
                            Contact Us
                        </Link>
                        to start a conversation about collaboration or procurement.
                    </p>
                </motion.div>
            </div>

            <FloatingQuickActions />
            <Footer7 />
        </>
    );
};

export default About;
