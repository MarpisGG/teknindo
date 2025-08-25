import React from 'react';

interface Service {
    icon: string;
    title: string;
    description: string;
}

const services: Service[] = [
    {
        title: 'Comprehensive Solutions',
        description:
            'From heavy equipment distribution and rental services to industrial supplies, tire production, and even international sourcing, we provide everything you need in one place.',
        icon: '⚙️', // gear → melambangkan solusi teknis dan lengkap
    },
    {
        title: 'Expertise Across Industries',
        description:
            'With both local and international presence, including partnerships in China, we connect you with high-quality products and services that you can trust.',
        icon: '🌍', // globe → melambangkan jangkauan global & lintas industri
    },
    {
        title: 'Commitment to Growth and Innovation',
        description:
            'We continuously invest in our people, our technology, and our services to deliver better solutions that help your business move forward.',
        icon: '🚀', // rocket → melambangkan inovasi & pertumbuhan
    },
    {
        title: 'Customer-Focused Partnership',
        description:
            'Your business is our priority. We don’t just deliver products—we build long-term partnerships based on trust, reliability, and shared growth.',
        icon: '🤝', // handshake → kemitraan & kepercayaan
    },
    {
        title: 'Unit Warranty Guarantee',
        description: 'We provide a warranty guarantee for every heavy equipment purchase and repair service to give our customers peace of mind.',
        icon: '🛡️', // shield → melambangkan proteksi & garansi
    },
];

const ServiceCard: React.FC = () => {
    return (
        <div className="flex w-full flex-col items-center gap-12 px-4">
            {/* Baris 1 - 3 Item */}
            <div className="grid w-full max-w-6xl auto-rows-fr gap-8 md:grid-cols-2 lg:grid-cols-3">
                {services.slice(0, 3).map((service, idx) => (
                    <div
                        key={idx}
                        className="flex h-full flex-col rounded-lg bg-white p-6 shadow transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg dark:bg-[#1a1a1a]"
                    >
                        <div className="mb-4 text-4xl">{service.icon}</div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                        <p className="flex-grow text-gray-600 dark:text-gray-400">{service.description}</p>
                    </div>
                ))}
            </div>

            {/* Baris 2 - 2 Item */}
            <div className="grid w-full max-w-4xl auto-rows-fr gap-8 md:grid-cols-2">
                {services.slice(3).map((service, idx) => (
                    <div
                        key={idx}
                        className="flex h-full flex-col rounded-lg bg-white p-6 shadow transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg dark:bg-[#1a1a1a]"
                    >
                        <div className="mb-4 text-4xl">{service.icon}</div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                        <p className="flex-grow text-gray-600 dark:text-gray-400">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceCard;
