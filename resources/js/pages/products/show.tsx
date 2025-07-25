import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { FaFacebook, FaInstagram, FaMailBulk, FaWhatsapp } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface ProductDetailProps {
    product: {
        id: number;
        name: string;
        slug: string;
        description: string;
        specifications: string;
        image?: string;
        poster?: string; // New field for poster
        brochure?: string;
        category: {
            name: string;
        };
        type: {
            name: string;
            slug: string;
        };
    };
    type: {
        name: string;
        slug: string;
    };
}

interface Quotation {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    country: string;
    message: string;
    product: {
        id: number;
        name: string;
        slug: string;
    };
}

const shareLinks = [
    {
        name: 'WhatsApp',
        logo: FaWhatsapp,
        link: `https://wa.me/?text=${encodeURIComponent(window.location.href)}`,
    },
    {
        name: 'Instagram',
        logo: FaInstagram,
        link: `https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`,
    },
    {
        name: 'Facebook',
        logo: FaFacebook,
        link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    },
    {
        name: 'Email',
        logo: FaMailBulk,
        link: `mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(window.location.href)}`,
    },
];

export default function Show({ product, type }: ProductDetailProps) {
    const handleDownloadBrochure = () => {
        if (product.brochure) {
            window.open(`/storage/${product.brochure}`, '_blank');
        }
    };

    const [quotations, setQuotations] = useState<Quotation[]>([]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        axios
            .post(`/api/quotations`, formData)
            .then((response) => {
                setQuotations([...quotations, response.data]);
                Swal.fire('Success', 'Quotation submitted successfully!', 'success');
                (e.target as HTMLFormElement).reset();
            })
            .catch((error) => {
                if (error.response && error.response.data.errors) {
                    const messages = Object.values(error.response.data.errors).flat().join('\n');
                    Swal.fire('Validation Error', messages, 'error');
                } else {
                    Swal.fire('Error', 'Failed to submit quotation.', 'error');
                }
            });
    };

    return (
        <>
            <div className="mb-16">
                <Navbar />
            </div>
            <div className="mx-auto mt-20 max-w-6xl px-4">
                <nav className="mb-4 hidden text-sm text-gray-500 sm:block" aria-label="Breadcrumb">
                    <ol className="list-reset flex">
                        <li>
                            <a href="/" className="hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <span className="mx-2">{'>'}</span>
                        </li>
                        <li>
                            <a href="/products" className="hover:underline">
                                Products
                            </a>
                        </li>
                        <li>
                            <span className="mx-2">{'>'}</span>
                        </li>
                        <li>
                            <a href={`/products/${type.slug}`} className="hover:underline">
                                {type.name}
                            </a>
                        </li>
                        <li>
                            <span className="mx-2">{'>'}</span>
                        </li>
                        <li className="font-bold text-gray-900">{product.name}</li>
                    </ol>
                </nav>
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
                <div className="mt-8 rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Request a Quotation</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="company" className="mb-1 block text-sm font-medium text-gray-700">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="country" className="mb-1 block text-sm font-medium text-gray-700">
                                Country
                            </label>
                            <input
                                type="text"
                                name="country"
                                id="country"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                                Message or Requirements
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows={4}
                                required
                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                            ></textarea>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="product_id">
                                Select Product
                            </label>
                            <select
                                name="product_id"
                                id="product_id"
                                className="w-full border border-gray-300 px-4 py-2 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                defaultValue={product.id}
                            >
                                <option value={product.id}>{product.name}</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="mt-6 w-full rounded-lg bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 px-6 py-3 font-semibold text-gray-900 shadow transition-colors duration-200 hover:from-yellow-400 hover:to-yellow-600 focus:ring-2 focus:ring-yellow-400 active:scale-95"
                        >
                            Submit Quotation Request
                        </button>
                    </form>
                </div>
            </div>
            <FloatingQuickActions />
            <Footer7 />
        </>
    );
}
