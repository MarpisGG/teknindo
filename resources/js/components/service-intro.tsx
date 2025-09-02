import { motion } from 'framer-motion';
import React from 'react';

interface Service {
    icon: string;
    title: string;
    description: string;
}

const services: Service[] = [
    {
        title: 'Heavy Equipment & Truck Distribution',
        description: 'Supplying reliable heavy machinery and trucks to power your operations with trusted performance.',
        icon: '🚛',
    },
    {
        title: 'Equipment Rental Services',
        description: 'Offering heavy equipment, dump trucks, and operational vehicles on flexible rental terms to keep projects running smoothly.',
        icon: '📦',
    },
    {
        title: 'Industrial Supplies',
        description: 'Delivering bulk industrial equipment, project hardware, and lubricants to meet the growing needs of diverse industries.',
        icon: '⚙️',
    },
    {
        title: 'Tire Manufacturing',
        description: 'Producing durable, high-performance tires designed specifically for heavy equipment and dump trucks.',
        icon: '🔘',
    },
    {
        title: 'Agricultural & Compact Machinery',
        description: 'Providing versatile machines for agricultural productivity and smaller-scale industrial applications.',
        icon: '🚜',
    },
    {
        title: 'Mining Contractor Services',
        description: 'Supporting mining operations with professional hauling and contractor services, built on safety and efficiency.',
        icon: '⛏️',
    },
];

const ServiceIntroSection: React.FC = () => {
    return (
        <section className="bg-[#d9d9d9] px-6 py-8">
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
                            <p className="text-gray-600">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceIntroSection;
