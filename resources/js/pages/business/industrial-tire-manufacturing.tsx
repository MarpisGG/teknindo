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
                <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">Industrial Tire Manufacturing</h1>
            </div>
            <main className="flex flex-1 flex-col items-center px-4 py-4">
                <div className="w-full max-w-6xl">
                    <div className="mx-auto rounded-2xl p-10 text-justify text-lg leading-relaxed">
                        <p className="mb-6 text-gray-700">
                            Tires play a critical role in keeping heavy equipment, trucks, and industrial vehicles moving safely and efficiently. Our
                            tire manufacturing division focuses on producing durable, high-performance tires that are designed to handle the toughest
                            terrains and the heaviest loads.
                        </p>

                        <p className="mb-6 text-gray-700">
                            We use advanced materials and modern manufacturing processes to ensure every tire meets strict safety and quality
                            standards. From mining trucks and construction machinery to forklifts and logistics fleets, our tires are built to deliver
                            long-lasting performance.
                        </p>

                        <p className="mb-6 text-gray-700">
                            By offering a wide range of tire types and sizes, we provide solutions that fit different industries and operating
                            conditions. Whether you need tires for off-road environments or heavy-duty transportation, we have products tailored to
                            your needs.
                        </p>

                        <p className="mb-6 text-gray-700">
                            Our commitment doesn’t stop at manufacturing. We also support our clients with tire maintenance services, technical
                            advice, and fast distribution networks to ensure maximum uptime and reliability for every operation.
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
