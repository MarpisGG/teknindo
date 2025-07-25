import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { motion } from 'framer-motion';
import Sparepart from '../../../assets/image/sparepart.png';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export default function SparepartLanding() {
    return (
        <>
            <div className="mb-16">
                <Navbar />
            </div>
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-extrabold">Spare Parts</h1>
                </div>

                <div className="mb-10">
                    <img src={Sparepart} alt="Spare Parts" className="h-auto w-full rounded-xl shadow-lg" />
                </div>

                <div className="text-start">
                    <p className="mb-4 text-gray-700">
                        All of our spare parts are distributed through trusted official partners. To browse the full catalog and make a purchase,
                        please visit&nbsp;
                        <a
                            href="https://www.mitrateknindosejati.com/parts-168197"
                            className="font-bold text-gray-800 hover:underline dark:text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            www.mitrateknindosejati.com
                        </a>
                        . We offer a wide range of genuine spare parts for heavy equipment, including undercarriage parts, engine components,
                        hydraulic parts, and more.
                    </p>
                    <p className="mb-6 text-gray-700">
                        Our heavy equipment spare parts are engineered for maximum performance and durability. Whether you're maintaining excavators,
                        bulldozers, or other machinery, our comprehensive selection ensures that you’ll find the exact component you need. We are
                        committed to delivering high-quality OEM and aftermarket spare parts that meet international standards, helping you reduce
                        downtime and extend the lifespan of your equipment. Visit&nbsp;
                        <a
                            href="https://www.mitrateknindosejati.com/parts-168197"
                            className="font-bold text-gray-800 hover:underline dark:text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            www.mitrateknindosejati.com
                        </a>{' '}
                        today to explore our product offerings and get expert support.
                    </p>
                </div>
            </div>
            <motion.div className="dark:bg-[#0a0a0a]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <motion.div
                    className="mx-auto bg-[#fcc200] dark:bg-[#0a0a0a]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h1 className="mb-4 pt-8 text-center text-3xl font-bold text-gray-900 dark:text-white">More Spare Parts</h1>
                    <p className="text-md mx-auto pb-8 text-justify text-gray-600 md:text-center dark:text-gray-400">
                        Explore our full spare part catalog for more solutions to fit your needs.
                        <br />
                        <a
                            href="https://www.mitrateknindosejati.com/parts-168197"
                            className="mx-1 font-bold text-gray-800 hover:underline dark:text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            See More Spare Parts in www.mitrateknindosejati.com
                        </a>
                    </p>
                </motion.div>
            </motion.div>
            <FloatingQuickActions />
            <Footer7 />
        </>
    );
}
