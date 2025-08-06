import React from 'react';

interface Service {
    icon: string;
    title: string;
    description: string;
}

// const services: Service[] = [
//     {
//         title: 'Solusi Terbaik untuk Masalah Alat Berat',
//         description: 'Kami menyediakan produk - produk alat berat berkualitas Internasional dan sudah di ekspor ke banyak negara di seluruh dunia',
//         icon: '🛠️',
//     },
//     {
//         title: 'Layanan Konsultasi Proyek',
//         description: 'Kami menyediakan layanan konsultasi mengenai referensi produk terbaik yang sesuai dengan kebutuhan customer.',
//         icon: '🔩',
//     },
//     {
//         title: 'Harga Bersainig',
//         description: 'Kami menyediakan produk berkualitas terbaik dengan harga yang kompetitif dan bersifat negosiasi.',
//         icon: '🧰',
//     },
//     {
//         title: 'Ketersediaan Spare Part',
//         description: 'Kami menyediakan sparepart di seluruh cabang kami agar semua customer mudah mendapatkannya.',
//         icon: '📞',
//     },
//     {
//         title: 'Jaminan Garansi Unit',
//         description: 'Kami memberikan jaminan garansi unit bagi setiap pembelian alat berat dan jasa service perbaikan unit.',
//         icon: '👨‍🔧',
//     },
//     {
//         title: 'Layanan Pembiayaan',
//         description:
//             'Kami telah bekerja sama dengan beberapa perusahaan leasing alat berat untuk menghadirkan bantuan pembiayaan bagi para customer kami.',
//         icon: '👨‍🔧',
//     },
// ];

const services: Service[] = [
    {
        title: 'The Best Solutions for Your Heavy Equipment Needs',
        description:
            'We provide high-quality heavy equipment products with international standards, trusted and exported to many countries around the world.',
        icon: '🛠️',
    },
    {
        title: 'Professional Project Consultation',
        description: 'We offer expert consultation services to help you choose the most suitable products according to your project requirements.',
        icon: '🔩',
    },
    {
        title: 'Competitive Pricing',
        description: 'We deliver top-quality products at competitive and negotiable prices to ensure the best value for our customers.',
        icon: '🧰',
    },
    {
        title: 'Spare Parts Availability',
        description: 'We ensure the availability of spare parts at all our branch offices, making it easy for our customers to get what they need.',
        icon: '📞',
    },
    {
        title: 'Unit Warranty Guarantee',
        description: 'We provide a warranty guarantee for every heavy equipment purchase and repair service to give our customers peace of mind.',
        icon: '👨‍🔧',
    },
    {
        title: 'Financing Support',
        description: 'We collaborate with leading heavy equipment leasing companies to offer financing solutions for our valued customers.',
        icon: '💰',
    },
];

const ServiceCard: React.FC = () => {
    return (
        <div className="flex flex-col items-center gap-12">
            {/* Baris 1 - 3 Item */}
            <div className="grid w-full max-w-6xl items-stretch gap-8 md:grid-cols-3">
                {services.slice(0, 3).map((service, idx) => (
                    <div
                        key={idx}
                        className="flex h-full transform flex-col rounded-lg bg-white p-6 shadow transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg dark:bg-[#1a1a1a]"
                    >
                        <div className="mb-4 text-4xl">{service.icon}</div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                        <p className="flex-grow text-gray-600 dark:text-gray-400">{service.description}</p>
                    </div>
                ))}
            </div>

            {/* Baris 2 - 2 Item */}
            <div className="grid w-full max-w-6xl items-stretch gap-8 md:grid-cols-3">
                {services.slice(3).map((service, idx) => (
                    <div
                        key={idx}
                        className="flex h-full transform flex-col rounded-lg bg-white p-6 shadow transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg dark:bg-[#1a1a1a]"
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
