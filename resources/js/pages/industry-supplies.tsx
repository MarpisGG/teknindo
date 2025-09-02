import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head } from '@inertiajs/react';

function IndustrySupplies() {
    return (
        <div>
            <Head title="Industry Supplies" />
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
                <h1>Industry Supplies</h1>
            </div>
            <main className="flex flex-1 flex-col items-center px-4 py-4">
                <div className="w-full max-w-6xl">
                    <div className="mx-auto rounded-2xl bg-white p-10 text-justify text-lg leading-relaxed">
                        <p className="mb-6 text-gray-700">
                            Construction equipment is the backbone of any successful construction project. From large-scale infrastructure
                            developments to smaller site works, having the right machinery is crucial to ensure efficiency, productivity, and safety
                            on-site. Modern construction projects rely on specialized equipment for tasks such as excavation, lifting, material
                            handling, and earthmoving.
                        </p>

                        <p className="mb-6 text-gray-700">
                            Choosing high-quality construction machinery helps reduce labor costs, speed up project timelines, and minimize risks in
                            the field. Essential equipment such as bulldozers, excavators, cranes, concrete mixers, and other heavy machinery play a
                            key role in driving construction progress forward with precision and reliability.
                        </p>

                        <p className="text-gray-700">
                            <span className="font-semibold text-[#FCC200]">Teknindo Group</span> delivers reliable, durable, and high-performance
                            construction equipment solutions designed to meet the diverse demands of the construction industry in Indonesia. Our range
                            of products is engineered to withstand harsh working environments while maintaining peak performance and safety. Partner
                            with Teknindo Group to ensure your projects are supported by the best tools in the industry.
                        </p>
                    </div>
                </div>
            </main>
            <FloatingQuickActions />
            <Footer7 />
        </div>
    );
}

export default IndustrySupplies;
