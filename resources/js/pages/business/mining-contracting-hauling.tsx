import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function HeavyEquipment() {
    return (
        <div className="flex min-h-screen flex-col">
            <Head title="Heavy Equipment" />
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
                <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">Mining Contracting & Hauling Services</h1>
            </div>
            <main className="flex flex-1 flex-col items-center px-4 py-4">
                <div className="w-full max-w-6xl">
                    <div className="mx-auto rounded-2xl p-10 text-justify text-lg leading-relaxed">
                        <p className="mb-6 text-gray-700">
                            Teknindo Group provides reliable mining contracting services to support large-scale projects across Indonesia. We manage
                            every aspect of the operation, from site preparation and overburden removal to hauling and material transport, ensuring
                            efficiency and safety at every stage.
                        </p>

                        <p className="mb-6 text-gray-700">
                            Our hauling services include the use of high-capacity trucks and specialized equipment designed for heavy loads and
                            demanding terrain. With experienced operators and modern fleets, we deliver consistent performance that meets the needs of
                            mining companies and contractors.
                        </p>

                        <p className="mb-6 text-gray-700">
                            Safety and sustainability are at the core of our operations. We implement strict safety standards and adopt practices that
                            minimize environmental impact while maximizing productivity. This allows us to complete projects on time and maintain
                            long-term client trust.
                        </p>

                        <p className="mb-6 text-gray-700">
                            By combining expertise, advanced machinery, and strong project management, Teknindo Group has become a trusted partner for
                            mining companies seeking reliable contracting and hauling solutions across the country.
                        </p>
                    </div>
                </div>
            </main>
            <motion.div className="" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <motion.div className="mx-auto bg-[#fcc200]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h1 className="mb-4 pt-8 text-center text-3xl font-bold text-gray-900">Discover Our Products</h1>
                    <p className="mx-auto pb-8 text-justify text-lg text-gray-600 md:text-center">
                        Browse our complete catalog to find the right solutions for your needs.
                        <br />
                        <a href="/products/heavy-equipment" className="mx-1 font-bold text-gray-800 hover:underline">
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
