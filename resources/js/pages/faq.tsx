import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head, Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import React from 'react';

const faq = [
    {
        question: 'What is this service about?',
        answer: 'This service provides comprehensive solutions for heavy equipment and truck spare parts.',
    },
    {
        question: 'How can I contact support?',
        answer: 'You can contact our support team via email at support@example.com.',
    },
    {
        question: 'What products do we offer?',
        answer: 'We offer a wide range of products including heavy equipment, truck spare parts, and maintenance services.',
    },
    {
        question: 'What heavy equipment products do we offer?',
        answer: 'We offer a variety of heavy equipment products including Backhoe Loader, Bulldozer, Dump Truck, Electric Stacker, Excavator, Forklift, Fuel Truck, Hand Pallet, Head Truck, Logging Truck, Mini Wheel Loader, Motor Grader, Reach Truck, Drilling Rig, Self Loading Mixer, Shuttle Bus, and Skid Loader.',
    },
    {
        question: 'What heavy equipment brands are available?',
        answer: 'We offer products from leading brands such as <strong>Lonking</strong> for construction and mining equipment, <strong>Sinotruk</strong> for heavy-duty trucks, <strong>CHL</strong> for material handling equipment, <strong>Tysim</strong> for bore pile construction equipment, <strong>Sonking</strong> and <strong>Zhongtong</strong> for shuttle buses, and <strong>Zhenzong</strong> for piling equipment.',
    },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

    return (
        <>
            <Head title="Frequently Asked Questions" />
            <Navbar />
            <div className="mx-auto px-4 pt-16 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-4 mb-4 text-center"
                >
                    <h1 className="relative inline-block text-5xl font-extrabold text-slate-800 drop-shadow-lg">
                        <span className="relative z-10">Frequently Asked Questions</span>
                        <span className="absolute -bottom-1 -left-1 z-0 text-gray-300">Frequently Asked Questions</span>
                    </h1>
                    <p className="mx-auto mt-8 max-w-xl text-base text-gray-600 drop-shadow-sm">
                        Here are some common questions and answers about our services. If you have more questions, feel free to{' '}
                        <Link href="/contact" className="animation-underline font-bold text-gray-800 hover:underline">
                            contact us
                        </Link>
                        .
                    </p>
                </motion.div>
            </div>
            <div className="">
                <div className="mx-auto max-w-3xl px-4">
                    <div className="flex flex-col">
                        {faq.map((item, index) => (
                            <motion.div
                                key={index}
                                className="border-b border-black/10"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.15 }}
                            >
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between py-4 text-left"
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                >
                                    <h2 className="text-lg font-semibold text-gray-900">{item.question}</h2>
                                    <ChevronDown
                                        className={`h-5 w-5 text-gray-900 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            key="content"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-2 bg-[#fff7d1] p-4 text-gray-800" dangerouslySetInnerHTML={{ __html: item.answer }} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <motion.div className="mt-4 bg-[#FCC200]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <motion.div
                    className="mx-auto w-[80%] max-w-6xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h1 className="mb-4 pt-8 text-center text-3xl font-bold text-gray-900">Still Have Questions?</h1>
                    <p className="mx-auto max-w-md pb-8 text-center text-lg text-gray-800">
                        Feel free to
                        <Link href="/contact" className="mx-1 font-bold text-gray-800 underline">
                            Contact Us
                        </Link>
                        — our team is ready to assist you with any further inquiries.
                    </p>
                </motion.div>
            </motion.div>

            <Footer7 />
        </>
    );
};

export default FAQ;
