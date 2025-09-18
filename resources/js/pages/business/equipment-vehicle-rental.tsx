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
                <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">Equipment & Vehicle Rental for Mining</h1>
            </div>
            <main className="flex flex-1 flex-col items-center px-4 py-4">
                <div className="w-full max-w-6xl">
                    <div className="mx-auto rounded-2xl p-10 text-justify text-lg leading-relaxed">
                        <p className="mb-6 text-gray-700">
                            Mining operations need strong, reliable equipment that can work non-stop in tough conditions. We provide a wide range of
                            rental units — from excavators and wheel loaders to dump trucks and bulldozers — all chosen to match the needs of mining
                            sites of any size.
                        </p>

                        <p className="mb-6 text-gray-700">
                            Every rental unit is regularly inspected and maintained to keep downtime to a minimum. That means you get machines that
                            run smoothly and safely, reducing the risk of unexpected breakdowns and costly delays.
                        </p>

                        <p className="mb-6 text-gray-700">
                            Our rental plans are flexible: short-term for urgent projects or long-term for extended operations. This helps you control
                            costs and avoid large upfront purchases while still having access to the right equipment when you need it.
                        </p>

                        <p className="text-gray-700">
                            Beyond just renting machines, we support you with operator training, technical assistance, and on-site service. Our goal
                            is to be a reliable partner — supplying equipment and the know-how to keep your mining project productive and safe.
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
