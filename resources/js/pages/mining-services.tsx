import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head } from '@inertiajs/react';

function MiningServices() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <Head title="Mining Services" />
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
                <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">Mining Services </h1>
            </div>
            <main className="flex flex-1 flex-col items-center px-4 py-4">
                <div className="w-full max-w-6xl">
                    <div className="mx-auto rounded-2xl bg-white p-10 text-justify text-lg leading-relaxed">
                        <p className="mb-6 text-gray-700">
                            <span className="font-semibold text-[#FCC200]">Teknindo Group</span> offers a wide range of mining services to support the
                            diverse operational needs of mining companies across Indonesia. Our services are designed to help you optimize efficiency,
                            reduce costs, and maximize productivity at every stage of your mining operation.
                        </p>

                        <p className="mb-6 text-gray-700">
                            From exploration and development to production and reclamation, we provide end-to-end solutions tailored to meet the
                            unique challenges of your mining projects. Our skilled professionals and reliable heavy equipment are ready to deliver
                            consistent and dependable results, even in the most demanding environments.
                        </p>

                        <p className="mb-6 text-gray-700">
                            Our comprehensive mining services include site preparation, drilling, material transportation, waste management, and
                            project management solutions. We work closely with our clients to ensure that safety, sustainability, and operational
                            excellence remain our top priorities.
                        </p>

                        <p className="text-gray-700">
                            Partner with <span className="font-semibold text-[#FCC200]">Teknindo Group</span> for trusted mining services that deliver
                            measurable value and long-term success to your business.
                        </p>
                    </div>
                </div>
            </main>
            <FloatingQuickActions />
            <Footer7 />
        </div>
    );
}

export default MiningServices;
