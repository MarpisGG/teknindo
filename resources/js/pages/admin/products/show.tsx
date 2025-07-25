import { Link, router, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';

interface Product {
    id: number;
    name: string;
    description: string;
    specifications: string;
    image: string | null;
    poster: string | null;
    brochure: string | null;
    category: {
        id: number;
        name: string;
    };
    type: {
        id: number;
        slug: string;
        name: string;
    };
}

interface PageProps {
    product: Product;
    [key: string]: any;
}

const Show: React.FC = () => {
    const { product, auth } = usePage<PageProps>().props;
    const shareLinks = [
        {
            name: 'Facebook',
            link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
            logo: FaFacebook,
        },
        {
            name: 'Twitter',
            link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Check out this product: ' + (typeof product !== 'undefined' ? product.name : ''))}`,
            logo: FaTwitter,
        },
        {
            name: 'WhatsApp',
            link: `https://wa.me/?text=${encodeURIComponent(window.location.href)}`,
            logo: FaWhatsapp,
        },
        {
            name: 'LinkedIn',
            link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent('Check out this product: ' + (typeof product !== 'undefined' ? product.name : ''))}`,
            logo: FaLinkedin,
        },
    ];

    const handleDownloadBrochure = () => {
        if (product.brochure) {
            window.open(`/storage/${product.brochure}`, '_blank');
        }
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-8">
            <nav className="mb-6 rounded-lg bg-white p-4 shadow-md">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* Kiri: Logo */}
                    <div className="flex w-full items-center justify-between md:w-auto">
                        <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                            Dashboard
                        </Link>

                        {/* Tombol menu mobile */}
                        <button
                            className="text-gray-500 hover:text-gray-700 md:hidden"
                            onClick={() => {
                                const menu = document.getElementById('mobile-menu');
                                if (menu) menu.classList.toggle('hidden');
                            }}
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Tengah: Desktop Menu */}
                    <div className="hidden flex-grow items-center justify-center md:flex">
                        <div className="flex items-center gap-3">
                            {['users', 'roles', 'blogs', 'jobs', 'products', 'categories', 'types', 'messages', 'subscriptions'].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item}`}
                                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                        item === 'messages' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Kanan: User Info */}
                    <div className="hidden items-center gap-2 rounded-full bg-gray-50 px-4 py-2 md:flex">
                        <span className="font-medium text-gray-700">{auth.user.name}</span>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div id="mobile-menu" className="mt-4 hidden space-y-2 md:hidden">
                    {['users', 'roles', 'blogs', 'jobs', 'products', 'categories', 'types', 'messages', 'subscriptions'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item}`}
                            className="block rounded px-3 py-2 text-gray-700 capitalize hover:bg-blue-50 hover:text-blue-700"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </nav>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Product Details</h1>
                <button onClick={() => router.get('/products')} className="text-sm text-blue-600 hover:underline">
                    &larr; Back to Products
                </button>
            </div>

            <div className="product my-4 grid grid-cols-1 gap-8 rounded-xl p-8 shadow-lg md:grid-cols-2">
                <div className="flex items-center justify-center overflow-hidden rounded-xl">
                    {product.poster ? (
                        <button
                            type="button"
                            onClick={() => window.open(`/storage/${product.poster}`, '_blank')}
                            className="focus:outline-none"
                            style={{ width: '100%', cursor: 'pointer' }}
                        >
                            <img
                                src={`/storage/${product.poster}`}
                                alt={product.name}
                                className="h-auto max-h-[500px] w-full object-contain transition-transform duration-300 hover:scale-110"
                            />
                        </button>
                    ) : (
                        <div className="flex h-64 w-full items-center justify-center text-gray-400">No Poster available</div>
                    )}
                </div>

                <div className="">
                    <div className="mb-4">
                        <p className="text-lg font-semibold text-gray-500 transition hover:underline">{product.category?.name}</p>
                        <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                        <a href={`/products/${product.type?.slug}`} className="text-md font-semibold text-gray-500 transition hover:underline">
                            {product.type?.name}
                        </a>
                    </div>
                    <div
                        className="mb-2 leading-relaxed whitespace-pre-wrap text-gray-600"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />

                    <div className="my-2">
                        <p className="mb-2 text-lg font-bold">Specifications:</p>
                        <div
                            className="overflow-x-auto rounded-lg text-sm leading-relaxed whitespace-pre text-gray-700"
                            dangerouslySetInnerHTML={{ __html: product.specifications }}
                        />
                    </div>

                    {product.brochure && (
                        <button
                            onClick={handleDownloadBrochure}
                            className="group mt-4 inline-flex items-center rounded-lg bg-[#FCC200]/70 px-6 py-2 font-semibold text-gray-900 transition-colors duration-200 hover:bg-[#FCC200] focus:ring-2 focus:ring-yellow-400 active:scale-95"
                        >
                            <span className="relative flex items-center">
                                <span className="mr-2">View Full Product Details</span>
                            </span>
                            <ChevronRight className="ml-2 inline h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-3 group-active:scale-125" />
                        </button>
                    )}
                    <div className="mt-8">
                        <p className="text-md mb-4 font-semibold text-gray-800">Share this Product</p>
                        <div className="flex flex-wrap gap-4">
                            {shareLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center rounded-lg bg-white p-3 shadow transition hover:bg-gray-100"
                                >
                                    <link.logo className="h-6 w-6 text-gray-600" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;
