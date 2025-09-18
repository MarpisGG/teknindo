"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

interface ContentItem {
    title: string;
    description: string;
    content: React.ReactNode;
}

const content: ContentItem[] = [
    {
        title: "2018 – Foundation of Mitra Teknindo Sejati (MTS)",
        description:
            "The journey began with the establishment of Mitra Teknindo Sejati (MTS), specializing in the distribution of heavy equipment and heavy-duty trucks. With a strong commitment to reliability and customer trust, MTS laid the foundation of what would later grow into Teknindo Group.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <img
                    src="/image/about/1.jpg"
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "2019 – Establishment of Mitra Suplaindo Sejati (MSS)",
        description:
            "To meet the growing demand for industrial support, Mitra Suplaindo Sejati (MSS) was founded as a supplier of bulk industrial equipment, hardware for project sites, and industrial lubricants. MSS quickly became a trusted partner for mining, construction, and manufacturing industries.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <img
                    src="/image/about/2.jpg"
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "2020 – Expansion to Global Trading with Wenzhou Yunding International (WYI)",
        description:
            "Strengthening its international presence, Wenzhou Yunding International (WYI) was established in China. As a global trading company, WYI provides diverse machinery, industrial tools, and specialized equipment, connecting global markets with trusted quality and value.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <img
                    src="/image/about/5.jpg"
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "2024 – Launch of Teknindo Super Haul (TSH)",
        description:
            "After years of steady growth, Teknindo Super Haul (TSH) was launched to provide heavy equipment and dump truck rental services, along with operational vehicles, ensuring smooth operations in the mining sector.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <img
                    src="/image/about/3.jpg"
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "2025 – A Year of Rapid Expansion",
        description:
            "In 2025, Teknindo Group entered a phase of rapid expansion by establishing three new subsidiaries: LGCM Laigong Indonesia, focusing on compact heavy machinery and agricultural equipment; Teknindo Adhya Pane, providing mining contractor services with a strong emphasis on safety and efficiency; and Tenrich Tyre Indonesia, dedicated to producing durable, high-performance tires for heavy equipment and dump trucks.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <img
                    src="/image/about/4.jpg"
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
];

const StickyScrollRevealComponent = (): React.ReactElement => {
    return (
        <div style={{ overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="h-full">
            <style dangerouslySetInnerHTML={{ __html: `::-webkit-scrollbar { display: none; }` }} />
            <StickyScroll content={content} />
        </div>
    );
}

export default StickyScrollRevealComponent;
