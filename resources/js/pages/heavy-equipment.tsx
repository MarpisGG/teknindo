import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import bg from '../../assets/image/heavy-bg.jpeg';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function HeavyEquipment() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-[#0a0a0a]">
            <Head title="Heavy Equipment" />
            <Navbar />
            <div
                className="relative flex h-[50vh] w-full items-center justify-center px-4 py-8"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-white opacity-50"></div>
                <h1 className="text font- relative z-10 mb-8 text-center text-3xl dark:text-white">Heavy Equipment</h1>
            </div>
            <main className="flex flex-1 flex-col items-center bg-[#d9d9d9] px-4 py-4">
                <div className="w-full max-w-6xl">
                    <div className="mx-auto rounded-2xl p-10 text-justify text-lg leading-relaxed dark:text-neutral-300">
                        <p className="mb-6 text-gray-700 dark:text-gray-300">
                            <span className="font-semibold text-[#FCC200] dark:text-yellow-400">Teknindo Group</span> is a trusted distributor and
                            authorized dealer of world-class heavy equipment brands in Indonesia. We specialize in providing reliable and durable
                            machinery for construction, mining, and industrial projects nationwide.
                        </p>
                        <p className="mb-6 text-gray-700 dark:text-gray-300">
                            Our comprehensive range of heavy equipment includes{' '}
                            <span className="font-medium">
                                excavators, wheel loaders, bulldozers, cranes, piling rigs, drilling rigs, forklifts, and heavy-duty trucks
                            </span>{' '}
                            designed to meet the toughest industry demands.
                        </p>
                        <p className="mb-6 text-gray-700 dark:text-gray-300">
                            Teknindo Group is the official dealer for the following internationally recognized brands:
                        </p>
                        <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                            <li>
                                <span className="font-semibold">LONKING</span> — Heavy equipment for construction and mining, including excavators,
                                wheel loaders, and bulldozers.
                            </li>
                            <li>
                                <span className="font-semibold">TYSIM</span> — Specialized bore pile construction equipment and drilling rigs.
                            </li>
                            <li>
                                <span className="font-semibold">ZHENZHONG</span> — Piling machinery and foundation construction equipment.
                            </li>
                            <li>
                                <span className="font-semibold">SINOTRUK</span> — Heavy-duty trucks for mining and transportation industries.
                            </li>
                            <li>
                                <span className="font-semibold">CHL</span> — Material handling equipment, including forklifts and warehouse solutions.
                            </li>
                            <li>
                                <span className="font-semibold">ZHONGTONG</span> — Shuttle buses for industrial site transportation and workforce
                                mobility.
                            </li>
                        </ul>
                        <p className="mb-6 text-gray-700 dark:text-gray-300">
                            Our machines are built to deliver outstanding performance, reliability, and efficiency for every type of project. With
                            branches located in key cities across Indonesia, we ensure prompt after-sales service, spare parts availability, and
                            professional maintenance to keep your operations running smoothly.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            Choose <span className="font-semibold text-[#FCC200] dark:text-yellow-400">Teknindo Group</span> for your heavy equipment
                            needs and experience trusted solutions that drive productivity and success in your projects.
                        </p>
                    </div>
                </div>
            </main>
            <motion.div className="dark:bg-[#0a0a0a]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <motion.div
                    className="mx-auto bg-[#fcc200] dark:bg-[#0a0a0a]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h1 className="mb-4 pt-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Discover Our Products</h1>
                    <p className="mx-auto pb-8 text-justify text-lg text-gray-600 md:text-center dark:text-gray-400">
                        Browse our complete catalog to find the right solutions for your needs.
                        <br />
                        <a href="/products/heavyweight-equipment" className="mx-1 font-bold text-gray-800 hover:underline dark:text-white">
                            View our heavy equipment products
                        </a>
                    </p>
                </motion.div>
            </motion.div>

            <FloatingQuickActions />
            <Footer7 />
        </div>
    );
}

export default HeavyEquipment;
