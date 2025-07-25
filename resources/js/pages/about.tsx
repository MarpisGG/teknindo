import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { AutoScroll } from '@/components/ui/auto-scroll';
import StickyScrollRevealComponent from '@/components/ui/sticky-scroll';
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
            <div className="flex w-full flex-col items-center justify-center bg-[#FCC200] p-8 text-center shadow-sm">
                <div className="mx-auto mb-6 w-[80%] max-w-6xl">
                    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Link href="/" className="text-gray-800 hover:underline dark:text-white">
                            Home
                        </Link>
                        <span>{'>'}</span>
                        <p className="font-bold">About</p>
                    </nav>
                </div>
                <div className="flex w-full justify-center">
                    <div className="relative aspect-video w-full max-w-5xl">
                        <iframe
                            src="https://drive.google.com/file/d/1AvgGrRol4fXiKA9zcfQMPSJQ3NPwoX57/preview"
                            allow="autoplay"
                            allowFullScreen
                            className="absolute top-0 left-0 h-full w-full rounded-xl"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* <ScrollExpansion /> */}

            <div className="bg-[#d9d9d9] dark:bg-[#0a0a0a]">
                <motion.div
                    className="mx-auto w-[80%] max-w-6xl py-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="mb-8">
                        <img src={Teknindo} alt="Teknindo Logo" className="mx-auto mb-4 h-auto w-[50%]" />
                        <p className="mx-auto max-w-6xl text-lg dark:text-gray-400">
                            Teknindo Group is a trusted distributor and authorized dealer of heavy equipment, trucks, and material handling solutions
                            in Indonesia. We represent several world-class Chinese brands that have successfully entered global markets.
                            <br />
                            <br />
                            We continue to expand our business network across Indonesia, opening opportunities for partnerships with companies,
                            business partners, and local entrepreneurs in the heavy equipment industry.
                            <br />
                            <br />
                            Since our establishment in 2018, Teknindo Group has opened branches in key cities across Indonesia to strengthen our
                            after-sales service network and maintain our commitment to excellent customer service.
                            <br />
                            <br />
                            Here you will find information about who we are, the range of products we offer, and how we can help you achieve success
                            in your projects.
                            <br />
                            <br />
                            We proudly represent leading brands such as <strong>LONKING</strong> for construction and mining equipment,{' '}
                            <strong>TYSIM</strong> for bore pile construction equipment, <strong>ZHENZHONG</strong> for piling equipment,{' '}
                            <strong>SINOTRUK</strong> for heavy-duty trucks, <strong>CHL</strong> for material handling equipment, and{' '}
                            <strong>ZHONGTONG</strong> for shuttle buses.
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                <motion.div
                    className="mx-auto my-8 w-[80%] max-w-6xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    {/* Who We Are */}
                    <div className="mb-8 grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_2fr]">
                        <div className="border-gray-300 pr-8 text-center md:border-r dark:border-gray-700">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                                Who We Are
                            </h1>
                        </div>
                        <div className="SliderImage">
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                We are a team of experienced professionals specializing in heavy equipment sales and services. Since 2018, we have
                                supported businesses across Indonesia with reliable machinery solutions, expert maintenance, and personalized customer
                                support to help them achieve operational excellence.
                            </p>
                        </div>
                    </div>

                    {/* What We Do */}
                    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_2fr]">
                        <div className="self-start border-gray-300 pr-8 text-center md:sticky md:top-20 md:border-r dark:border-gray-700">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                                What We Do
                            </h1>
                        </div>
                        <div className="SliderImage space-y-6">
                            {[
                                {
                                    title: 'Heavy Equipment & Parts',
                                    content:
                                        'We specialize in the sale of high-quality heavy equipment and parts from leading brands. Our extensive inventory includes excavators, bulldozers, cranes, and more, ensuring that we have the right equipment for every job.',
                                },
                                {
                                    title: 'Construction Equipment',
                                    content:
                                        'Our construction equipment solutions are designed to meet the demands of any project, from small-scale renovations to large infrastructure developments.',
                                },
                                {
                                    title: 'Mining Transportation',
                                    content:
                                        'We offer specialized transportation solutions for mining operations, ensuring that your equipment and materials are delivered safely and efficiently.',
                                },
                                {
                                    title: 'Mining Contractor',
                                    content:
                                        'As a mining contractor, we provide comprehensive services including site preparation, excavation, and material handling.',
                                },
                                {
                                    title: 'Mining Services',
                                    content:
                                        'Our mining services encompass everything from exploration and development to production and reclamation.',
                                },
                            ].map((item, i) => (
                                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                                    <h2 className="my-2 text-xl font-semibold text-gray-800 dark:text-white">{item.title}</h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400">{item.content}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="bg-[#d9d9d9] dark:bg-[#0a0a0a]">
                <motion.div
                    className="mx-auto mt-8 w-[80%] max-w-6xl pb-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="mb-8">
                        <h1 className="pt-8 pb-4 text-center">Our Vision & Mission</h1>
                        <p className="SliderImage mx-auto max-w-xl px-8 text-lg text-gray-600 md:text-center dark:text-gray-400">
                            Our vision and mission guide us in delivering exceptional service and value to our customers.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                        <div className="">
                            <h2 className="mb-4 text-center">Vision</h2>
                            <p className="SliderImage text-lg text-black dark:text-gray-400">
                                To become a provider of heavy equipment with international standards by prioritizing product quality and after-sales
                                service, while contributing to the advancement of Indonesia's economic development and infrastructure.
                            </p>
                        </div>
                        <div className="pl-8 md:border-l">
                            <h2 className="mb-4 text-center">Mission</h2>
                            <ul className="SliderImage list-disc space-y-4 pl-6 text-black dark:text-gray-400">
                                <li>
                                    To become a provider of heavy equipment with international standards by prioritizing product quality and
                                    after-sales service.
                                </li>
                                <li>
                                    To develop professional and competent human resources in their respective fields, ensuring continuous company
                                    growth and excellent service delivery to all business partners.
                                </li>
                                <li>
                                    To uphold honesty and integrity, while fostering a strong work ethic and a positive work environment, in order to
                                    achieve comfort, progress, and prosperity for all shareholders.
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>

            <StickyScrollRevealComponent />

            <div className="bg-[#d9d9d9] dark:bg-[#0a0a0a]">
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
                    <p className="SliderImage mx-auto max-w-xl pb-8 text-lg text-gray-600 md:text-center dark:text-gray-400">
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
