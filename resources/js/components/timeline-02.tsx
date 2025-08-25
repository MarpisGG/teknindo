'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

type Timeline_02 = {
    date: string;
    title: string;
    content: string;
};

const timelineData: Timeline_02[] = [
    {
        date: '2018',
        title: 'Foundation of Mitra Teknindo Sejati (MTS)',
        content:
            'The journey began with the establishment of Mitra Teknindo Sejati (MTS), specializing in the distribution of heavy equipment and heavy-duty trucks. With a strong commitment to reliability and customer trust, MTS laid the foundation of what would later grow into Teknindo Group.',
    },
    {
        date: '2019',
        title: 'Establishment of Mitra Suplaindo Sejati (MSS)',
        content:
            'To meet the growing demand for industrial support, Mitra Suplaindo Sejati (MSS) was founded as a supplier of bulk industrial equipment, hardware for project sites, and industrial lubricants. MSS quickly became a trusted partner for mining, construction, and manufacturing industries.',
    },
    {
        date: '2020',
        title: 'Expansion to Global Trading with Wenzhou Yunding International (WYI)',
        content:
            'Strengthening its international presence, Wenzhou Yunding International (WYI) was established in China. As a global trading company, WYI provides diverse machinery, industrial tools, and specialized equipment, connecting global markets with trusted quality and value.',
    },
    {
        date: '2024',
        title: 'Launch of Teknindo Super Haul (TSH)',
        content:
            'After years of steady growth, Teknindo Super Haul (TSH) was launched to provide heavy equipment and dump truck rental services, along with operational vehicles, ensuring smooth operations in the mining sector.',
    },
    {
        date: '2025',
        title: 'A Year of Rapid Expansion',
        content:
            'In 2025, Teknindo Group entered a phase of rapid expansion by establishing three new subsidiaries: LGCM Laigong Indonesia, focusing on compact heavy machinery and agricultural equipment; Teknindo Adhya Pane, providing mining contractor services with a strong emphasis on safety and efficiency; and Tenrich Tyre Indonesia, dedicated to producing durable, high-performance tires for heavy equipment and dump trucks.',
    },
];

export default function Timeline_02() {
    return (
        <section className="bg-[#d9d9d9]/60 py-8">
            <div className="container">
                <h1 className="mb-16 text-center text-3xl font-bold tracking-tight text-foreground sm:text-5xl">The Journey of Teknindo Group</h1>

                <div className="relative mx-auto max-w-6xl px-4 md:px-0">
                    {/* Subtle vertical line */}

                    {timelineData.map((entry, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative mb-12 pl-12"
                        >
                            {/* Garis vertikal + titik */}
                            <div className="absolute top-0 left-2 h-full">
                                {/* Garis hitam */}
                                <div className="mt-12 h-full w-[2px] bg-black"></div>
                                {/* Titik */}
                                <div className="absolute top-5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-black ring-4 ring-background" />
                            </div>

                            {/* Content */}
                            <p className="font-semibold text-foreground md:text-xl">{entry.title}</p>
                            <p className="text-md mb-2">{entry.date}</p>
                            <Card className="border bg-card shadow-sm transition hover:shadow-md">
                                <CardContent className="px-5 py-4">
                                    <p className="leading-relaxed">{entry.content}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
