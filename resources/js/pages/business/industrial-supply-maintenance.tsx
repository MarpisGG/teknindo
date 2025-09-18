import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head } from '@inertiajs/react';

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
                <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">Industrial Supply & Maintenance Products</h1>
            </div>
            <main className="flex flex-1 flex-col items-center px-4 py-4">
                <div className="w-full max-w-6xl">
                    <div className="mx-auto rounded-2xl p-10 text-justify text-lg leading-relaxed">
                        <p className="mb-6 text-gray-700">
                            Industrial operations demand a continuous supply of high-quality products to keep workflows efficient and minimize
                            downtime. We provide a wide selection of industrial supplies and maintenance products, including lubricants, hydraulic
                            components, filters, spare parts, and safety gear — all sourced from trusted brands.
                        </p>

                        <p className="mb-6 text-gray-700">
                            Each product in our catalog is selected to meet strict quality standards, ensuring durability and performance even in the
                            most demanding work environments. By delivering reliable supplies, we help companies avoid unnecessary interruptions and
                            extend the lifespan of their equipment.
                        </p>

                        <p className="mb-6 text-gray-700">
                            Our solutions are designed to support a wide range of industries — from mining and construction to manufacturing and
                            logistics. With flexible procurement options and responsive delivery, we make sure your operations are always equipped
                            with what they need, when they need it.
                        </p>

                        <p className="mb-6 text-gray-700">
                            Beyond just supplying products, we provide expert advice and technical support to guide you in choosing the right
                            solutions for your specific requirements. This ensures that every purchase contributes to higher efficiency, safety, and
                            long-term operational success.
                        </p>
                    </div>
                </div>
            </main>
            <FloatingQuickActions />
            <Footer7 />
        </div>
    );
}

export default HeavyEquipment;
