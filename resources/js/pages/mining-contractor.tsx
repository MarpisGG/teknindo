import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';

function MiningContractor() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-[#0a0a0a]">
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
                <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Mining Contractor </h1>
            </div>
            <main className="flex flex-1 flex-col items-center px-4 py-4">
                <div className="w-full max-w-6xl">
                    <div className="mx-auto rounded-2xl bg-white p-10 text-justify text-lg leading-relaxed dark:text-neutral-300">
                        <p className="mb-6 text-gray-700 dark:text-gray-300">
                            At <span className="font-semibold text-[#FCC200] dark:text-yellow-400">Teknindo Group</span>, we provide comprehensive
                            mining contractor services that support the success of mining projects across Indonesia. Our team is equipped with deep
                            industry experience and operates with a focus on safety, efficiency, and productivity in every project we handle.
                        </p>

                        <p className="mb-6 text-gray-700 dark:text-gray-300">
                            From site preparation and excavation to hauling and materials management, we deliver end-to-end solutions tailored to meet
                            the needs of both small and large-scale mining operations. Our heavy equipment fleet is modern, reliable, and designed to
                            perform in challenging mining environments.
                        </p>

                        <p className="mb-6 text-gray-700 dark:text-gray-300">
                            With our proven expertise in the field, Teknindo Group is trusted by numerous mining companies to deliver high-performance
                            results that optimize project timelines and reduce operational costs. We are committed to upholding strict safety
                            standards and ensuring environmental responsibility throughout all stages of our work.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300">
                            Partner with Teknindo Group and experience professional mining contractor services that help you achieve operational
                            excellence and long-term project success.
                        </p>
                    </div>
                </div>
            </main>
            <FloatingQuickActions />
            <Footer7 />
        </div>
    );
}

export default MiningContractor;
