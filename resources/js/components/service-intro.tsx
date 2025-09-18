import { motion } from 'framer-motion';
import React from 'react';

interface Service {
    icon: string;
    title: string;
}

const services: Service[] = [
    {
        title: 'Heavy Equipment, Dump Truck & Machinery Supplies, Procurement, and Project Consultation',
        icon: '⚙️',
    },
    {
        title: 'Rental of Heavy Equipment, Dump Trucks, and Mining Vehicles',
        icon: '🚜',
    },
    {
        title: 'Equipment Maintenance, After-Sales Service, Consignment Spare Parts and Technical Support in Mining & Construction Site Project',
        icon: '🛠️',
    },
    {
        title: 'Custom Manufacturing and Development of Machinery and Industrial Tires',
        icon: '🏭',
    },
    {
        title: 'Mining Contracting Services Including Haulage and Site Logistics',
        icon: '⛏️',
    },
    {
        title: 'Global Trading, Supply Chain Management, and Quality Assurance',
        icon: '🌍',
    },
];

const ServiceIntroSection: React.FC = () => {
    return (
        <section className="bg-[#d9d9d9]/60 px-6 pb-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
                {/* Left - Text & Services */}
                {/* Grid Service Cards */}
                <div className="grid w-full auto-rows-fr gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex h-full flex-col rounded-lg bg-white p-6 text-center shadow shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
                        >
                            <div className="mb-4 text-4xl">{service.icon}</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">{service.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceIntroSection;
