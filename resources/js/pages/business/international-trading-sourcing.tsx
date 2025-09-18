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
                <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">International Trading & Sourcing of Machinery</h1>
            </div>
            <main className="flex flex-1 flex-col items-center px-4 py-4">
                <div className="w-full max-w-6xl">
                    <div className="mx-auto rounded-2xl p-10 text-justify text-lg leading-relaxed">
                        <p className="mb-6 text-gray-700">
                            Our international trading and sourcing division connects businesses in Indonesia with leading machinery manufacturers
                            around the world. We help companies access reliable equipment at competitive prices by leveraging our strong global
                            network.
                        </p>

                        <p className="mb-6 text-gray-700">
                            From construction and mining machinery to industrial tools and specialized vehicles, we handle the entire sourcing process
                            with transparency and efficiency. Our team ensures that all machinery complies with international quality standards and is
                            suitable for local operating conditions.
                        </p>

                        <p className="mb-6 text-gray-700">
                            With years of experience in global trade, we simplify complex import processes, manage logistics, and provide professional
                            consultation to ensure a smooth transaction. This allows our clients to focus on their operations while we take care of
                            the supply chain.
                        </p>

                        <p className="mb-6 text-gray-700">
                            By working with Teknindo Group, businesses gain access to a trusted partner that understands both the international market
                            and the specific demands of industries in Indonesia. We are committed to delivering the right solutions at the right time
                            to support sustainable growth.
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
