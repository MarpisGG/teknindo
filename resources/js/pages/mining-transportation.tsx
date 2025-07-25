import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';

function MiningTransportation() {
    return (
        <div className="flex min-h-screen flex-col dark:bg-[#0a0a0a]">
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-4">
                <h1>Mining Transportation</h1>
            </div>
            <main className="flex flex-1 flex-col items-center px-4 py-4">
                <div className="w-full max-w-6xl">
                    <div className="mx-auto rounded-2xl bg-white p-10 text-justify text-lg leading-relaxed dark:text-neutral-300">
                        <p className="mb-6 text-gray-700 dark:text-gray-300">
                            Mining transportation plays a critical role in the success of any mining operation. Without reliable and efficient
                            transportation, mining activities can face serious delays, increased costs, and reduced productivity. From transporting
                            raw materials and heavy equipment to moving personnel safely to and from the site, every aspect of mining relies on
                            well-planned logistics.
                        </p>
                        <p className="mb-6 text-gray-700 dark:text-gray-300">
                            Efficient transportation solutions help ensure the smooth delivery of essential resources such as coal, gold, and other
                            mining outputs. A reliable transportation system directly impacts the efficiency, safety, and profitability of your
                            operations.
                        </p>
                        <p className="mb-6 text-gray-700 dark:text-gray-300">
                            <span className="font-semibold text-[#FCC200] dark:text-yellow-400">Teknindo Group</span> provides a comprehensive range
                            of mining transportation solutions tailored to meet the demanding needs of the mining industry in Indonesia. Our fleet
                            includes heavy-duty trucks, excavators, shuttle buses for mining personnel, and other specialized vehicles designed to
                            operate reliably in tough and remote environments.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            To help you achieve operational excellence, we also offer professional maintenance and after-sales support to keep your
                            equipment in peak condition. With Teknindo Group as your trusted mining transportation partner, you can minimize downtime,
                            reduce operational risks, and boost productivity across all your mining projects.
                        </p>
                    </div>
                </div>
            </main>
            <FloatingQuickActions />
            <Footer7 />
        </div>
    );
}

export default MiningTransportation;
